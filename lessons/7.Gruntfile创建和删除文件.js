/**
 * 很多插件里都要操作文件和目录
 *
 */
module.exports = function(grunt){
    grunt.registerTask('create',function(){
        grunt.file.mkdir('javascript');
    });

    grunt.registerTask('clean',function(){
        grunt.file.delete('javascript');
    });

}