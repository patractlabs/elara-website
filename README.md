# elara-website

Front-end application developed using React to provide interaction for [elara services](https://github.com/patractlabs/elara), You can use it to build your own front-end application for elara local services.

### Install

```
yarn
```

### DEV / Test

Modify the proxy configuration of the corresponding environment in the file `src/setupProxy.js`

npm script

```
yarn start

```

### Build

Change the publicPath configuration of the corresponding environment in the file `src/config/origin.ts`

npm script

```
yarn build

```

### State

No State Container such as `Redux`, just use `Context` to manage the application state.

### Authorised Login

This application only support Github Authorized Authentication Login. For more information,Refer to the elara service and the [Github documentation](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps).
