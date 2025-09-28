requirejs.config({
  baseUrl: "assets/scripts",
  paths: {
    localStorageController: "./lib/localStorageController",
    tasksController: "./lib/tasksController",
    btnController: "./lib/btnController",
    jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min",
    moment: "//cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min",
  },
});

require(["main"]);
