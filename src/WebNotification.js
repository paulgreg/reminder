import periodicTask, { MINUTE } from './periodicTask'

export default function WebNotification({ reminders }) {
    Notification.requestPermission(function (status) {
        console.log(status)
    })

    const now = Date.now()

    periodicTask(MINUTE)(() =>
        reminders
            .filter(
                ({ timestamp }) =>
                    timestamp > now - MINUTE && timestamp < now + MINUTE
            )
            .forEach(
                ({ msg, userSentence }) =>
                    new Notification(msg, { body: userSentence })
            )
    )
    return null
}
