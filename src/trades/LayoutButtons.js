import React, { PropTypes, Component } from 'react';

export default class LayoutButtons extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    render() {
        const layoutCounts = [0, 1, 2, 5, 5, 7];
        const layoutNames = layoutCounts.reduce((acc, x, i) => {
            const ns = Array.from(new Array(x)).map((n, idx) => `layout-${i}-${idx + 1}`);
            return acc.concat(ns);
        }, []);

        return (
            <div className="buttons">
                {layoutNames.map((x, idx) =>
                    <div key={x} className={x}>
                        {Array.from(new Array(layoutCounts[idx])).map((y, i) =>
                            <div style={{ backgroundColor: 'red', with: 10, height: 10 }} key={i} />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
