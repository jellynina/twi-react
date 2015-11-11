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
make sure the task will break when there is an error
```
npm install gulp-plumer --save-dev
```



## 2. browserify gulp task

* `gulp.src('src/main.js')`:all start form `main.js`
* `.pipe(plumber())`: make sure the task will break when there is an error
* `.pipe(browserify({ transform: 'reactify', debug: true}))`: 不懂`reactify`, debug的部分是建立map file.
`.pipe(concat('main.js'))`: 把js原始檔案接起來成為一個檔案`main.js`
`.pipe(gulp.dest('public'))`: 並且把上面那個接起來的檔案放到`public`資料夾裡面。


基本上browserify是唯一的task,但還是要寫一下default task.

***

## 自己把sass 加進來唄！

需要的`devDependencies`:
* gulp-sass
* gulp-sourcemaps
* gulp-uglify

***


## Creat Index Page

這個專案使用[Skeleton](http://getskeleton.com) framework

```
bower install skeleton
```

> 問題：怎麼讓bower install 到 `public/lib`?
> 設定`.bowerrc` 寫上 `"directory": "public/lib"`







