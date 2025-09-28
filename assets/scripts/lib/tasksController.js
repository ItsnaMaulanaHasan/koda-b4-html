define(["jquery", "localStorageController"], function ($, { getDataTasks }) {
  const processDataAdd = (formData = []) => {
    const dataTasks = getDataTasks().length;
    const idTask = `task-${dataTasks + 1}`;
    const processedData = {};
    processedData["id-task"] = idTask;
    processedData["checked"] = false;
    processedData["subtasks"] = [];
    $.each(formData, function (index, data) {
      processedData[data.name] = data.value;
    });

    return processedData;
  };

  return { processDataAdd };
});
