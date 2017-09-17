/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        // получаем данные от ресурса
        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        xhr.send();

        // после загрузки данных производим необходимые манипуляции
        xhr.addEventListener('load', function() {
            let listOfTown = xhr.response;
            
            listOfTown.sort(sortTowns);

            function sortTowns(a, b) {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                } 

                return 0;
            }

            if (xhr.status < 400) {
                resolve(listOfTown);                
            } else {
                reject();
            }
        })
    })
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    if (full.toUpperCase().indexOf(chunk.toUpperCase()) >= 0) {
        return true
    } 

    return false;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = loadTowns;

filterInput.addEventListener('keyup', function() {
    let val = filterInput.value;

    filterTowns();

    function filterTowns () {
        townsPromise()
            .then((listCitys) => {  // удачная загрузка
                loadingBlock.style.display = 'none';
                filterBlock.style.display = 'block';

                //  проверка на совпадение и вывод результатов поиска
                listCitys.forEach((city) => {
                    if (isMatching(city.name, val)) {
                        let nameCityElem = document.createElement('div');

                        nameCityElem.innerText = city.name;
                        filterResult.appendChild(nameCityElem);
                    }
                    if (val === '') {
                        filterResult.innerHTML = '';
                    }
                })
            })
            .catch(() => { // если ошибка 
                let button = document.createElement('button');

                //  наполняем содержимым блок для вывода об ошиьке
                button.innerText = 'повторить';
                loadingBlock.innerText = 'Не удалось загрузить города';
                loadingBlock.appendChild(button);

                // устанавливаем обработчик на кнопку для повтора загрузки
                button.addEventListener('click', () => {
                    loadingBlock.innerHTML = 'Загрузка...';

                    filterTowns();
                })
            })
    }

});

export {
    loadTowns,
    isMatching
};
