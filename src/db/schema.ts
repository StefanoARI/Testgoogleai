import { mysqlTable, serial, varchar, int, timestamp, text, date, time, boolean } from 'drizzle-orm/mysql-core';

export const reservations = mysqlTable('reservations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  date: date('date').notNull(),
  time: time('time').notNull(),
  guests: int('guests').notNull(),
  specialRequests: text('special_requests'),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, confirmed, cancelled
  createdAt: timestamp('created_at').defaultNow(),
});

export const cookieConsents = mysqlTable('cookie_consents', {
  id: serial('id').primaryKey(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  necessary: boolean('necessary').notNull().default(true),
  analytics: boolean('analytics').notNull().default(false),
  marketing: boolean('marketing').notNull().default(false),
  timestamp: timestamp('timestamp').defaultNow(),
});
