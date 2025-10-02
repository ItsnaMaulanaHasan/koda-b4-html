define(["jquery", "localStorageController", "tasksController", "btnController", "moment"], function ($, { setDataToLocalStorage, getDataTasks, subscribe }, { processDataAdd, generateListTasks, addSubtask }, btnController, moment) {
  $(() => {
    btnController();
    subscribe(generateListTasks);
    generateListTasks();
    $("#form-add-task").submit(function (e) {
      e.preventDefault();
      const dateInput = $(this).find('[name="dateTask"]').val().trim();
      if (moment(dateInput, "DD-MM-YYYY", true).isValid()) {
        const formData = $(this).serializeArray();
        const processedData = processDataAdd(formData);
        const dataTasks = getDataTasks();
        setDataToLocalStorage(dataTasks, processedData);
        $(this)[0].reset();
        $("#form-add-container").addClass("hidden");
      } else {
        alert("Format tanggal harus DD-MM-YYYY (contoh: 30-12-2025).");
      }
    });
    $(document).on("submit", "[id^='form-subtask-']", function (e) {
      e.preventDefault();
      const idTask = $(this).data("idTask");
      const formData = $(this).serializeArray();
      const dataSubtask = {};
      formData.forEach((data) => {
        dataSubtask[data.name] = data.value;
      });
      addSubtask(idTask, dataSubtask);
      $(this)[0].reset();
      $(this).addClass("hidden");
    });
  });
});
