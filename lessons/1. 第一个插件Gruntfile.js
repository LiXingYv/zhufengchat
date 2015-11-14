//1.第一个问题 什么时候必须用module.exports
module.exports = function(grunt){
    //创建一个任务 ，第一个参数是任务的名称，第二个是任务的定义
    //然后执行grunt的话就会自动寻找叫 default的任务，并自动执行回调函数
    grunt.registerTask('default',function(){
        console.log('hello zfpx');
        grunt.log.write('hello zfpx');
        console.log(module);
    });
}