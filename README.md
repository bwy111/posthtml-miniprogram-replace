# babel-plugin-replace

## 介绍

替换小程序 ml 文件属性的 posthtml 插件

## 安装

```
yarn add posthtml-miniprogram-replace --dev
```

```
npm install posthtml-miniprogram-replace -D
```

## 使用


```js
import posthtml from 'posthtml';
import { postHtmlReplace } from 'posthtml-miniprogram-replace';

const result = posthtml([postHtmlReplace({
    sourceHtmlMap: {
      "wx:if": "wx:if",
      "wx:for": "wx:for"
    },
    htmlMap: {
      "wx:if": "tt:if",
      "wx:for": "tt:for"
    },
    extname: '.ttml',
  })
  .process(html, { sync: true })
  .html

console.log(result)
```

转换前


```html
<include src="./tpl/header.html" />
<import src="./tpl/toast.html" />

<view wx:if="{{ errPage }}" class="error-page"></view>
<view wx:for="{{list}}"></view>

```

转换后


```html
<include src="./tpl/header.ttml" />
<import src="./tpl/toast.ttml" />

<view tt:if="{{ errPage }}" class="error-page"></view>
<view tt:for="{{list}}"></view>
```
