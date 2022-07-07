// @ts-check

(() => {
  const socket = new WebSocket(`ws://${window.location.host}/ws`);
  const formTag = document.getElementById('form');
  /** @type {HTMLInputElement | null} */
  // @ts-ignore
  const inputTag = document.getElementById('input');
  const chatListTag = document.getElementById('chat-list');

  if (!formTag || !inputTag || !chatListTag) {
    throw new Error('Init failed');
  }

  const adj = ['멋진', '사나운', '용맹한', '대담한'];
  const animals = ['표범', '돌고래', '해파리', '산호초'];

  /**
   *
   * @param {string[]} array
   * @return {string}
   */
  const pickRandom = (array) => {
    const { length } = array;
    if (length === 0) {
      throw new Error('array.length is 0');
    }
    const index = Math.floor(Math.random() * length);
    return array[index];
  };

  const nickname = `${pickRandom(adj)} ${pickRandom(animals)}`;

  formTag.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.send(
      JSON.stringify({
        nickname,
        message: inputTag.value,
      })
    );
    inputTag.value = '';
  });

  const renderChats = (msg) => {
    const chatDiv = document.createElement('div');
    chatDiv.textContent = `${msg.nickname}> ${msg.message}`;
    chatListTag.append(chatDiv);
  };

  socket.addEventListener('message', (e) => {
    const { type, payload: msg } = JSON.parse(e.data);

    if (type === 'sync') {
      msg.map((m) => renderChats(m));
    } else if (type === 'chat') {
      renderChats(msg);
    }
  });
})();
