// // @ts-check

const Koa = require('koa');
const Pug = require('koa-pug');
const path = require('path');

const app = new Koa();

// @ts-ignore
const pug = new Pug({
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
