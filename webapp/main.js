function fetchData (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', _ => resolve(JSON.parse(xhr.response)));
    xhr.send();
  });
}

Promise.all([
  fetchData('/tramway_commits.json'),
  fetchData('/amends.json')
]).then(([commitData, amendData]) => {
  const rejectedPackages = new Set();
  amendData.forEach(_ => {
    if (_.action == 'remove') {
      rejectedPackages.add(_.package);
    } else {
      rejectedPackages.delete(_.package);
    }
  });
  const data = Object.entries(commitData)
    .map(([package, commits]) => {
      commits.forEach(_ => _.date = _.date.replace(/ .*/, ''));
      return {
        package,
        commits,
        isRemoved: rejectedPackages.has(package)
      };
    })
    .sort((a, b) => a.package.localeCompare(b.package));

  const app = new Vue({
    el: '#app',
    data: {
      data: data,
      expand: false,
      hideRemoved: true
    },
    methods: {
      change: item => {
        fetchData(`/${ item.isRemoved ? 'remove' : 'restore' }/package/` + item.package).then(_ => {
          app.hideRemoved = false;
        });
      },
      commitUrl: (package, commit) => `https://code.amazon.com/packages/${package}/commits/${commit}`
    }
  });

});
