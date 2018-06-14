import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as packageActions from './actions/packageActions';
import * as uiActions from './actions/uiActions';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import fetchData from './util';

registerServiceWorker();

if (window.location.href.startsWith('https')) {
  window.location.href = window.location.href.replace(/^https/, 'http');
}

const store = configureStore({
  ui: {
    authors: [],
    author: window.location.hash.replace('#', '')
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
  fetchData('/amends.json'),
  fetchData('/commits.json'),
  fetchData('/tags.json')
]).then(([commitData, amendData, additionalCommits, tags]) => {
  const rejectedPackages = new Set();
  const rejectedCommits = new Set();
  additionalCommits.forEach(item => {
    if (!commitData[item.package]) {
      commitData[item.package] = [];
    }
    commitData[item.package].push({ commit: item.commit, date: '' });
  });
  amendData.forEach(_ => {
    const [set, item] = _.package ? [rejectedPackages, _.package] : [rejectedCommits, _.commit];
    if (_.action === 'remove') {
      set.add(item);
    } else {
      set.delete(item);
    }
  });
  const data = Object.entries(commitData)
    .slice(0, 1000)
    .map(([packageName, commits]) => {
      commits.forEach(_ => {
        _.date = _.date.replace(/ .*/, '')
        _.isRemoved = rejectedCommits.has(_.commit);
        _.description = (_.description || '').replace(/https?:\/\/(\S+)/g, '<a href="$&">$1</a>');
      });
      return {
        packageName,
        commits,
        isRemoved: rejectedPackages.has(packageName),
        tags: ['search', 'detail page', 'navigation']
      };
    })
    .sort((a, b) => a.packageName.localeCompare(b.packageName));
  store.dispatch(packageActions.loadData(data));
});
