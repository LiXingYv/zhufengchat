/**
 * 定义一个任务，这个任务的任务是执行其它任务
 * @param grunt
 */
module.exports = function(grunt){
    grunt.registerTask('buy',function(){
       grunt.log.writeln('buy');
    });

    grunt.registerTask('cook',function(){
        grunt.log.writeln('cook');
    });

    grunt.registerTask('eat',function(){
        grunt.log.writeln('eat');
    });

    //这里要注意定会引起和依赖不能共存，如果定义的本任务的主体那么依赖的任务就不执行了
    grunt.registerTask('dinner',['buy','cook','eat']);

}