/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArray = [];

    for (var i = 0; i < array.length; i++) {
        newArray[i] = fn(array[i], i, array);
    }

    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var arrayLength = array.length,
        currentElem,
        i = 0;

    if (initial === undefined) {
        initial = array[0];
        i++;
    }

    for (; i < arrayLength; i++) {
        currentElem = array[i];
        initial = fn(initial, currentElem, i, array);
    }

    return initial;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    if ( obj.hasOwnProperty(prop)) {
        return true;
    }

    return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var array = Object.keys(obj);
    
    return array;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var array = [];

    for (var prop in obj) {
        array.push(prop.toUpperCase());
    }

    return array;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    var newArray = [];
  
    to === undefined || to > array.length ? to = array.length : to;

    if (from < 0) {
        if (to < 0) {
            -to > array.length ? to = -array.length : to
            for (let i = array.length - 1 + from; i > array.length - 1 + to; i--) {
                newArray.push(array[i]);
            }
        } else {
            for (let i = array.length - 1 + from; i > array.length - 1 - to; i--) {
                newArray.push(array[i]);
            }
        }       
    } else {
        for (let i = from; i < to; i++) {
            newArray.push(array[i]);
        }
    }

    return newArray;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            return target[prop] = value * value;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
