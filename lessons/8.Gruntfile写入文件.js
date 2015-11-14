/**
 * 会把读取到的文件写入到文件里面
 *
 */
module.exports = function(grunt){
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json')
    });

    grunt.registerTask('after',function(){
        var originalContent = grunt.file.read('./test.js','utf8');
        var comment = '//projectName <%=pkg.name%>,author <%=pkg.author%>'+grunt.util.normalizelf('\n');
        //mvc这个其实是用config对象填充了对象
        comment = grunt.template.process(comment);
        grunt.file.write('test2.js',comment+originalContent);
    });

}