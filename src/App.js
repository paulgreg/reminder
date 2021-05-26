import React, { useState } from 'react'
import Favicon from 'react-favicon'
import './App.css'
import Form from './Form'
import ReminderList from './ReminderList'
import logo512 from './logo512.png'

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

    const onNewReminder = ({ date, msg, userSentence }) => {
        const newReminderList = [
            ...reminders,
            {
                created: Date.now(),
                timestamp: date.getTime(),
                msg,
                userSentence,
            },
        ]
        localStorage.reminderList = JSON.stringify(newReminderList)
        setReminders(newReminderList)
    }
    const onDeleteReminder = (created) => {
        const newReminderList = reminders.filter(
            (reminder) => reminder.created !== created
        )
        localStorage.reminderList = JSON.stringify(newReminderList)
        setReminders(newReminderList)
    }

    const now = Date.now()
    const sortByTimestamp = (r1, r2) => r1.timestamp - r2.timestamp
    const sortedReminders = reminders.sort(sortByTimestamp)
    const count = reminders.filter(({ timestamp }) => timestamp <= now).length

    return (
        <div className="App">
            <Favicon url={logo512} alertCount={count} />
            <h1 className="MainTitle">Reminder</h1>
            <Form
                language={language}
                onLanguageChange={onLanguageChange}
                onNewReminder={onNewReminder}
            />
            <ReminderList
                language={language}
                reminders={sortedReminders}
                onDeleteReminder={onDeleteReminder}
            />
        </div>
    )
}

export default App
