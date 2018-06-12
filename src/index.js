import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as packageActions from './actions/packageActions';
import * as uiActions from './actions/uiActions';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import fetchData from './util';

import 'bootstrap/dist/css/bootstrap.css';

registerServiceWorker();

if (window.location.href.startsWith('https')) {
  window.location.href = window.location.href.replace(/^https/, 'http');
}

const store = configureStore({
  ui: {
    authors: []
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

fetchData('/users.json').then(users => store.dispatch(uiActions.loadAuthors(users)));

Promise.all([
  fetchData('/tramway_commits.json'),
  fetchData('/amends.json')
]).then(([commitData, amendData]) => {
  const rejectedPackages = new Set();
  const rejectedCommits = new Set();
  amendData.forEach(_ => {
    const [set, item] = _.package ? [rejectedPackages, _.package] : [rejectedCommits, _.commit];
    if (_.action === 'remove') {
      set.add(item);
    } else {
      set.delete(item);
    }
  });
  const authors = new Set();
  const data = Object.entries(commitData).slice(0, 1000)
    .map(([packageName, commits]) => {
      commits.forEach(_ => {
        _.date = _.date.replace(/ .*/, '')
        _.isRemoved = rejectedCommits.has(_.commit);
        authors.add(_.author);
      });
      return {
        packageName,
        commits,
        isRemoved: rejectedPackages.has(packageName)
      };
    });
  store.dispatch(uiActions.loadAuthors([...authors].sort()));
  store.dispatch(packageActions.loadData(data));
});
