define(["jquery", "localStorageController", "tasksController", "btnController"], function ($, { setDataToLocalStorage, getDataTasks }, { processDataAdd }, btnController) {
  btnController();
  $(() => {
    $("#form-add-task").submit(function (e) {
      e.preventDefault();
      const formData = $(this).serializeArray();
      const processedData = processDataAdd(formData);
      const dataTasks = getDataTasks();
      setDataToLocalStorage(dataTasks, processedData);

      $(this)[0].reset();
    });
  });
});
