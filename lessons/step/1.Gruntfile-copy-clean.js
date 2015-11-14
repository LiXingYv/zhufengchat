'use strict'
/**
 *  讲解普通的copy clean 命令
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
                src:'<%=config.app%>/index.html',//源文件
                dest:'<%=config.dist%>/index.html'//目标文件
            },
            dist_js:{
                src:'<%=config.app%>/js/index.js',//源文件
                dest:'<%=config.dist%>/js/index.js'//目标文件
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