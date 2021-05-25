import React, { useState } from 'react'
import './App.css'
import Form from './Form'
import ReminderList from './ReminderList'

function App() {
    const [language, setLanguage] = useState(
        localStorage.reminderLanguage || 'en'
    )
    const [reminders, setReminders] = useState(
        localStorage.reminderList ? JSON.parse(localStorage.reminderList) : []
    )

    const onLanguageChange = (lang) => {
        localStorage.reminderLanguage = lang
        setLanguage(lang)
    }

    const onNewReminder = ({ date, msg }) => {
        const newReminderList = [
            ...reminders,
            {
                created: Date.now(),
                timestamp: date.getTime(),
                msg,
            },
        ]
        localStorage.reminderList = JSON.stringify(newReminderList)
        setReminders(newReminderList)
    }

    return (
        <div className="App">
            <h1 className="mainTitle">Reminder</h1>
            <Form
                language={language}
                onLanguageChange={onLanguageChange}
                onNewReminder={onNewReminder}
            />
            <ReminderList language={language} reminders={reminders} />
        </div>
    )
}

export default App
