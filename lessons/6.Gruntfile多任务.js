/**
 * multitask 多任务 就是可以执行多次的任务
 * 可以配置一组属性， grunt每次执行的时候都会用到这个属性中的一个
 * 先找到同名属性，然后根据其它配置去执行任务
 * @param grunt
 */
module.exports = function(grunt){
    //初始化配置信息 可以定义一些属性和值
    grunt.initConfig({
        dinner:{
            buy:'buy', //在多任务里叫作target 执行任务的目标 this.target可以输出 this.data
            cook:'cook',
            eat:'eat'
        }

    });

    //我们可以在定义里得到config init中定义的值
    //this.target表示 任务的名字
    //this.data表示target的值
    //一共会执行3 次
    grunt.registerMultiTask('dinner',function(){
        grunt.log.writeln(this.target+"="+this.data);
    });

}