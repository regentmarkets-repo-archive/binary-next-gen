import createDefaultTradeParams from '../createDefaultTradeParams';

describe('createDefaultTradeParams', () => {
    it('should return correct params for market that allow start later only', () => {
        const contract = {
            risefall: {
                CALL: {
                    forwardStartingDuration: {
                        range: [
                            {},
                            {
                                date: '2016-08-09T00:00:00.000Z',
                                open: [
                                    new Date('2016-08-09T07:15:00.000Z'),
                                ],
                                close: [
                                    '2016-08-09T18:30:00.000Z',
                                ],
                            },
                        ],
                        options: [
                            {
                                unit: 'm',
                                min: 5,
                                max: 1440,
                            },
                            {
                                unit: 'h',
                                min: 1,
                                max: 24,
                            },
                        ],
                    },
                },
            },
        };

        const result = createDefaultTradeParams(contract, 'ANY', true);

        expect(result.dateStart).toBeTruthy();
    });
});
