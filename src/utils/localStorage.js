// Persistencia en localStorage
function setLocalStorage(key, value) {
  var curTime = new Date().getTime();
  localStorage.setItem(key, JSON.stringify({ data: value, timer: curTime }));
}
// Control de caducidad del localStorage
function getLocalStorage(key) {
  var exp = 60 * 60 * 24; // un día en segundos
  var item = localStorage.getItem(key) || null;
  if (item) {
    var dataObj = JSON.parse(item);
    var isTimed = new Date().getTime() - dataObj.timer > exp;
    if (isTimed) {
      console.log("El almacenamiento ha expirado");
      clearLocalStorage(key);
      return null;
    } else {
      return dataObj.value;
    }
  } else {
    return null;
  }
}

// Vaciado de localStorage
function clearLocalStorage(key) {
  localStorage.removeItem(key);
}

module.exports = { setLocalStorage, getLocalStorage, clearLocalStorage };
