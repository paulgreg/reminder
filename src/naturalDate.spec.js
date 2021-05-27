import naturalDate from './naturalDate'

const referenceDate = new Date('January 1, 2020 00:00:00 GMT+00:00')

describe('naturalDate', () => {
    ;[
        {
            date: referenceDate,
            expected: {
                en: 'just now',
                fr: 'maintenant',
            },
        },
        {
            date: new Date('January 1, 2020 00:00:04 GMT+00:00'),
            expected: {
                en: 'any second',
                fr: 'imminent',
            },
        },
        {
            date: new Date('January 1, 2020 00:00:29 GMT+00:00'),
            expected: {
                en: 'any second',
                fr: 'imminent',
            },
        },
        {
            date: new Date('January 1, 2020 00:00:30 GMT+00:00'),
            expected: {
                en: '30 seconds from now',
                fr: 'dans 30 secondes',
            },
        },
    ].forEach(({ date, expected }) =>
        test(`should return ${expected.en} for ${date}`, () => {
            expect(naturalDate('en', date, referenceDate)).toBe(expected.en)
            expect(naturalDate('fr', date, referenceDate)).toBe(expected.fr)
        })
    )
})
