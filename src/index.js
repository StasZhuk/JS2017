/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
    return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b) {
    b == undefined ? b = 100 : b;  

    return a + b;
}
/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
    var arr = [],
        argLength = arguments.length;

    for (var i = 0; i < argLength; i++) {
        arr[i] = arguments[i];
    }

    return arr;
}
/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
    var res = fn();

    return res;
}
/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number) {
    number === undefined ? number = 0 : number;

    function F() {
        return ++number;
    }

    return F;
}
/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn) {
    var arr = [],
        argLength = arguments.length;

    for (var i = 1; i < argLength; i++) {
        arr[i - 1] = arguments[i];
    }

    var F = fn.bind(null, ...arr);

    return F;
}

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}