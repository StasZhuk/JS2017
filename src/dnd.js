/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('DIV');
    let divWidth = Math.random() * 100 + 'px';
    let divHeight = Math.random() * 100 + 'px';
    let divPosX = Math.random() * 90 + 'vw';
    let divPosY = Math.random() * 90 + 'vh';

    div.classList.add('draggable-div');

    // задаем случайные размеры
    div.style.width = divWidth;
    div.style.height = divHeight;

    // задаем случайный цвет фона
    div.style.backgroundColor = getRandomColor();

    // задаем случайное позиционирование
    div.style.position = 'absolute';
    div.style.top = divPosX;
    div.style.left = divPosY;

      // функция создания случайного цвета
    function getRandomColor() {
        var r = Math.floor(Math.random() * 256).toString(16);
        var g = Math.floor(Math.random() * 256).toString(16);
        var b = Math.floor(Math.random() * 256).toString(16);
        var color = '#' + r + g + b;
        
        return color;
    }

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.setAttribute('draggable', 'true');
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
