'use strict'

/**
 * files fileArrayFormat 可以用数组的形式组织多个源文件到目标文件的映射
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
                files:[
                    {src:'<%=config.app%>/index.html',dest:'<%=config.dist%>/index.html'},//目标文件
                    {src:'<%=config.app%>/js/index.js',//源文件
                        dest:'<%=config.dist%>/js/index.js'}//目标文件
                ]//fileArrayFormat 里面有多个src到target的映射，避免多个target
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