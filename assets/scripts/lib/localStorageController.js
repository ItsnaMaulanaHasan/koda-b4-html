define(function () {
  const setDataToLocalStorage = (datas = [], newDatas = {}) => {
    datas.push(newDatas);
    window.localStorage.setItem("dataTasks", JSON.stringify(datas));
  };

  const getDataTasks = () => {
    const dataTasks = window.localStorage.getItem("dataTasks");
    return dataTasks ? JSON.parse(dataTasks) : [];
  };

  return { setDataToLocalStorage, getDataTasks };
});
