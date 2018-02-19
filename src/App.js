import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import Container from './components/Container';
import configureStore from './redux/store';

import './styles.css'

const history = createHistory();
const store = configureStore(history);

export default function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Container />
      </Router>
    </Provider>
  );
}
