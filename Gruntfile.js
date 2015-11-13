module.exports = function (grunt) {
    grunt.initConfig({
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'build'
            }
        },
        usemin: {
            html: 'build/index.html',
            css: 'build/css/*.css'
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'app/lib/bootstrap/dist/fonts/', src: ['**'], dest: 'build/fonts'},
                    {'build/index.html': 'app/index.html'},
                    {'build/favicon.ico': 'app/favicon.ico'}
                ]
            }
        },
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [{
                    src: [
                        'build/**/*.{jpg,jpeg,gif,png,js,css,eot,svg,ttf,woff}'
                    ]
                }]
            }
        },
        uglify:{
            options : {
                beautify : true,
                mangle   : false //混淆变量名
            }
        },
        clean: {
            main:['.tmp', 'build']
        },
        inline_angular_templates: {
            dist: {
                options: {
                    base: 'app/',
                    prefix: '/'
                },
                files: {
                    'build/index.html': ['app/pages/*.html']
                }
            }
        }
    })
    grunt.loadNpmTasks('grunt-usemin')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-rev')
    grunt.loadNpmTasks('grunt-inline-angular-templates')

    grunt.registerTask('default', [
        'clean',
        'copy',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'rev',
        'usemin',
        'inline_angular_templates'
    ])
}