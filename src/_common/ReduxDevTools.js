// import React from 'react';
// import { compose, createStore, applyMiddleware } from 'redux';
// import { devTools, persistState } from 'redux-devtools';
// import DockMonitor from 'redux-devtools-dock-monitor';

// export default createDevTools(
//     <DockMonitor toggleVisibilityKey="H" changePositionKey="Q">
//         <LogMonitor />
//     </DockMonitor>
// );

// const finalCreateStore = compose(
//   // Enables your middleware:
//   applyMiddleware(m1, m2, m3), // any Redux middleware, e.g. redux-thunk
//
//   // Provides support for DevTools:
//   devTools(),
//
//   // Lets you write ?debug_session=<name> in address bar to persist debug sessions
//   persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
// )(createStore);
//
// const store = finalCreateStore(reducer);

// import React from 'react';
// import ReactDom from 'react-dom';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
//
// export default (store) => {
//     // give it a name so it reuses the same window
//     const win = window.open(null, 'redux-devtools', 'menubar=no,location=no,resizable=yes,scrollbars=no,status=no');
//     const reduxDevtools = win.document.getElementById('redux-devtools');
//     if (reduxDevtools) {
//         reduxDevtools.remove();
//     }
//     win.document.write('<div id="react-devtools-root"></div>');
//
//     // wait a little bit for it to reload, then render
//     setTimeout(() => {
//         ReactDom.render(
//             <DebugPanel top right bottom left key="debugPanel">
//                 <DevTools store={store} monitor={LogMonitor} />
//             </DebugPanel>
//             , win.document.getElementById('react-devtools-root')
//         );
//     }, 10);
// };
