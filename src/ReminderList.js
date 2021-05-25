import React from 'react'
import naturalDate from './naturalDate'
import './ReminderList.css'

export default function ReminderList({ language, reminders = [] }) {
    const sortByTimestamp = (r1, r2) => r1.timestamp - r2.timestamp
    return (
        <ul className="ReminderList">
            {reminders
                .sort(sortByTimestamp)
                .map(({ created, timestamp, msg }) => (
                    <li key={created}>
                        {naturalDate(language, new Date(timestamp))} : {msg}
                    </li>
                ))}
        </ul>
    )
}
