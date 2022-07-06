// @ts-check

const path = require('path');
const Koa = require('koa');
const Pug = require('koa-pug');
const websockify = require('koa-websocket');
const Router = require('@koa/router');
const serve = require('koa-static');
const mount = require('koa-mount');

// @ts-ignore
const wsRouter = Router();
const app = websockify(new Koa());

wsRouter.get('/ws', async (ctx, next) => {
  // ctx.websocket.send('Hello World');
  ctx.websocket.on('message', (data) => {
    try {
      const { message, nickname } = JSON.parse(data);
      // 이건 unicast 보낸 사람한테만 보냄
      // ctx.websocket.send(
      //   JSON.stringify({
      //     nickname,
      //     message,
      //   })
      // );

      const { server } = app.ws;
      if (!server) {
        return;
      }

      server.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            nickname,
            message,
          })
        );
      });
    } catch (err) {
      console.error(err);
    }
  });

  // return next;
});

// app.ws.use((ctx) => {
//   // the websocket is added to the context as `ctx.websocket`.
//   ctx.websocket.send('Hello World');
//   ctx.websocket.on('message', (message) => {
//     console.log(message);
//   });
// });

app.use(mount('/qwer', serve('src/public')));
app.ws.use(wsRouter.routes()).use(wsRouter.allowedMethods());

// @ts-ignore
// eslint-disable-next-line no-new
new Pug({
  viewPath: path.resolve(__dirname, './views'),
  app,
});

app.use(async (ctx) => {
  await ctx.render('main');
});

app.listen(5000);

// app.use(async (ctx, next) => {
//   ctx.body = 'Hello World';
//   await next(); // call a next middleware
//   ctx.body = `[${ctx.body}]`;
// });

// app.use(async (ctx) => {
//   ctx.body = `<${ctx.body}>`;
// });
