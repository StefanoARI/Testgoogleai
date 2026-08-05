import { useState, useEffect } from "react";
import { X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = async (finalPreferences: any) => {
    localStorage.setItem("cookieConsent", JSON.stringify(finalPreferences));
    setIsVisible(false);

    try {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPreferences),
      });
    } catch (error) {
      console.error("Failed to save consent to server", error);
    }
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  if (showPreferences) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Preferenze Cookie</h2>
            <button 
              onClick={() => setShowPreferences(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Strettamente necessari</h3>
                <p className="text-sm text-gray-500 mt-1">Questi cookie sono necessari per il funzionamento del sito web e non possono essere disattivati.</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition" />
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Cookie Analitici</h3>
                <p className="text-sm text-gray-500 mt-1">Ci permettono di contare le visite e le fonti di traffico in modo da poter misurare e migliorare le prestazioni del nostro sito.</p>
              </div>
              <button
                type="button"
                onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.analytics ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Cookie di Marketing</h3>
                <p className="text-sm text-gray-500 mt-1">Questi cookie possono essere impostati tramite il nostro sito dai nostri partner pubblicitari.</p>
              </div>
              <button
                type="button"
                onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${preferences.marketing ? 'bg-blue-600' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${preferences.marketing ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
          
          <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
            <button 
              onClick={handleSavePreferences}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Salva preferenze
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">La tua privacy è importante per noi</h2>
          <p className="text-sm text-gray-600">
            Utilizziamo i cookie per offrirti la migliore esperienza sul nostro sito web, personalizzare i contenuti e analizzare il nostro traffico. 
            Puoi scegliere di accettare tutti i cookie o personalizzare le tue preferenze.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
          <button 
            onClick={() => setShowPreferences(true)}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors w-full sm:w-auto"
          >
            Personalizza
          </button>
          <button 
            onClick={handleRejectAll}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors w-full sm:w-auto"
          >
            Rifiuta non necessari
          </button>
          <button 
            onClick={handleAcceptAll}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
}
