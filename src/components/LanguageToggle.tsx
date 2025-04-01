"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const LanguageToggle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>("en");

  // Set initial language based on localStorage or URL
  useEffect(() => {
    const storedLang = localStorage.getItem("preferredLanguage");
    if (storedLang === "en" || storedLang === "pt-br") {
      setLanguage(storedLang);
    } else if (pathname.startsWith("/pt-br")) {
      setLanguage("pt-br");
    } else {
      setLanguage("en"); // Default to "en" if no /pt-br prefix
    }
  }, [pathname]);

  // Toggle language and update URL
  const toggleLanguage = () => {
    const newLang = language === "en" ? "pt-br" : "en";
    setLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);

    // Replace the language segment in the path
    const currentLangPrefix = pathname.startsWith("/pt-br") ? "/pt-br" : "/en";
    const newPath = pathname.replace(currentLangPrefix, `/${newLang}`);

    // If no language prefix exists (e.g., "/"), prepend the new language
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
      className="relative inline-flex h-8 w-28 items-center justify-between rounded-full bg-gray-600/40 p-1 transition-all"
    >
      <span
        className={`absolute left-1 top-1 h-6 w-12 rounded-full bg-[#96ff00]/30 transition-transform duration-200 ${
          language === "pt-br" ? "translate-x-14" : "translate-x-0"
        }`}
      ></span>
      <span
        className={`relative flex w-12 items-center justify-center text-xs font-medium ${
          language === "en" ? "text-white" : "text-gray-300"
        }`}
      >
        🇺🇸 US
      </span>
      <span
        className={`relative flex w-12 items-center justify-center text-xs font-medium ${
          language === "pt-br" ? "text-white" : "text-gray-300"
        }`}
      >
        BR 🇧🇷
      </span>
    </button>
  );
};

export default LanguageToggle;
