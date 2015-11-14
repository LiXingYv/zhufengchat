phonecat
git clone --depth=14 https://github.com/angular/angular-phonecat.git
生成项目
npm install -g generator-gulp-angular
E:\gulpangular>ls
It's time to use Gulp tasks:
- `$ gulp` to build an optimized version of your application in folder dist
- `$ gulp serve` to start BrowserSync server on your source files with live reload
- `$ gulp serve:dist` to start BrowserSync server on your optimized application without live reload
- `$ gulp test` to run your unit tests with Karma
- `$ gulp test:auto` to run your unit tests with Karma in watch mode
- `$ gulp protractor` to launch your e2e tests with Protractor
- `$ gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

单元测试
E:\angular-phonecat>npm test
端到端测试
E:\angular-phonecat>npm start
E:\angular-phonecat>npm run protractor
