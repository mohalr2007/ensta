
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("polyglot-lang") as Language;
    if (storedLang && (storedLang === 'en' || storedLang === 'fr')) {
      setLanguageState(storedLang);
    }
    setIsMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    if (isMounted) {
      setLanguageState(lang);
      localStorage.setItem("polyglot-lang", lang);
    }
  };

  const t = useMemo(() => translations[language] || translations.en, [language]);
  
  if (!isMounted) {
    return null;
  }

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
