import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import enUsTrans from "./config/locales/en-us.json";
import zhCnTrans from "./config/locales/zh-cn.json";
import { initReactI18next } from 'react-i18next';
import { Language } from './core/enum';

i18n.use(LanguageDetector) //当前浏览器语言
  .use(initReactI18next) //init i18next
  .init({
    //引入资源文件
    resources: {
      en: {
        translation: enUsTrans,
      },
      zh: {
        translation: zhCnTrans,
      },
    },
    //选择默认语言，选择内容为上述配置中的key，即en/zh
    fallbackLng: Language.en,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })

export default i18n;
