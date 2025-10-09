const subscribers = [];
function notify() {
  subscribers.forEach((cb) => cb());
}

export const setDataToLocalStorage = (datas = [], newDatas = {}) => {
  datas.push(newDatas);
  window.localStorage.setItem("dataTasks", JSON.stringify(datas));
  notify();
};

export const getDataTasks = () => {
  const dataTasks = window.localStorage.getItem("dataTasks");
  return dataTasks ? JSON.parse(dataTasks) : [];
};

export function subscribe(callback) {
  subscribers.push(callback);
}
