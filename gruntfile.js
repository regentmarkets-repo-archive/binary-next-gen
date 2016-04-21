module.exports = grunt => {
    grunt.initConfig({
    concat: {
       dist: {
         src: [
           'public/sass/*.scss',
         ],
         dest: 'public/sass/build/build.scss',
        },
    },
    sass: {
      dist: {
        files: {
            'public/style.css': 'public/sass/build/build.scss',
        },
      },
    },
    watch: {
      source: {
        files: ['public/sass/*.scss'],
        tasks: ['concat', 'sass'],
        options: {
          livereload: true, // needed to run LiveReload
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'sass', 'watch']);
};
