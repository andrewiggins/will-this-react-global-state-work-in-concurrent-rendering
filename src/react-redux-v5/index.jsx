import { createStore } from 'redux-v3';
import { Provider, connect } from 'react-redux-v5';

import { createRoot } from 'react-dom/client';
import { createConnectApp } from '../react-redux-connected/createConnectApp';

const App = createConnectApp({ createStore, connect, Provider });

const domRoot = document.getElementById('app');
if (!domRoot) throw new Error('No root element found with id "app"');

// concurrent mode
const root = createRoot(domRoot);
root.render(<App />);

// sync mode
// ReactDOM.render(<App />, domRoot);
