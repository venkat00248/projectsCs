import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import TRANSLATIONS_HINDI from "./hi.json";
import TRANSLATIONS_EN from "./en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,

    lng: "en",
    resources: {
      hindi: {
        translation: TRANSLATIONS_HINDI,
      },
      english: {
        translation: TRANSLATIONS_EN,
      },
    
    },
  });

i18n.init({
  lng: "en",
  interpolation: {
    format: function (value, format, lng) {
      // if (value instanceof Date) return moment(value).format(format);

      if (typeof value === "number")
        return new Intl.NumberFormat().format(value);
      return value;
    },
  },
});

export { i18n };
