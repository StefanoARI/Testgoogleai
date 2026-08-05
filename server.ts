import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { db } from "./src/db/index.js";
import { reservations } from "./src/db/schema.js";
import { desc, eq } from "drizzle-orm";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Create a reservation
  app.post("/api/reservations", async (req, res) => {
    try {
      const { name, email, phone, date, time, guests, specialRequests } = req.body;
      if (!name || !email || !phone || !date || !time || !guests) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await db.insert(reservations).values({
        name,
        email,
        phone,
        date,
        time,
        guests: Number(guests),
        specialRequests,
        status: "pending",
      });

      res.status(201).json({ message: "Reservation created successfully" });
    } catch (error: any) {
      console.error("Error creating reservation:", error);
      res.status(500).json({ error: "Failed to create reservation" });
    }
  });

  // Admin middleware
  const adminAuth = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // Default for testing
    
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };

  // Get all reservations (Admin)
  app.get("/api/admin/reservations", adminAuth, async (req, res) => {
    try {
      const allReservations = await db.select().from(reservations).orderBy(desc(reservations.createdAt));
      res.json(allReservations);
    } catch (error: any) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ error: "Failed to fetch reservations" });
    }
  });

  // Update reservation status (Admin)
  app.patch("/api/admin/reservations/:id", adminAuth, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      
      if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      await db.update(reservations).set({ status }).where(eq(reservations.id, id));
      res.json({ message: "Reservation updated successfully" });
    } catch (error: any) {
      console.error("Error updating reservation:", error);
      res.status(500).json({ error: "Failed to update reservation" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
