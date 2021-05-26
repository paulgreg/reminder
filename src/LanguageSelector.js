import React from 'react'
import './LanguageSelector.css'

const i18n = [
    { lang: 'en', value: 'Remind me to' },
    { lang: 'fr', value: 'Rappelles moi de' },
]

export default function LanguageSelector({
    language,
    onLanguageChange = () => {},
}) {
    return (
        <select
            className="LanguageSelector"
            onChange={(e) => onLanguageChange(e.target.value)}
            defaultValue={language}
        >
            {i18n.map(({ lang, value }) => (
                <option key={lang} value={lang}>
                    {value}
                </option>
            ))}
        </select>
    )
}
