/**
 * 可以使用init方法初始化一些数据并用在不同的任务里面
 * @param grunt
 */
module.exports = function(grunt){
    //初始化配置信息 可以定义一些属性和值
    grunt.initConfig({
        say:{
            words:'hello'
        }
    });

//我们可以在定义里得到config init中定义的值
    grunt.registerTask('say',function(){
        //grunt.config其实得到的就是整个config 对象
        var words = grunt.config.get('say.words');
        grunt.log.writeln(words);
    });

}