define(["jquery"], function ($) {
  const btnController = () => {
    $(() => {
      $("#btn-dropdown-profile").on("click", function () {
        $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });

      $("#hamburger-menu").on("click", function () {
        $("#nav-mobile").toggleClass("hidden");
      });

      $("#btn-add-task").on("click", function () {
        $("#form-add-container").toggleClass("hidden");
      });

      $("#btn-sorting-task").on("click", function () {
        $("#option-sort").toggleClass("hidden");
        $(this).toggleClass("text-[var(--primary)] border-[var(--primary)] border-[var(--icon-second-color)] text-[var(--text-secondary)]");
        $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });

      $(".btn-dropdown-task").on("click", function () {
        const idTask = $(this).data("idTask");
        $(`#subtask-${idTask}`).toggleClass("hidden");
        $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });

      $("#btn-completed-task").on("click", function () {
        $("#completed-task").toggleClass("hidden");
        $(this).children(".icon-dropdown").toggleClass("-rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });

      $(".item-task").hover(function () {
        const idTask = $(this).data("idTask");
        $(`#btn-action-${idTask}`)
          .toggleClass("hidden")
          .on("click", function (e) {
            e.stopPropagation();
            $(`#option-action-${idTask}`)
              .toggleClass("hidden")
              .on("mouseleave", function () {
                $(`#option-action-${idTask}`).addClass("hidden");
              });
          });
      });

      $(".checkbox-task").on("click", function () {
        const idTask = $(this).data("idTask");
        $(`#checkbox-${idTask}`).toggleClass("bg-[var(--primary)] bg-[url('./assets/img/check.png')] bg-no-repeat bg-center");
      });

      $(".checkbox-subtask").on("click", function () {
        const idSubtask = $(this).data("idSubtask");
        $(`#checkbox-${idSubtask}`).toggleClass("bg-[var(--primary)] bg-[url('./assets/img/check.png')] bg-no-repeat bg-center");
        $(this).children("span").toggleClass("line-through");
      });

      $(".btn-dropdown-completed-task").on("click", function () {
        $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });
    });
  };

  return btnController;
});
