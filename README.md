# elara-website

## 技术栈

- JavaScript
- React + TypeScript + Axios + Echarts + Hox + Andt + react-i18next
- TailwindCSS + CSS Modules + Scss


## 项目结构
主入口是Home路由，有登陆权限，登陆访问第三方Githup登陆

## 部署环境、CI、CD

### Test
测试环境地址：<a href="https://test-elara.patract.io">https://test-elara.patract.io</a></br>
测试环境打包 npm run build_test  也可以yarn build_test,把build包一起推上去
正式环境直接在线上build npm run build

```diff
- npm run build
+ npm run build_test
```

## 安装、运行、构建

- `npm i`
- `npm start`
- `npm build_test`
- `npm build`

## 开发


直接向**当前域名**（不跨域）发送的 API 请求会被统一代理到指定的后端服务，开发环境中由 CRA 管理代理

在 setupProxy 中默认配置的 API 请求代理（测试环境）：

```json
app.use(
    '/accountApi',
    proxy.createProxyMiddleware({
      target: 'https://test-elara.patract.io',
      changeOrigin: true,
      pathRewrite: {
        '^/accountApi': ''
      }
    })
  );
```

### 状态管理

**区分组件（树）内部状态和全局状态，全局状态里只存需要全局或者跨组件树维护的状态，优先使用组件（树）内部状态（Context、useState），避免全局状态泛滥**


更新环境变量后重新 `npm start`

使用绝对路径导入组件，避免多层级的相对路径导入

### Webpack Alias

使用绝对路径导入组件，避免多层级的相对路径导入

Webpack alias `@` 映射到项目根目录下的 `src` 目录

同时配置 **jsconfig.json** ，在 VSCode 内点击导入路径跳转到对应文件


### 国际化/多语言

`react-i18next` 配置：**src/i18n.js**

**组件函数外翻译：**

```js
import i18n from '@/i18n'

function eventHandler() {
  // 注意不要在文件顶级（函数外）中调用翻译，因为执行的时候翻译文件正在网络中加载，此时调用翻译结果是空字符串
  i18.t('xxx')
}
```

**组件函数内翻译：**

#### Using the hook

```react
 the hook
import { useTranslation } from 'react-i18next';

function MyComponent () {
  const { t, i18n } = useTranslation();
  return <h1>{t('Welcome to React')}</h1>
}
```

#### Using the Trans component

```react
import { Trans } from 'react-i18next'

export default function MyComponent () {
  return <Trans><H1>Welcome to React</H1></Trans>
}

// the translation in this case should be
"<0>Welcome to React</0>": "<0>Welcome to React and react-i18next</0>"
```

## Plans

- [X] 性能监控
- [ ] Bundless Dev （Snowpack、Vite）
- [ ] RxJS
- [ ] BFF