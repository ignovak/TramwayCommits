function fetchData (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', _ => resolve(JSON.parse(xhr.response)));
    xhr.send();
  });
}

function sendData (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callback = 'callback' + +new Date + (Math.random() * 1000).toFixed();
    script.src = 'http://localhost:8568' + url + '?callback=' + callback;
    window[callback] = _ => resolve(_);
    document.body.appendChild(script);
  });
}

const app = new Vue({
  el: '#app',
  data: {
    data: [],
    expand: false,
    hideRemoved: true,
    filters: {
      username: ''
    }
  },
  methods: {
    change: item => {
      sendData(`/${ item.isRemoved ? 'remove' : 'restore' }/package/` + item.package).then(_ => {
        app.hideRemoved = false;
      });
    },
    commitUrl: (package, commit) => `https://code.amazon.com/packages/${package}/commits/${commit}`,
    update: function () {
      this.data = data
        .filter(_ => {
          if (!this.filters.username) return true;
          return _.commits.some(_ => _.author == this.filters.username);
        });
    }
  }
});

let data;

Promise.all([
  fetchData('/tramway_commits.json'),
  sendData('/amends.json')
]).then(([commitData, amendData]) => {
  const rejectedPackages = new Set();
  amendData.forEach(_ => {
    if (_.action == 'remove') {
      rejectedPackages.add(_.package);
    } else {
      rejectedPackages.delete(_.package);
    }
  });
  data = Object.entries(commitData)
    .map(([package, commits]) => {
      commits.forEach(_ => _.date = _.date.replace(/ .*/, ''));
      return {
        package,
        commits,
        isRemoved: rejectedPackages.has(package)
      };
    })
    .sort((a, b) => a.package.localeCompare(b.package));

  app.update();

});
