import extractDataFromUserSentence from './extractDataFromUserSentence'

const referenceDate = new Date('January 1, 2020 00:00:00 GMT+00:00')

describe('extractDataFromUserSentence', () => {
    ;[
        {
            language: 'en',
            userSentence: 'call Mum today at 5pm',
            expected: [
                {
                    date: new Date('January 1, 2020 17:00:00 GMT+00:00'),
                    msg: 'call Mum',
                },
            ],
        },
        {
            language: 'en',
            userSentence: 'call Dad today at noon and tomorrow at noon',
            expected: [
                {
                    date: new Date('January 1, 2020 12:00:00 GMT+00:00'),
                    msg: 'call Dad',
                },
                {
                    date: new Date('January 2, 2020 12:00:00 GMT+00:00'),
                    msg: 'call Dad',
                },
            ],
        },
        {
            language: 'fr',
            userSentence: 'chercher les enfants à 16h',
            expected: [
                {
                    date: new Date('January 1, 2020 16:00:00 GMT+00:00'),
                    msg: 'chercher les enfants',
                },
            ],
        },
    ].forEach(({ language, userSentence, expected }) =>
        test(`extract date and msg from « ${userSentence} »`, () => {
            const v = extractDataFromUserSentence(
                language,
                userSentence,
                referenceDate
            )
            expect(v).toEqual(expected)
        })
    )
})
