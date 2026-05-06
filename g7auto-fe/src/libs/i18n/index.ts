import { vi } from "./locales/vi";
import { en } from "./locales/en";
import type { Locale } from "./types";

const LOCALE_KEY = "g7_locale";
const locales: Record<Locale, Record<string, string>> = { vi, en };

const stored = localStorage.getItem(LOCALE_KEY) as Locale;
let currentLocale: Locale = stored === "en" ? "en" : "vi";

export const getLocale = (): Locale => currentLocale;

export const setLocale = (locale: Locale): void => {
  currentLocale = locale;
  localStorage.setItem(LOCALE_KEY, locale);
};

export const t = (key: string): string =>
  locales[currentLocale][key] ?? locales.vi[key] ?? key;
