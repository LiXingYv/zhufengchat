/**
 * 执行任务时强行触发错误
 * @param grunt
 */
module.exports = function(grunt){
    grunt.registerTask('interview',function(status){
        if(status == 'boy'){
            grunt.warn('write a red-black tree with c');
        }else if(status == 'married'){
            grunt.fatal('write a red-black tree with assembly language');
        }else{
            grunt.log.write('write hello world with office-word');
        }
        grunt.log.write('You have been accepted');

    });
    /**
     * grunt say
     * grunt say:world :后面是参数的值
     */
}