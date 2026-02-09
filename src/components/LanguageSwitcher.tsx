import { useCallback, useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import TranslateSVG from "../assets/icons/translate.svg"
import "./LanguageSwitcher.scss"

interface Language {
    code: string
    name: string
    flag: string
}

const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
    { code: 'zh-HK', name: '繁體中文', flag: '🇭🇰' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const toggleDropdown = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    const handleLanguageChange = useCallback((languageCode: string) => {
        i18n.changeLanguage(languageCode)
        setIsOpen(false)
    }, [i18n])

    return (
        <div className="language-switcher" ref={dropdownRef}>
            <button
                className={`language-switcher-button ${isOpen ? 'active' : ''}`}
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-haspopup="true"
                aria-label="Change language"
            >
                <img src={TranslateSVG} className="language-chevron" alt="Translate" />
            </button>

            {isOpen && (
                <div className="language-dropdown">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            className={`language-option ${i18n.language === language.code ? 'selected' : ''}`}
                            onClick={() => handleLanguageChange(language.code)}
                        >
                            <span className="language-flag">{language.flag}</span>
                            <span className="language-name">{language.name}</span>
                            {i18n.language === language.code && (
                                <svg className="checkmark" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSwitcher
