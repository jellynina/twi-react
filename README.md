# Build a Microblogging App With Flux and React

from scrach!

This is a practice from [tuts+](https://tutsplus.com) course: [Build a Microblogging App With Flux and React][published url] by **[Andrew Burgess][instructor url]**

The sourcecode from the class is [here][coursecode url]

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

因為不是使用`gulp-browerify`，所以需要安裝`through2`

```
npm install through2 --save-dev
```

並且在`plumber()`之後加上

```js
.pipe(through2.obj(function (file, enc, next){
            browserify(file.path, {'debug': true})
                .transform('reactify')
                .bundle(function(err, res){
                    file.contents = res;
                    next(null, file);
                });
        }))
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
* ~~`.pipe(browserify({ transform: 'reactify', debug: true}))`: 不懂`reactify`, debug的部分是建立map file.~~
* `through2`
* `.pipe(concat('main.js'))`: 把js原始檔案接起來成為一個檔案`main.js`
* `.pipe(gulp.dest('public'))`: 並且把上面那個接起來的檔案放到`public`資料夾裡面。


基本上browserify是唯一的task,但還是要寫一下default task.



## Creat Index Page

這個專案使用[Skeleton](http://getskeleton.com) framework

```
bower install skeleton
```

> 問題：怎麼讓bower install 到 `public/lib`?

> 設定`.bowerrc` 寫上 `"directory": "public/lib"`


## Start a Server

start writing our server-side code with `EXPRESS`!

```
npm install express --save
```

另外需要`EJS` embedded JavaScript templating system.

```
npm install ejs --save
```

在`server.js`中，接著`express()`

* `.set('view engine', 'ejs')` set the view engine to be `ejs`
* `.use(express.static('./public'))`: 好像是將`'./public'`是為靜態？
* anything in the public we're going to serve them
* `.get()`:

	這邊比較像是在做server request and response. render 出 index.很像在[profile_search](https://github.com/jellynina/TH_JSFull_profile_search)中的router and view.

### server.js

```js
var express =require('express');

express()
  .set('view engine', 'ejs')
  .use(express.static('./public'))
  .get('*', function (req, res){
    res.render('index');
  })
  .listen(3000);
```


> 通常`express()`會放到一個`var`裡面，但這邊不需要。

### 建立`views`

在`views/index.ejs`，然後就可以跑跑看`node server.js`，就會render出一個`index.html`。但其實我們沒有真的有一個`index.html`。

***

# Server Side Code!!!

> 呦呼呼～第一次寫server side code!!!! 我要灑花一下

> `*･゜ﾟ･*:.｡..｡.:*･'(*ﾟ▽ﾟ*)'･*:.｡. .｡.:*･゜ﾟ･*`

## User Account

```
npm install passport --save
```

`passport`是一個可以拿來建立使用者帳號資料的，不同的strategies會有不同的登入方式，這邊使用`passport-local`，這些資料存在`locallydb`。

> 如：facebook登入

### `login.js`

```js
var db = new LocallyDB('./.data');
```

將創造出來的使用者帳號密碼資料放在`.data`這個隱藏資料夾裡面。

### Installing Middleware

`3.3`: 好難懂...

* `express-session`: keep user login accross multiple requests.
* `cookie-parser`: 
* `body-parser`

```js
var router = require('express').Router();
var bodyPerser = require('body-perser');
router.use(bodyPerser.urlencoded({ extended: true })); // Login page
```

這邊則是在登入表單之後啟動的，url encoded body.然後再去`passport.use()`去做比對。

***

# Client side

## Creating Constants and Actions

先安裝`flux`

```
npm install flux@2 --save
```

`src/dispatcher.js` 調度員

```js
dispatcher.register(function (action) {
    console.log(action);
});
```

all action pass to dispatcher will be sent to register function.這樣可以從console知道什麼時候有什麼`action`.

再來就是要建立actions的name list: `src/constants.js` flux patterns.

```js
module.exports = {
  CHIRP: 'CHIRP',
  CHIRPED: 'CHIRPED',
  ...
};
```

需要使用到action的時候只要打`constants.CHIRP`就可以了！

這邊`'CHIRP'`表示**前端**的按下按鈕行為，`'CHIRPED'`則是**後端**接收到資料的行為。可以用時態來表示前後端的行為區別。

一般在寫`actions.js`的時候每一個action都要建一個這樣的function

```js
exports.chirp = function (data) {
    dispatcher.dispatch({
        actionType: constants.CHIRP,
        data: data
    });
};
```

同樣的夠重複很多遍，另一個比較簡單的方法就是直接抓`constants`裡面的list

```js
Object.keys(constants).forEach(function (key){});
```

* 在這裡面，要把原本全大寫配上`_`的action name 變成 camelcase的funciton name.
* 然後在把原本的`function (data)`放進去。



***

# 擴充項目

* facebook passport
* sass


## 自己把sass 加進來唄！

需要的`devDependencies`:
* gulp-sass
* gulp-sourcemaps
* gulp-uglify

***


[published url]: https://code.tutsplus.com/courses/build-a-microblogging-app-with-flux-and-react
[instructor url]: https://tutsplus.com/authors/andrew-burgess
[coursecode url]: https://github.com/tutsplus/build-a-microblogging-app-with-react-and-flux
