define(["jquery", "localStorageController", "tasksController", "btnController", "moment"], function ($, { setDataToLocalStorage, getDataTasks, subscribe }, { processDataAdd, generateListTasks, addSubtask }, btnController, moment) {
  $(() => {
    btnController();
    subscribe(generateListTasks);
    generateListTasks();
    $("#form-add-task").submit(function (e) {
      const dateInput = $(this).find('[name="dateTask"]').val().trim();
      if (moment(dateInput, "DD-MM-YYYY", true).isValid()) {
        e.preventDefault();
        const formData = $(this).serializeArray();
        const processedData = processDataAdd(formData);
        const dataTasks = getDataTasks();
        setDataToLocalStorage(dataTasks, processedData);
        $(this)[0].reset();
      } else {
        e.preventDefault();
        alert("Format tanggal harus DD-MM-YYYY (contoh: 30-12-2025).");
      }
    });
    $("[id^='form-subtask-']").submit(function (e) {
      e.preventDefault();
      const idTask = $(this).data("idTask");
      const formData = $(this).serializeArray();
      const dataSubtask = {};
      formData.forEach((data) => {
        dataSubtask[data.name] = data.value;
      });
      addSubtask(idTask, dataSubtask);
      $(this)[0].reset();
    });
  });
});
