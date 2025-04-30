"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage");
    if (storedLang === "en" || storedLang === "pt-br") {
      setLanguage(storedLang);
    } else if (pathname.startsWith("/pt-br")) {
      setLanguage("pt-br");
    } else {
      setLanguage("en");
    }
  }, [pathname]);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "pt-br" : "en";
    setLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
    document.cookie = `preferredLanguage=${newLang}; path=/; max-age=31536000`; // 1 year expiry

    const currentLangPrefix = pathname.startsWith("/pt-br") ? "/pt-br" : "/en";
    const newPath = pathname.replace(currentLangPrefix, `/${newLang}`);
    if (!pathname.startsWith("/en") && !pathname.startsWith("/pt-br")) {
      const cleanPath = pathname === "/" ? "" : pathname;
      router.push(`/${newLang}${cleanPath}`);
    } else {
      router.push(newPath);
    }
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative inline-flex h-8 w-34 items-center justify-between rounded-full bg-white/15 p-1 transition-all"
    >
      <span
        className={`absolute left-1 top-1 h-6 w-16 rounded-full bg-[#96ff00]/30 transition-transform duration-200 ${
          language === "pt-br" ? "translate-x-16" : "translate-x-0"
        }`}
      ></span>
      <span
        className={`relative flex w-16 items-center justify-center text-xs font-medium ${
          language === "en" ? "text-white" : "text-gray-300"
        }`}
      >
        English
      </span>
      <span
        className={`relative flex w-16 items-center justify-center text-xs font-medium ${
          language === "pt-br" ? "text-white" : "text-gray-300"
        }`}
      >
        Português
      </span>
    </button>
  );
};

export default LanguageToggle;
