module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['src/*.*', 'spec/*.*'],
                tasks: ['default'],
                options: {
                    nospawn: true
                }
            }
        },
        clean: ['build', 'reports', 'README.html'],
        jshint: {
            files: 'src/koTrackChanges.js',
            options: {
                force: true
            }
        },
        jasmine : {
            src : 'src/koTrackChanges.js',
            options : {
                specs : 'spec/*.js',
                vendor: ['lib/*.js', 'src/lodash.custom.min.js'],
                template : require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    coverage: 'reports/coverage.json',
                    report: {
                        type: 'lcov',
                        options: {
                            dir: 'reports/coverage'
                        }
                    }
                }
            }
        },
        concat: {
            trackChanges: {
                options: {
                    separator: '\n\n',
                    banner: '// <%= pkg.name %> <%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> Simon LeVasseur |  http://www.opensource.org/licenses/mit-license\n'
                },
                files: {
                    'build/<%= pkg.name %>.js': ['src/<%= pkg.name %>.js'],
                    'build/<%= pkg.name %>WithLoDash.js': ['src/lodash.custom.min.js', 'src/<%= pkg.name %>.js']
                }
            }
        },
        uglify: {
            trackChanges: {
                options: {
                    stripBanners: true,
                    banner: '// <%= pkg.name %> <%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> Simon LeVasseur |  http://www.opensource.org/licenses/mit-license\n'
                },
                files: {
                    'build/<%= pkg.name %>.min.js': 'build/<%= pkg.name %>.js',
                    'build/<%= pkg.name %>WithLoDash.min.js': 'build/<%= pkg.name %>WithLoDash.js'
                }
            }
        },
        coveralls: {
            options: {
              force: true
            },
            main_target: {
                src: 'reports/coverage/lcov.info'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-coveralls');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'jshint', 'jasmine', 'concat', 'uglify']);
    grunt.registerTask('prod', ['default', 'coveralls']);
};