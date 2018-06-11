import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';

registerServiceWorker();

function fetchData (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callback = 'callback' + +new Date() + (Math.random() * 1000).toFixed();
    const host = 'localhost:8568';
    script.src = 'http://' + host + url + '?callback=' + callback;
    window[callback] = _ => resolve(_);
    document.body.appendChild(script);
  });
}

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
  const data = Object.entries(commitData)
    .map(([packageName, commits]) => {
      commits.forEach(_ => {
        _.date = _.date.replace(/ .*/, '')
        _.isRemoved = rejectedCommits.has(_.commit);
      });
      return {
        packageName,
        commits,
        isRemoved: rejectedPackages.has(packageName)
      };
    });

  ReactDOM.render(<App data={data} />, document.getElementById('root'));


});
