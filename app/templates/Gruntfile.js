// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	// show elapsed time at the end
	require('time-grunt')(grunt);

	// configurable paths
	var yeomanConfig = {
		src: 'src',
		build: 'build'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			configFiles: {
				files: [ 'Gruntfile.js'],
				options: {
					reload: true
				}
			},
			compass: {
				files: ['<%%= yeoman.src %>/css/{,*/}*.{scss,sass}'],
				tasks: ['compass:server']
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%%= yeoman.src %>/templates/{,*/}*.hbs',
					'{.tmp,<%%= yeoman.src %>}/css/{,*/}*.css',
					'{.tmp,<%%= yeoman.src %>}/js/{,*/}*.js',
					'<%%= yeoman.src %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				],
				tasks: ['assemble']
			}
		},
		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, yeomanConfig.src)
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'test')
						];
					}
				}
			},
			build: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.build)
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:<%%= connect.options.port %>'
			}
		},
		clean: {
			build: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%%= yeoman.build %>/*',
						'!<%%= yeoman.build %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		sass: {
			options: {
				sourcemap: true,
				lineNumbers: true
			}
		},
		compass: {
			options: {
				sassDir: '<%= yeoman.src %>/css',
				cssDir: '.tmp/css',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.src %>/images',
				javascriptsDir: '<%= yeoman.src %>/js',
				fontsDir: '<%= yeoman.src %>/css/fonts',
				importPath: '<%= yeoman.src %>/bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/css/fonts',
				relativeAssets: false,
				debugInfo: true,
				outputStyle: 'expanded',
				noLineComments: false
			},
			build: {
				options: {
					generatedImagesDir: '<%= yeoman.build %>/images/generated',
					outputStyle: 'compressed',
					noLineComments: true
				}
			},
			server: {
				options: {
					debugInfo: true,
					noLineComments: false
				}
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			build: {}
		},*/
		rev: {
			build: {
				files: {
					src: [
						'<%%= yeoman.build %>/js/{,*/}*.js',
						'<%%= yeoman.build %>/css/{,*/}*.css',
						'<%%= yeoman.build %>/css/fonts/*'
					]
				}
			}
		},
		assemble: {
			options: {
				flatten: true,
				layout: '<%%= yeoman.src %>/templates/layouts/default.hbs',
				partials: '<%%= yeoman.src %>/templates/partials/*.hbs'
			},
			pages: {
				files: {
					'<%%= yeoman.src %>/': ['<%%= yeoman.src %>/templates/pages/*.hbs', '!<%%= yeoman.src %>/templates/pages/index.hbs']
				}
			},
			index: {
				files: {
					'<%%= yeoman.src %>/': ['<%%= yeoman.src %>/templates/pages/index.hbs']
				}
			}
		},
		useminPrepare: {
			options: {
				dest: '<%%= yeoman.build %>'
			},
			html: ['<%%= yeoman.src %>/*.html']
		},
		usemin: {
			options: {
				dirs: ['<%%= yeoman.build %>']
			},
			html: ['<%%= yeoman.build %>/{,*/}*.html'],
			css: ['<%%= yeoman.build %>/css/{,*/}*.css']
		},
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: '<%%= yeoman.src %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%%= yeoman.build %>/images'
				}]
			}
		},
		cssmin: {
			// This task is pre-configured if you do not wish to use Usemin
			// blocks for your CSS. By default, the Usemin block from your
			// `index.html` will take care of minification, e.g.
			//
			//     <!-- build:css({.tmp,src}) css/styles.css -->
			//
			// build: {
			//     files: {
			//         '<%%= yeoman.build %>/css/styles.css': [
			//             '.tmp/css/{,*/}*.css',
			//             '<%%= yeoman.src %>/css/{,*/}*.css'
			//         ]
			//     }
			// }
		},
		htmlmin: {
			build: {
				options: {
					// removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					// collapseWhitespace: true,
					// collapseBooleanAttributes: true,
					// removeAttributeQuotes: true,
					// removeRedundantAttributes: true,
					// useShortDoctype: true,
					// removeEmptyAttributes: true,
					// removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%%= yeoman.src %>',
					src: '*.html',
					dest: '<%%= yeoman.build %>'
				}]
			}
		},
		// Put files not handled in other tasks here
		copy: {
			build: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%%= yeoman.src %>',
					dest: '<%%= yeoman.build %>',
					src: [
						'*.html',
						'*.{ico,png,txt}',
						'.htaccess',
						'images/**',
						'css/fonts/*'
					]
				}]
			}
		},
		concurrent: {
			server: [
				'compass'
			],
			build: [
				'sass',
				'compass',
				'htmlmin',
				'cssmin',
				'usemin'
			]
		}
	});

	grunt.loadNpmTasks('assemble');

	grunt.registerTask('server', function (target) {
		if (target === 'build') {
			return grunt.task.run(['build', 'open', 'connect:build:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'connect:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'connect:test'
	]);

	grunt.registerTask('build', [
		'clean:build',
		'assemble',
		'useminPrepare',
		'concurrent:build',
		'concat',
		'cssmin',
		'uglify',
		'copy:build',
		'usemin'
	]);

	grunt.registerTask('default', [
		'test',
		'build'
	]);
};
