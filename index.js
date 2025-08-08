//Функция определения, что введено число!
//Возвращает либо число, либо "", либо undefined, либо null
function isNumber(value) {
  if (value === null) {
    console.log("Ввод отменен пользователем.");
    return null;
  }

  if (value === "") {
    return value;
  }

  if (value.trim() === "") {
    console.log("Вы ввели только пробелы");
    return undefined;
  }

  if (Number.isNaN(+value)) {
    console.log("Вы ввели не число");
    return undefined;
  }
  return value;
}

//Функция обработки ввода и обновления списка
function handleInputAndRender(promptMessage, callback) {
  let value = isNumber(prompt(promptMessage));

  if (value === null) {
    return;
  }

  if (value === "") {
    alert("Вы ничего не ввели");
    renderList(HeightsArr);
    return;
  }

  if (value === undefined) {
    alert("Введите только числа");
    return;
  }

  // Вызываем переданную функцию с введенным значением
  callback(value);
}

//Фильтрация
function filter(arr, param) {
  let filterArr = [];
  for (let item of arr) {
    if (item >= param) {
      filterArr.push(item);
    }
  }
  return filterArr;
}

//Сортировка
function sort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr
}

//Отрисовка списка
function renderList(arr) {
  heightsList.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let itemEl = document.createElement('li');
    itemEl.classList.add('heights-students__item');
    itemEl.textContent = arr[i];

    heightsList.append(itemEl);
  }
  return heightsList;
}

//Исходный массив
let HeightsArr = [164, 157, 160, 143, 170];

//DOM-список
const heightsList = document.querySelector('.heights-students__list');

//DOM-кнопки
const btnAddHeight = document.getElementById('addHeight');
const btnFilterHeight = document.getElementById('filterHeight');

//Клик по кнопке добавить рост
btnAddHeight.onclick = function () {
  handleInputAndRender("Добавьте рост", (newHeight) => {
    HeightsArr.push(newHeight);
    renderList(HeightsArr);
  });
}

//Клик по кнопке отфильтровать
btnFilterHeight.onclick = function () {
  handleInputAndRender("Введите рост для фильтрации", (minHeight) => {
    renderList(filter(HeightsArr, minHeight));
  });
}

//Запуск отрисовки списка
renderList(HeightsArr);
