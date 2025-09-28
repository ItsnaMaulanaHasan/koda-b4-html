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
                            <div class="flex items-center gap-[12px] cursor-pointer">
                                <i class="custom-icon icon-edit w-5 h-5"></i>
                                Rename Task
                            </div>
                            <div class="flex items-center gap-[12px] cursor-pointer"><i class="custom-icon icon-delete w-5 h-5"></i>Delete Task</div>
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
            </div>
    </div>
    `;
  };

  const generateListTasks = () => {
    const listTasks = getDataTasks();

    let htmlContent = ``;

    listTasks.forEach((task) => {
      htmlContent += tasksTemplate(task);
    });

    $("#container-list-tasks").html(htmlContent);
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

  return { processDataAdd, generateListTasks };
});
