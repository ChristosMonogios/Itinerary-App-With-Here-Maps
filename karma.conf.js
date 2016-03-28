module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'public/javascripts/lib/angularjs-1.5.0/angular.js',
      'public/javascripts/lib/angularjs-1.5.0/angular-mocks.js',
      'public/javascripts/lib/angularjs-1.5.0/angular-resource.js',
      'public/javascripts/lib/angularjs-1.5.0/angular-route.js',
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