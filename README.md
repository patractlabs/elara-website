# elara-website

A Front-end application developed using `React` to provide interaction and statistical analysis for [elara](https://github.com/patractlabs/elara-ts). Authorize to log into your github account and create your own projects, and for each project you can view data traffic and bandwidth usage.

## Install dependencies

```
yarn install
```

## DEV

Modify the proxy configuration of the corresponding environment in the file `src/setupProxy.js`

```javascript
module.exports = function (app) {
  app.use(
    '/accountApi',  // This variable should be the same as the API_DOMAIN variable of the development environment in the src/config/origin.ts file
    proxy.createProxyMiddleware({
      target: 'https://elara.patract.io', //replace this to your own elara service url
      ...
    })
  )
}
```

Then run the npm script

```
yarn start

```

## Production Build

Change the publicPath configuration of the corresponding environment in the file `src/config/origin.ts`

run the npm script

```
yarn build:prod

```

## Translation( i18n )

The language profile is located at `config/locales/*`, You can modify the JSON fields to suit your needs.

## State management

No State Container such as `Redux`, just use `Context` to manage the application state.

## Authorised Login

This application only support Github Authorized Authentication Login. For more information,Refer to the elara [https://github.com/patractlabs/elara-ts] and the [Github documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps).
