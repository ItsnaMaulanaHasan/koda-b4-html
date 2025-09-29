define(function () {
  const subscribers = [];
  function notify() {
    subscribers.forEach((cb) => cb());
  }

  const setDataToLocalStorage = (datas = [], newDatas = {}) => {
    datas.push(newDatas);
    window.localStorage.setItem("dataTasks", JSON.stringify(datas));
    notify();
  };

  const getDataTasks = () => {
    const dataTasks = window.localStorage.getItem("dataTasks");
    return dataTasks ? JSON.parse(dataTasks) : [];
  };

  function subscribe(callback) {
    subscribers.push(callback);
  }

  return { setDataToLocalStorage, getDataTasks, subscribe };
});
