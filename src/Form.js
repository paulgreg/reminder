import React, { useRef } from 'react'
import './Form.css'
import LanguageSelector from './LanguageSelector'
import extractDataFromUserSentence from './extractDataFromUserSentence'

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
        dateAndMessages.forEach((dateAndMessage) =>
            onNewReminder(dateAndMessage)
        )
        input.current.value = ''
    }

    return (
        <form className="Form" onSubmit={translateIntoReminder}>
            <LanguageSelector
                language={language}
                onLanguageChange={onLanguageChange}
            />
            <input className="input" type="text" ref={input} />
        </form>
    )
}
