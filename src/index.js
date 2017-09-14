/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    var sec = seconds * 1000;
    var p = new Promise(function(resolv) {
        setTimeout(function() {
            resolv(); 
        }, sec);
    });
    
    return p;
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let prom = new Promise(function(resolve) {
        let xhr = new XMLHttpRequest();

        // получаем данные от ресурса
        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        xhr.send();

        // после загрузки данных производим необходимые манипуляции
        xhr.addEventListener('load', function() {
            let list = xhr.response;
            let cityArray = [];
            let sortCityArray = [];
            
            // создаем простой массив из названий городов 
            list.forEach(function(city) {
                cityArray.push(city.name);
            });

            // сортируем массив
            cityArray = cityArray.sort();

            // создаем новый отсортированный массив с объектами городами
            cityArray.forEach(function(city) {
                var obj = {
                    'name': city
                }

                sortCityArray.push(obj);
            });

            resolve(sortCityArray);
        })
    });

    return prom;
}

export {
    delayPromise,
    loadAndSortTowns
};
