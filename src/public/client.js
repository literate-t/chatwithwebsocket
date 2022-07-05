// @ts-check

// undef 에러를 해결하기 위해 public/.eslintrc.js 파일을 생성 후 browser: true를 설정
// 이렇게만 하면 socket 변수가 브라우저 콘솔에서 접근할 수 있게 된다
// 그러므로 즉시 실행 함수로 감싼다
// const socket = new WebSocket(`ws://${window.location.host}/ws`);
(() => {
  const socket = new WebSocket(`ws://${window.location.host}/ws`);
  socket.addEventListener('open', () => {
    socket.send('Hello I am gloomy');
  });
})();
