// import NProgress from 'nprogress';

// import 'nprogress/nprogress.css';


// TODO: probably makes sense to move in UI package
class LoadingBar {
  constructor () {
    this.init();
  }

  init () {
    NProgress.configure({
      showSpinner: false,
      minimum: 0.4,
      trickleSpeed: 50,
      easing: 'ease',
      speed: 400,
    });
  }

  start () {
    return NProgress.start();
  }

  done () {
    return NProgress.done();
  }
}

// export default LoadingBar();
// export default new LoadingBar();
