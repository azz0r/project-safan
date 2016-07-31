module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
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
    copy: {
      assets: {
        expand: true,
        cwd: 'src/assets',
        src: '**',
        dest: 'dist/assets',
      },
      css: {
        expand: true,
        cwd: 'src/css',
        src: '**',
        dest: 'dist/css',
      },
    },
    concat: {
      dist: {
        src: [  "src/lib/**/*.js",
        "src/game/**/*.js"
      ],
      dest: 'dist/js/<%= pkg.name %>.js'
    }
  },
  watch: {
    files: 'src/**/*.js',
    tasks: ['concat', 'copy']
  },
  open: {
    dev: {
      path: 'http://localhost:8080/index.html'
    }
  }
});

grunt.registerTask('default', ['concat', 'copy', 'connect', 'open', 'watch']);

}
