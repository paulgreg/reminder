import periodicTask, { MINUTE } from './periodicTask'

export default function WebNotification({ reminders }) {
    console.log('WebNotification permissions', Notification.permission)

    if (Notification.permission === 'default') {
        setTimeout(() => {
            Notification.requestPermission(function (status) {
                if (Notification.permission !== status) {
                    Notification.permission = status
                }
            })
        }, 1000)
    }

    periodicTask(MINUTE)(() => {
        if (Notification.permission !== 'granted') return

        console.log('Checking for notifications to send')

        const now = Date.now()
        reminders
            .filter(
                ({ timestamp }) =>
                    timestamp > now - MINUTE && timestamp < now + MINUTE
            )
            .forEach(
                ({ msg, userSentence }) =>
                    new Notification(msg, { body: userSentence })
            )
    })
    return null
}
