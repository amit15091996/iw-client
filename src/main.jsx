import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './user/store/store.js';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
