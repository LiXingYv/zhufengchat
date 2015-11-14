// Generated on 2015-06-09 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Configurable paths
  var config = {
    app: 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    //监听文件变化，当文件变化后运行指定的任务
    watch: {
      bower: {
        files: ['bower.json'],//用于指定监听的文件
        tasks: ['wiredep']//用来执行当指定文件变化时执行的任务
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],//js文件变化后重新执行jshint检查书写是否符合规范
        tasks: ['jshint'],
        options: {
          //会在后台启动一个任务，监控是否有文件变化，如果有变化执行任务
          livereload: true //为真则指定端口,默认用上面的端口号
          /**
           * 传统的做法是内嵌脚本
           * <script type='text/javascript' src='//localhost:35729/livereload.js'>
           * 不需要手工写，而是自动插入了这段js标签
           */
        }
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js']//告诉你修改了
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']//拷贝更新的style文件，并自动注入厂商信息
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'//引入端口号
        },
        //这里会自动注入自动刷新脚本
        //当这个
        files: [
          '<%= config.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,//在本地开一个9000端口
        open: true,//是否自动打开浏览器
        livereload: 35729,//监控文件变化端口 即时刷新
        keepalive: true,//是否挂起浏览器
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'//要想外部访问可以改为0.0.0.0
      },
      livereload: {
        options: {
          //可以是数组和函数 connect作为形参
          middleware: function(connect) {
            return [
              connect.static('.tmp'),//指定静态文件根路径
              connect().use('/bower_components', connect.static('./bower_components')),//为bower指定一个新的路径匹配
              connect.static(config.app)//根路径下的路径匹配
            ];
          }
        }
      },
      test: {
        options: {
          open: false,
          port: 9001,//端口改为了9001
          middleware: function(connect) {
            //先声明先寻路，一旦找到不再寻路
            return [
              connect.static('.tmp'),
              connect.static('test'),//增加了test目录
              connect().use('/bower_components', connect.static('./bower_components')),
              //app中的JS文件不可或缺
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'//这里有filepath跟在 filesFormat，只应用在没有dest的task 删除.tmp文件夹
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',//包含源代码
        '!<%= config.app %>/scripts/vendor/*',//排除第三方的js
        'test/spec/{,*/}*.js' //测试报用例
      ]
    },

    // Mocha testing framework configuration options
    //js测试框架 mochajs.org 生成精准的测试报告
    mocha: {
      all: {
        options: {
          run: true,
          //指定访问哪个页面内容来执行测试用例
          //一般要跟connect task配合使用
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    //编译sass到CSS并生成必要的文件
    sass: {
      options: {
        sourceMap: true,
        includePaths: ['bower_components']
        },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      server: {
        files: [{
          expand: true,//处理扩展路径
          cwd: '<%= config.app %>/styles',//指定当前路径
          src: ['*.{scss,sass}'],//源文件
          dest: '.tmp/styles',//目标文件临时文件
          ext: '.css'//扩展名
        }]
      }
    },

    // Add vendor prefixed styles
    //自动增加厂商前缀
    autoprefixer: {
      options: {
        //指定浏览器过滤条件 市场占用率大于1，最新的二个版本
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,//是否处理扩展
          cwd: '.tmp/styles/',//当前路径
          src: '{,*/}*.css',//源文件
          dest: '.tmp/styles/'//目标文件
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    //自动注入bower组件到html文件中
    wiredep: {
      app: {
        //最后改变了路径，变成了同级路径
        ignorePath: /^\/|\.\.\//,//排除到path中的哪一部分 默认取的是component相对于被插入的文件的路径
        src: ['<%= config.app %>/index.html'],
        //因为那些JS加在一起就是bootstrap.js不然就重复引用了
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
      },
      sass: {
        src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/styles/fonts/{,*/}*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    /**
     *
     */
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,//去掉boolean属性值
          collapseWhitespace: true,//清除除了script style pre textarea之外的空格
          conservativeCollapse: true,//自少保留一个空格
          removeAttributeQuotes: true,//移除所有的空格
          removeCommentsFromCDATA: true,//移除HTML注释
          removeEmptyAttributes: true,//删除值为空的HTML属性
          removeOptionalTags: true,//删除可选的tag 删除了结束标签
          removeRedundantAttributes: true,//删除冗余的属性 删除type=text
          useShortDoctype: true//使用短doctype声明方式
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    concat: {
      options:{
        separator:';'
      },
       dist: {
         src:['<%=config.app>/scripts/main.js','<%=config.app>/scripts/main2.js','<%=config.app>/scripts/main3.js'],
         dest:'<%=config.dist%>/scripts/concated.js'
       }
     },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',// *.webp */*.webp *并不能代表反斜杠,只有**才可以 根目录或一级目录下的webp
            '{,*/}*.html',//根目录或一级目录下的html
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          src: 'node_modules/apache-server-configs/dist/.htaccess',
          dest: '<%= config.dist %>/.htaccess'
        }, {
          expand: true,
          dot: true,
          cwd: '.',//当前目录，表示这一串目录也要对应生成
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= config.dist %>'
        }]
      },
      styles: {
        expand: true,//处理扩展路径
        dot: true,//是否包括点开头的文件
        cwd: '<%= config.app %>/styles',//当前目录
        dest: '.tmp/styles/',//目标路径
        src: '{,*/}*.css'//源文件
      }
    },

    // Generates a custom Modernizr build that includes only the tests you
    // reference in your app
    modernizr: {
      dist: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '!<%= config.dist %>/scripts/vendor/*'
          ]
        },
        uglify: true
      }
    },

    // Run some tasks in parallel to speed up build process
    //并行运行一些任务以加速构建过程
    concurrent: {
      server: [
        'sass:server',//将sass编译成css文件并输出到指定的目录
        'copy:styles' //
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'sass',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {//额外参数，通过 --allow-remote传入
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {//组合函数的参数
      //keepalive是一个可选参数 就是options里面的选择项
      // grunt task:abc:def:ghi 在注册体内this里赋一个flags属性，
      // this.flags {abc:true,def:true,ghi:true}  this.flags.keepalive 如果有直接取，如果没有取options中的值
      return grunt.task.run(['build', 'connect:dist:keepalive']);//connect为task dist是target keepalive是参数
    }
    //如果使用了registerMultiTask进行注册的话，
    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',//默认是串行的，可以依赖concurrent让它们并行执行
      'autoprefixer',//css处理task 把需要厂商前缀的自动加上
      'connect:livereload',//在connect上做的二次封装，就是在本地启一个webserver
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',//清空.tmp目录
        'concurrent:test',//并行执行拷贝css文件
        'autoprefixer'//自动添加厂商前缀
      ]);
    }

    grunt.task.run([
      'connect:test',
      'mocha'
    ]);
  });

  /**
   * md5 作用是让大容量信息在数字签名软件签署私人密钥前被压缩成一种保密的格式（就是把一个任意长度的字节串变换成一定长的16进制数字串）
   * cdn 尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，传输更快，更稳定 ，长缓存 cache-control
   * 入口文件不做缓存 index.html cache-control:no-cache
   * a.js?ts=时间戳/版本号
   * 1. 文件没有变更就不应该变化，会浪费更新。
   * 2. 覆盖同名文件，会出现时间差，出错
   * 3. CDN服务商会忽略查询字符串
   */
  grunt.registerTask('build', [
    'clean:dist',//先清空临时文件夹
    'wiredep',//wiredep找到component依赖并将其引入指定的html或css文件中
    'useminPrepare',//生成相关配置 generated 配置
    'concurrent:dist',//generated target跑不掉
    'autoprefixer',//自动加上厂商前缀
    'concat',//合并文件 没有有效的配置 因为concat动态生成的
    'cssmin',//CSS压缩
    'uglify',//JS压缩
    'copy:dist',
    'modernizr',//检测哪些特性输出定制版的modernizr
    'rev',//文件MD5值
    'usemin',
    'htmlmin'//html文件压缩的
  ]);

  //user-agent 以下规则针对所有的搜索引擎种类 *是一个通配符
  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
