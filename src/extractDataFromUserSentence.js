import * as chrono from 'chrono-node'

export default function extractDataFromUserSentence(
    language,
    userSentence,
    referenceDate = Date.now()
) {
    const parsed = chrono[language].parse(userSentence, referenceDate, {
        forwardDate: true,
    })
    if (parsed && parsed.length >= 1) {
        const msg = userSentence.substring(0, parsed[0].index).trim()
        return parsed.map((result) => {
            const { start } = result
            return { date: start.date(), msg }
        })
    }
    return []
}
