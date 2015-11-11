# Build a Microblogging App With Flux and React

from scrach!

## 1. Set up gulp

```
npm init
```

install gulp

```
npm install gulp --save-dev
```

在課程中有指定版本`@3`，但我先試試看不指定會怎麼樣。

### Browserify


這邊注意一下要安裝甚麼，因為`gulp-browerify`不存在了！

```js
"devDependencies": {
    "browserify": "^11.1.0",
    "gulp": "^3.9.0",
    "gulp-concat": "^2.6.0",
    "gulp-plumber": "^1.0.1",
    "reactify": "^1.1.1",
    "through2": "^2.0.0"
  },
```

### reactify

```
npm install reactify@1 --save-dev
```

把檔案接起來的：
```
npm install gulp-concat --save-dev
```


避免`pipe`破碎的：可以幫助debug
```
npm install gulp-plumer --save-dev
```








