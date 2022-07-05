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

wsRouter.get('/ws', async (ctx, next) => {
  // ctx.websocket.send('Hello World');
  ctx.websocket.on('message', (message) => {
    console.log(message.toString());
  });

  return next;
});

const app = websockify(new Koa());
// app.ws.use((ctx) => {
//   // the websocket is added to the context as `ctx.websocket`.
//   ctx.websocket.send('Hello World');
//   ctx.websocket.on('message', (message) => {
//     console.log(message);
//   });
// });

app.ws.use(mount('/public', serve('src/public')));
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
