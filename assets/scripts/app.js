requirejs.config({
  baseUrl: "assets/scripts",
  paths: {
    jquery: "//cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min",
  },
});

require(["main"]);
