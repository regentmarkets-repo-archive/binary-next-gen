import React from 'react';
import ReactDom from 'react-dom';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default (store) => {
    // give it a name so it reuses the same window
    const win = window.open(null, 'redux-devtools', 'menubar=no,location=no,resizable=yes,scrollbars=no,status=no');

    win.document.getElementById('react-devtools-root').remove();
    win.document.write('<div id="react-devtools-root"></div>');

    // wait a little bit for it to reload, then render
    setTimeout(() => {
        ReactDom.render(
            <DebugPanel top right bottom left key="debugPanel">
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
            , win.document.getElementById('react-devtools-root')
        );
    }, 10);
};
