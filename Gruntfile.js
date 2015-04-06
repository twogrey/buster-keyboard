module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    'index.html': 'index.jade'
                }
            }
        },
        sass: { // Task
            dist: { // Target
                options: { // Target options
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: { // Dictionary of files
                    'css/styles.css': 'sass/styles.scss' // 'destination': 'source'
                }
            }
        },
        autoprefixer: {
            single_file: {
                options: {
                    browsers: ['last 2 versions', 'ie 9']
                },
                src: 'css/styles.css'
            }
        },
        jshint: {
            all: ['js/script.js']
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['js/jquery.js', 'js/*.js'],
                dest: 'js/dest/built.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'js/dest/built.min.js': ['js/dest/built.js']
                }
            }
        },
        webfont: {
            icons: {
                src: "img/svg/*.svg",
                dest: "fonts/icons",
                destCss: "sass",
                options: {
                    engine: "node", 
                    stylesheet: "scss",
                    htmlDemo: false,
                    templateOptions: {
                        classPrefix: ''
                    }
                }
            }
        },
        watch: {
            sassConfig: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    livereload: true,
                }
            },
            jadeConfig: {
                files: ['index.jade'],
                tasks: ['jade'],
                options: {
                    livereload: true,
                }
            },
            jsConfig: {
                files: ['js/script.js'],
                tasks: ['jshint','concat','uglify'],
                options: {
                    livereload: true,
                }
            },
            webfontConfig: {
                files: ['img/svg/*.svg'],
                tasks: ['webfont'],
                options: {
                    livereload: true,
                }
            },
            grunt: {
                files: ["Gruntfile.js"],
                tasks: ["default"],
                options: {
                    livereload: true,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-webfont');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.task.registerTask('default', 'watch')

};
