const i18n = {
    fr: {
        now: 'maintenant',
        almostNow: 'imminent',
        future: 'dans %s',
        past: 'il y a %s',
        second: { name: ' seconde', single: 'une seconde' },
        minute: { name: ' minute', single: 'une minute' },
        hour: { name: ' heure', single: 'une heure' },
        day: { name: ' jour', single: 'une journée' },
        week: { name: ' semaine', single: 'une semaine' },
        month: { name: ' moi', single: 'un mois' },
        year: { name: ' année', single: 'une anneée' },
    },
    en: {
        now: 'just now',
        almostNow: 'any second',
        future: '%s from now',
        past: '%s ago',
        second: { name: ' second', single: 'a second' },
        minute: { name: ' minute', single: 'a minute' },
        hour: { name: ' hour', single: 'an hour' },
        day: { name: ' day', single: 'a day' },
        week: { name: ' week', single: 'a week' },
        month: { name: ' month', single: 'a month' },
        year: { name: ' year', single: 'a year' },
    },
}

const SECOND = 1000

export default function naturalDate(
    language = 'en',
    date,
    referenceDate = Date.now()
) {
    var diff = referenceDate - date.getTime()

    var future = diff < 0
    diff = Math.abs(diff)

    if (!future && diff < 30 * SECOND) return i18n[language].now
    if (future && diff < 30 * SECOND) return i18n[language].almostNow

    var sentence = future ? i18n[language].future : i18n[language].past

    for (var i = 0; i < units.length; i++) {
        var unit = units[i]

        if (diff <= unit.max * unit.value) {
            var t = Math.round(diff / unit.value)
            const value =
                t === 1
                    ? i18n[language][unit.key].single
                    : t + i18n[language][unit.key].name + 's'
            return sentence.replace('%s', value)
        }
    }
}

var units = [
    { key: 'second', value: 1000, max: 50 },
    { key: 'minute', value: 60000, max: 50 },
    { key: 'hour', value: 3600000, max: 22 },
    { key: 'day', value: 86400000, max: 6 },
    { key: 'week', value: 604800000, max: 3.5 },
    { key: 'month', value: 2592000000, max: 11 },
    { key: 'year', value: 31536000000, max: Infinity },
]
