requirejs.config({
  baseUrl: "assets/scripts",
  paths: {
    localStorageController: "./lib/localStorageController",
    tasksController: "./lib/tasksController",
    btnController: "./lib/btnController",
    jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min",
  },
});

require(["main"]);
