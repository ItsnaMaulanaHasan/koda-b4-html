define(["jquery"], function ($) {
  $(() => {
    $("#btn-dropdown-profile").on("click", function () {
      $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
    });

    $("#hamburger-menu").on("click", function () {
      $("#nav-mobile").toggleClass("hidden");
    });

    $("#btn-add-item").on("click", function () {
      $("#form-add-item").toggleClass("hidden");
      $(this).children(".");
    });

    $("#btn-sorting-item").on("click", function () {
      $("#option-sort").toggleClass("hidden");
      $(this).toggleClass("text-[var(--primary)] border-[var(--primary)] border-[var(--icon-second-color)] text-[var(--text-secondary)]");
      $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
    });

    $(".btn-dropdown-item").on("click", function () {
      const idItem = $(this).data("idItem");
      $(`#subtask-${idItem}`).toggleClass("hidden");
      $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
    });

    $("#btn-completed-task").on("click", function () {
      $("#completed-task").toggleClass("hidden");
      $(this).children(".icon-dropdown").toggleClass("-rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
    });

    $(".item-task").hover(function () {
      const idItem = $(this).data("idItem");
      $(`#btn-action-${idItem}`)
        .toggleClass("hidden")
        .on("click", function (e) {
          e.stopPropagation();
          $(`#option-action-${idItem}`)
            .toggleClass("hidden")
            .on("mouseleave", function () {
              $(`#option-action-${idItem}`).addClass("hidden");
            });
        });
    });

    $(".checkbox-item").on("click", function () {
      const idItem = $(this).data("idItem");
      $(`#checkbox-${idItem}`).toggleClass("bg-[var(--primary)] bg-[url('./assets/img/check.png')] bg-no-repeat bg-center");
    });

    $(".checkbox-subtask").on("click", function () {
      const idSubtask = $(this).data("idSubtask");
      $(`#checkbox-${idSubtask}`).toggleClass("bg-[var(--primary)] bg-[url('./assets/img/check.png')] bg-no-repeat bg-center");
      $(this).children("span").toggleClass("line-through");
    });

    $(".btn-completed-task").on("click", function () {
      $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
    });
  });
});
