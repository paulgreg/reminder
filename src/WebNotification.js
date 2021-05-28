import periodicTask, { MINUTE } from './periodicTask'

export default function WebNotification({
    reminders,
    onReminderUpdate = () => {},
}) {
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
                ({ notification, timestamp }) =>
                    !notification && timestamp <= now
            )
            .forEach((item) => {
                const { msg, userSentence } = item
                const r = new Notification(msg, { body: userSentence })
                console.log('sending notif', r)
                onReminderUpdate({ ...item, notification: true })
            })
    })
    return null
}
