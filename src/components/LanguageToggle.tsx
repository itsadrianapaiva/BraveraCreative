"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LanguageToggle = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("en");

  // On component mount, determine the current language based on the URL.
  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith("/pt-br")) {
      setLanguage("pt-br");
    } else {
      setLanguage("en");
    }
  }, []);

  // Toggle language, update localStorage, and redirect.
  const toggleLanguage = () => {
    const newLang = language === "en" ? "pt-br" : "en";
    setLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);

    // Update URL: Replace the initial language segment (/en or /pt-br)
    const newPath = window.location.pathname.replace(
      /^\/(en|pt-br)/,
      `/${newLang}`,
    );
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative inline-flex h-8 w-28 items-center justify-between rounded-full bg-gray-600/40 p-1 transition-all"
    >
      {/* Sliding pill that highlights the selected option */}
      <span
        className={`absolute left-1 top-1 h-6 w-12 rounded-full bg-[#96ff00]/30 transition-transform duration-200 ${
          language === "pt-br" ? "translate-x-14" : "translate-x-0"
        }`}
      ></span>

      {/* Left side: English option */}
      <span
        className={`relative flex w-12 items-center justify-center text-xs font-medium ${
          language === "en" ? "text-white" : "text-gray-300"
        }`}
      >
        🇺🇸 US
      </span>

      {/* Right side: Portuguese option */}
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
