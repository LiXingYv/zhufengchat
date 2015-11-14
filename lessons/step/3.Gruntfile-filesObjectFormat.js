'use strict'

/**
 * filesObjectFormat
 * files  不再是一个数组，而是一个键值对的形式
 *
 * @param grunt
 */
module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config = {
        app:'app',
        dist:'dist'
    }

    grunt.initConfig({
        config:config,
        copy:{
            dist_html:{
                files:{
                    '<%=config.dist%>/index.html':'<%=config.app%>/index.html',
                    '<%=config.dist%>/js/index.js':'<%=config.app%>/js/index.js'
                }
            }
        },
        clean:{
            dist:{
                //src:'<%=config.dist%>/index.html' 可以指定单个文件
                src:['<%=config.dist%>/index.html','<%=config.dist%>/js/index.js']//也可以指定数组
            }
        }
    });
}

/**
 * 1.演示普通的target用法
 **/