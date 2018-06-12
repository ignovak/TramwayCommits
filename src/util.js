export default function fetchData (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callback = 'callback' + +new Date() + (Math.random() * 1000).toFixed();
    const host = 'localhost:8568';
    script.src = 'http://' + host + url + '?callback=' + callback;
    window[callback] = _ => resolve(_);
    document.body.appendChild(script);
  });
}
