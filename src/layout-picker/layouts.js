import { sequence } from 'binary-utils';

const layoutCounts = [1, 2, 6, 6, 6];

export const layoutNumbers = () =>
    [].concat(
        ...layoutCounts.map((count, idx) =>
            sequence(layoutCounts[idx]).map(i => ({
                trade: idx + 1,
                layout: i + 1,
            })),
        ),
    );

export const layoutNames = () =>
    layoutNumbers().map(x => `layout-${x.trade}-${x.layout}`);
