module.exports = function(grunt) {
    
    grunt.registerTask('default', 'Testing out Grunt logging and task callbacks', ['watch']);

    grunt.registerTask('fun', 'This task is for fun only', function() {
        grunt.log.writeln('This the *fun* Grunt task');
    });
 
    grunt.registerTask('serious', 'This task is for serious stuff only', function() {
        grunt.log.writeln('Wipe that smirk off your face; this is serious.');
    });
    
    grunt.initConfig({
        watch: {
            files: ['Gruntfile.js']
        },
        
        copy: {
            main: {
              src: ['assets/js/*.js'],
              dest: './dest/'
            }
            
        }
    
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

};