
"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { translations } from "@/lib/translations";

type Language = "en" | "fr";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof translations)["en"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = (lang: Language) => {
    // Keep localStorage to allow language switching within the session if needed,
    // but it won't be read on initial load anymore.
    localStorage.setItem("polyglot-lang", lang);
    setLanguageState(lang);
  };

  const t = useMemo(() => translations[language] || translations.en, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
