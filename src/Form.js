import React, { useRef } from 'react'
import './Form.css'
import LanguageSelector from './LanguageSelector'
import extractDataFromUserSentence from './extractDataFromUserSentence'

const i18n = {
    placeholder: {
        en: 'to call Mum this evening',
        fr: 'appeler Maman ce soir',
    },
}

export default function Form({
    language = 'en',
    onLanguageChange = () => {},
    onNewReminder = () => {},
}) {
    const input = useRef()

    const translateIntoReminder = (e) => {
        e.preventDefault()
        const userSentence = input.current.value
        const dateAndMessages = extractDataFromUserSentence(
            language,
            userSentence
        )
        if (dateAndMessages.length > 0) {
            dateAndMessages.forEach((dateAndMessage) =>
                onNewReminder({ ...dateAndMessage, userSentence })
            )
            input.current.value = ''
        }
    }

    return (
        <form className="Form" onSubmit={translateIntoReminder}>
            <LanguageSelector
                language={language}
                onLanguageChange={onLanguageChange}
            />
            <input
                className="input"
                type="text"
                ref={input}
                placeholder={i18n.placeholder[language]}
                autoFocus
            />
        </form>
    )
}
