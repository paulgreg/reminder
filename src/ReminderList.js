import React, { useState } from 'react'
import naturalDate from './naturalDate'
import periodicTask, { MINUTE } from './periodicTask'
import './ReminderList.css'
import trash from './bin.svg'

const i18n = {
    en: {
        past: 'Past',
        present: 'Now',
        future: 'Soon',
        delete: 'delete',
    },
    fr: {
        past: 'Passé',
        present: 'Maintenant',
        future: 'Prochainement',
        delete: 'supprimer',
    },
}

export default function ReminderList({
    language,
    reminders = [],
    onDeleteReminder = () => {},
}) {
    const [now, setNow] = useState(Date.now())
    const GAP = 5 * MINUTE

    periodicTask(MINUTE)(() => {
        if (!document.hidden) setNow(Date.now())
    })

    function ReminderSubList({ className = '', language, label, list }) {
        if (!list || list.length === 0) return null

        return (
            <div className={`ReminderSubList ${className}`}>
                {label} :
                <ul>
                    {list.map(({ created, timestamp, msg }) => (
                        <li key={created}>
                            {naturalDate(language, new Date(timestamp))} : {msg}
                            <button
                                onClick={() => onDeleteReminder(created)}
                                className="button"
                            >
                                <img src={trash} alt={i18n[language].delete} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    return (
        <div className="ReminderList">
            <ReminderSubList
                language={language}
                label={i18n[language].past}
                list={reminders.filter(
                    ({ timestamp }) => timestamp <= now - GAP
                )}
            />
            <ReminderSubList
                language={language}
                label={i18n[language].present}
                className="current"
                list={reminders.filter(
                    ({ timestamp }) =>
                        timestamp > now - GAP && timestamp < now + GAP
                )}
            />
            <ReminderSubList
                language={language}
                label={i18n[language].future}
                list={reminders.filter(
                    ({ timestamp }) => timestamp >= now + GAP
                )}
            />
        </div>
    )
}
