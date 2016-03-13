module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'public/javascripts/lib/**/*.js',
      'public/javascripts/*.js',
      'public/javascripts/services/*.js',
      'public/javascripts/services/REST/*.js',
      'public/javascripts/controllers/*.js',
      'public/javascripts/handlers/*.js',
      'tests/*.js'
    ],
    
    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],
  });
};