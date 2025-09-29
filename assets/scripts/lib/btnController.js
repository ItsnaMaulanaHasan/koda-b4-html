define(["jquery", "tasksController"], function ($, { deleteTask, checkedTask }) {
  const btnController = () => {
    $(() => {
      // dropdown profile
      $("#btn-dropdown-profile").on("click", function () {
        $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });

      // hamburger menu
      $("#hamburger-menu").on("click", function () {
        $("#nav-mobile").toggleClass("hidden");
      });

      // add task
      $("#btn-add-task").on("click", function () {
        $("#form-add-container").toggleClass("hidden");
      });

      // sorting task
      $("#btn-sorting-task").on("click", function () {
        $("#option-sort").toggleClass("hidden");
        $(this).toggleClass("text-[var(--primary)] border-[var(--primary)] border-[var(--icon-second-color)] text-[var(--text-secondary)]");
        $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });

      // dropdown task
      $(document).on("click", ".btn-dropdown-task", function () {
        const idTask = $(this).data("idTask");
        $(`#subtask-${idTask}`).toggleClass("hidden");
        $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
        $(`#btn-action-${idTask}`).toggleClass("hidden");
      });

      // btn action task
      $(document).on("click", "[id^='btn-action-']", function (e) {
        e.stopPropagation();
        const idTask = $(this).closest(".item-task").data("idTask");
        $(`#option-action-${idTask}`).toggleClass("hidden");
      });

      // btn action task close
      $(document).on("mouseleave", "[id^='option-action-']", function () {
        $(this).addClass("hidden");
        const idTask = $(this).closest(".item-task").data("idTask");
        $(`#btn-action-${idTask}`).addClass("hidden");
      });

      // delete task
      $(document).on("click", ".btn-delete", function () {
        const idTask = $(this).data("idTask");
        deleteTask(idTask);
      });

      // checked task
      $(document).on("click", ".checkbox-task", function () {
        const idTask = $(this).data("idTask");
        $(`#checkbox-${idTask}`).toggleClass("bg-[var(--primary)] bg-[url('./assets/img/check.png')] bg-no-repeat bg-center");
        checkedTask(idTask);
      });

      // completed task
      $("#btn-completed-task").on("click", function () {
        $("#completed-task").toggleClass("hidden");
        $(this).children(".icon-dropdown").toggleClass("-rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });

      // checked completed task
      $(document).on("click", ".checkbox-subtask", function () {
        const idSubtask = $(this).data("idSubtask");
        $(`#checkbox-${idSubtask}`).toggleClass("bg-[var(--primary)] bg-[url('./assets/img/check.png')] bg-no-repeat bg-center");
        $(this).children("span").toggleClass("line-through");
      });

      $(document).on("click", "#checkbox-completed", function () {
        const idTask = $(this).data("idTask");
        $(this).children("div").toggleClass("bg-[var(--primary)] bg-[url('./assets/img/check.png')] bg-no-repeat bg-center");
        checkedTask(idTask);
      });

      // dropdown completed task
      $(".btn-dropdown-completed-task").on("click", function () {
        $(this).children(".icon-dropdown").toggleClass("rotate-180 bg-[var(--primary)] bg-[var(--icon-second-color)]");
      });
    });
  };

  return btnController;
});
