import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enCommon from './locales/en/common.json'
import enAuth from './locales/en/auth.json'
import enRestaurant from './locales/en/restaurant.json'
import enProfile from './locales/en/profile.json'
import enVote from './locales/en/vote.json'

import zhCNCommon from './locales/zh-CN/common.json'
import zhCNAuth from './locales/zh-CN/auth.json'
import zhCNRestaurant from './locales/zh-CN/restaurant.json'
import zhCNProfile from './locales/zh-CN/profile.json'
import zhCNVote from './locales/zh-CN/vote.json'

import zhHKCommon from './locales/zh-HK/common.json'
import zhHKAuth from './locales/zh-HK/auth.json'
import zhHKRestaurant from './locales/zh-HK/restaurant.json'
import zhHKProfile from './locales/zh-HK/profile.json'
import zhHKVote from './locales/zh-HK/vote.json'

import frCommon from './locales/fr/common.json'
import frAuth from './locales/fr/auth.json'
import frRestaurant from './locales/fr/restaurant.json'
import frProfile from './locales/fr/profile.json'
import frVote from './locales/fr/vote.json'

// Translation resources
const resources = {
    en: {
        common: enCommon,
        auth: enAuth,
        restaurant: enRestaurant,
        profile: enProfile,
        vote: enVote,
    },
    'zh-CN': {
        common: zhCNCommon,
        auth: zhCNAuth,
        restaurant: zhCNRestaurant,
        profile: zhCNProfile,
        vote: zhCNVote,
    },
    'zh-HK': {
        common: zhHKCommon,
        auth: zhHKAuth,
        restaurant: zhHKRestaurant,
        profile: zhHKProfile,
        vote: zhHKVote,
    },
    fr: {
        common: frCommon,
        auth: frAuth,
        restaurant: frRestaurant,
        profile: frProfile,
        vote: frVote,
    },
}

i18n
    .use(LanguageDetector) // Detect user language
    .use(initReactI18next) // Pass i18n to react-i18next
    .init({
        resources,
        fallbackLng: 'en',
        defaultNS: 'common',
        ns: ['common', 'auth', 'restaurant', 'profile', 'vote'],

        interpolation: {
            escapeValue: false, // React already escapes values
        },

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    })

export default i18n
