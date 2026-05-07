import { vi } from "./locales/vi";
import { en } from "./locales/en";
import { zh } from "./locales/zh";
import type { Locale } from "./types";

const LOCALE_KEY = "g7_locale";
const locales: Record<Locale, Record<string, string>> = { vi, en, zh };
const VALID_LOCALES: Locale[] = ["vi", "en", "zh"];

const stored = localStorage.getItem(LOCALE_KEY) as Locale;
let currentLocale: Locale = VALID_LOCALES.includes(stored) ? stored : "vi";

export const getLocale = (): Locale => currentLocale;

export const setLocale = (locale: Locale): void => {
  currentLocale = locale;
  localStorage.setItem(LOCALE_KEY, locale);
};

export const t = (key: string): string =>
  locales[currentLocale][key] ?? locales.vi[key] ?? key;
