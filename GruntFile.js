module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 8080,
          base: './dist'
        }
      }
    },
    clean: {
      default: ['dist/'],
    },
    copy: {
      assets: {
        expand: true,
        cwd: 'src/assets',
        src: '**',
        dest: 'dist/assets',
      },
      phaser: {
        expand: true,
        cwd: 'src/lib',
        src: '**',
        dest: 'dist/lib',
      },
      js: {
        expand: true,
        cwd: 'src/js',
        src: '**',
        dest: 'dist/js',
      },
      css: {
        expand: true,
        cwd: 'src/css',
        src: '**',
        dest: 'dist/css',
      },
      html: {
        expand: true,
        cwd: 'src/',
        src: 'index.html',
        dest: 'dist/',
      },
    },
    concat: {
      dist: {
        src: [
          "src/js/**/*.js"
        ],
        dest: 'dist/js/game.min.js'
      }
    },
    watch: {
      files: ['**/*'],
      tasks: ['default']
    },
    open: {
      dev: {
        path: 'http://localhost:8080/index.html'
      }
    }
  });

  grunt.registerTask('default', [
    'clean',
    'concat',
    'copy',
    'connect',
    'open',
    'watch'
  ]);
}
