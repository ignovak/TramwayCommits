function fetchData (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.addEventListener('load', _ => resolve(xhr.response));
    xhr.send();
  });
}

fetchData('/tramway_commits.json').then(_ => {
  const data = Object.entries(JSON.parse(_)).map(([package, commits]) => {
      commits.forEach(_ => _.date = _.date.replace(/ .*/, ''));
      return {
        package,
        commits
      };
    })
    .sort((a, b) => a.package.localeCompare(b.package));

  const app = new Vue({
    el: '#app',
    data: {
      data: data,
      expand: false
    },
    methods: {
      commitUrl: (package, commit) => `https://code.amazon.com/packages/${package}/commits/${commit}`
    }
  });

});
