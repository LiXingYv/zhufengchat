'use strict'

/**
 * 按通配符删除所有的文件
 *
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
                '<%=config.dist%>/js/':'<%=config.app%>/js/index.js'
            }
        }
        },
        clean:{
            dist:{
                // **表示包括反斜杠在内的任意字符
                // * 匹配除反斜杠外的任意字符
                // ? 只匹配一个字符
                // {a,b} 以逗号分隔的一个list,命中a.js b.js
                // ! 则表示对当前的命中条件取反
                src:['<%=config.dist%>/**/*']
            }
        }
    });
}

/**
 * 1.演示普通的target用法
 **/