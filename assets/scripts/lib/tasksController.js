define(["jquery", "localStorageController"], function ($, { getDataTasks }) {
  const tasksTemplate = (dataTasks) => {
    const { idTask, nameTask, descriptionTask, dateTask } = dataTasks;
    return `
    <div class="item-task flex flex-col gap-[16px]" data-id-task="${idTask}">
        <div class="flex justify-between">
            <div class="checkbox-task flex gap-[14px] cursor-pointer" data-id-task="${idTask}">
                <div id="checkbox-${idTask}" class="w-[28px] h-[28px] rounded-[100px] border border-[var(--icon-second-color)]"></div>
                <div>
                    <div class="flex items-center text-[var(--text-color)] relative">
                        <div class="font-[500] text-[1.125rem] mr-[1rem]">${nameTask}</div>
                        <span class="font-[500] text-[0.75rem] text-[var(--primary)] px-[0.75rem] py-[0.5rem] bg-[var(--secondary)] rounded-[50px]">${dateTask}</span>
                        <button id="btn-action-${idTask}" class="hidden">
                            <i class="custom-icon icon-kebab w-5 h-5 flex items-center cursor-pointer"></i>
                        </button>
                        <div id="option-action-${idTask}" class="hidden absolute min-w-[170px] right-[-50px] md:right-[-165px] top-[40px] flex flex-col bg-white gap-[12px] z-2 p-[1.5rem] rounded-[8px] border border-[var(--icon-second-color)]">
                            <button class="btn-rename flex items-center gap-[12px] cursor-pointer" data-id-task="${idTask}"">
                                <i class="custom-icon icon-edit w-5 h-5"></i>
                                Rename Task
                            </button>
                            <button class="btn-delete flex items-center gap-[12px] cursor-pointer" data-id-task="${idTask}"><i class="custom-icon icon-delete w-5 h-5"></i>Delete Task</button>
                        </div>
                    </div>
                    <div class="font-[400] text-[0.875rem] text-[var(--text-secondary)]">${descriptionTask}</div>
                </div>
            </div>
            <button class="btn-dropdown-task flex items-start" data-id-task="${idTask}">
                <i class="custom-icon icon-dropdown w-7 h-7 bg-[var(--primary)] transition duration-300 cursor-pointer"></i>
            </button>
        </div>
        <div id="subtask-${idTask}" class="hidden flex flex-col gap-[16px] p-[1rem] bg-[var(--bg-color)] rounded-[8px]">
          <!-- header subtask -->
          <div class="flex justify-between items-center">
            <span class="font-[500] text-[1rem] text-[var(--text-color)]">Subtask</span>
            <button data-id-task="${idTask}" class="btn-add-subtask px-[0.625rem] py-[0.375rem] flex items-center gap-[6px] border border-[var(--icon-second-color)] rounded-[50px] text-[var(--primary)] bg-white cursor-pointer text-[0.75rem] font-[600]">
              <i class="custom-icon2 icon-add-filled"></i>
              Tambah
            </button>
          </div>
          <!-- input subtask -->
          <form id="form-subtask-${idTask}" class="hidden" data-id-task="${idTask}" action="" method="get">
            <div>
              <input class="border p-2 w-full rounded-lg" type="text" placeholder="Masukkan nama subtask" required maxlength="20" name="nameSubtask" />
            </div>
            <button type="submit" class="hidden"></button>
          </form>
          <!-- list subtask -->
          <div id="subtask-${idTask}-container" class="flex flex-col gap-[10px]">
          
          </div>
        </div>
    </div>
    `;
  };

  const taskCompletedTemplate = (dataTasks) => {
    const { idTask, nameTask } = dataTasks;
    return `
    <div class="item-task-completed flex justify-between items-center" data-id-task="${idTask}">
        <div id="checkbox-completed" data-id-task="${idTask}" class="flex gap-[14px] items-center cursor-pointer">
            <div  
                class="w-[28px] h-[28px] rounded-[100px] border border-[var(--icon-second-color)] bg-[var(--primary)] bg-[url('./assets/img/check.png')] bg-no-repeat bg-center">
            </div>
            <span class="font-[500] text-[1.125rem] line-through">${nameTask}</span>
        </div>
        <button class="btn-dropdown-completed-task" data-id-task="${idTask}">
            <i class="custom-icon icon-dropdown w-7 h-7 bg-[var(--primary)] transition duration-300 cursor-pointer"></i>
        </button>
    </div>
    `;
  };

  const subtaskTemplate = (dataSubtask) => {
    const { idTask, idSubtask, nameSubtask } = dataSubtask;
    return `
      <!-- item subtask -->
      <div class="flex justify-between items-center">
        <div class="checkbox-subtask flex gap-[14px] items-center cursor-pointer" data-id-subtask="${idTask}-${idSubtask}">
          <div id="checkbox-${idTask}-${idSubtask}" class="w-[28px] h-[28px] rounded-[100px] border border-[var(--icon-second-color)]"></div>
          <span class="font-[400] text-[1rem] text-[var(--text-color)]">${nameSubtask}</span>
        </div>
        <button class="btn-delete-subtask" data-id-task="${idTask}" data-id-subtask="${idSubtask}"> 
          <i class="custom-icon icon-trash w-5 h-5 cursor-pointer"></i>
        </button>
      </div>
    `;
  };

  const generateListTasks = (sortType = "by-date") => {
    const listTasks = getDataTasks();

    if (sortType === "by-date") {
      listTasks.sort((a, b) => {
        const dateA = a.dateTask.split("-").reverse().join("-");
        const dateB = b.dateTask.split("-").reverse().join("-");
        return new Date(dateA) - new Date(dateB);
      });
    } else if (sortType === "newest") {
      listTasks.reverse();
    }

    let taskHtmlContent = ``;
    let completedTaskHtmlContent = ``;
    const taskFilter = listTasks.filter((task) => task.checked === false);
    const completedTask = listTasks.filter((task) => task.checked === true);

    if (taskFilter.length === 0) {
      taskHtmlContent = `<div class="flex justify-center items-center min-h-[200px] font-bold text-lg text-[var(--text-secondary)]">Belum ada Task</div>`;
    } else {
      taskFilter.forEach((task) => {
        taskHtmlContent += tasksTemplate(task);
      });
    }

    if (completedTask.length === 0) {
      $("#count-completed").text("0");
      completedTaskHtmlContent = `<div class="flex justify-center items-center min-h-[50px] font-bold text-lg text-[var(--text-secondary)]">Belum ada Task</div>`;
    } else {
      completedTask.forEach((task) => {
        $("#count-completed").text(completedTask.length);
        completedTaskHtmlContent += taskCompletedTemplate(task);
      });
    }

    $("#container-list-tasks").html(taskHtmlContent);
    $("#completed-task").html(completedTaskHtmlContent);
    taskFilter.forEach((task) => {
      generateListSubtask(task.idTask);
    });
  };

  const generateListSubtask = (idTask) => {
    const listTasks = getDataTasks();
    const [filterTask] = listTasks.filter((task) => task.idTask === idTask);

    if (filterTask.length === 0) return;

    const listSubtask = filterTask.subtasks;
    let subtaskHtmlContent = ``;

    if (listSubtask.length === 0) {
      subtaskHtmlContent = ``;
    } else {
      listSubtask.forEach((subtask) => {
        subtaskHtmlContent += subtaskTemplate(subtask);
      });
    }

    $(`#subtask-${idTask}-container`).html(subtaskHtmlContent);
  };

  const processDataAdd = (formData = []) => {
    const dataTasks = getDataTasks().length;
    const idTask = `task${dataTasks + 1}`;
    const processedData = {};
    processedData["idTask"] = idTask;
    processedData["checked"] = false;
    processedData["subtasks"] = [];

    formData.forEach((data) => {
      processedData[data.name] = data.value;
    });

    return processedData;
  };

  const checkedTask = (idTask) => {
    const dataTasks = getDataTasks();
    dataTasks.forEach((data) => {
      if (data.idTask === idTask) {
        data.checked = !data.checked;
      }
    });
    window.localStorage.setItem("dataTasks", JSON.stringify(dataTasks));
    generateListTasks();
  };

  const deleteTask = (idTask) => {
    const dataTasks = getDataTasks();
    const dataDelete = dataTasks.findIndex((data) => data.idTask === idTask);
    dataTasks.splice(dataDelete, 1);
    window.localStorage.setItem("dataTasks", JSON.stringify(dataTasks));
    generateListTasks();
  };

  const addSubtask = (idTask, dataForm) => {
    const dataTasks = getDataTasks();
    const indexAddSubtask = dataTasks.findIndex((data) => data.idTask === idTask);
    const noSubTask = dataTasks[indexAddSubtask].subtasks.length;
    const idSubtask = `subtask${noSubTask + 1}`;
    let newDataSubtask = {};
    newDataSubtask["idSubtask"] = idSubtask;
    newDataSubtask["idTask"] = idTask;
    newDataSubtask = { ...newDataSubtask, ...dataForm };
    console.log(newDataSubtask);
    dataTasks[indexAddSubtask].subtasks.push(newDataSubtask);
    window.localStorage.setItem("dataTasks", JSON.stringify(dataTasks));
    generateListSubtask(idTask);
  };

  const deleteSubtask = (idTask, idSubtask) => {
    const dataTasks = getDataTasks();
    const taskIndex = dataTasks.findIndex((data) => data.idTask === idTask);
    const subtaskIndex = dataTasks[taskIndex].subtasks.findIndex((sub) => sub.idSubtask === idSubtask);
    dataTasks[taskIndex].subtasks.splice(subtaskIndex, 1);
    window.localStorage.setItem("dataTasks", JSON.stringify(dataTasks));
    generateListSubtask(idTask);
  };

  const renameTask = (idTask, newName) => {
    const dataTasks = getDataTasks();
    const taskIndex = dataTasks.findIndex((data) => data.idTask === idTask);
    dataTasks[taskIndex].nameTask = newName;
    window.localStorage.setItem("dataTasks", JSON.stringify(dataTasks));
    generateListTasks();
  };

  return { processDataAdd, generateListTasks, checkedTask, deleteTask, addSubtask, deleteSubtask, renameTask };
});
