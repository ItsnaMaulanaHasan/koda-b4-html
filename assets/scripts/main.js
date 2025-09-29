define(["jquery", "localStorageController", "tasksController", "btnController", "moment"], function ($, { setDataToLocalStorage, getDataTasks, subscribe }, { processDataAdd, generateListTasks }, btnController, moment) {
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
  });
});
