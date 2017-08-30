/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    const ERROR1 = 'empty array';
    const ERROR2 = 'fn is not a function';
    var arrLength = array.length;
    var flag = 0;

    try {
        if (!Array.isArray(array) || arrLength === 0) {     
            throw new Error(ERROR1);
        } else if (typeof(fn) !== 'function') {
            throw new Error(ERROR2);
        }

        for (let i = 0; i < arrLength; i++) {
            var arrItem = array[i];

            if (!fn(arrItem)) {
                --flag;
            }
        }
    
        if (flag == 0) {
            return true;
        }
        
        return false;
    } catch (e) {
        if (e.message === ERROR1) {
            throw ERROR1;
        } else if (e.message === ERROR2) {
            throw ERROR2;
        }
    }
}
/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    const ERROR1 = 'empty array';
    const ERROR2 = 'fn is not a function';
    var arrLength = array.length;

    try {
        if (!Array.isArray(array) || arrLength === 0) {     
            throw new Error(ERROR1);
        } else if (typeof(fn) !== 'function') {
            throw new Error(ERROR2);
        }

        for (let i = 0; i < arrLength; i++) {
            var arrItem = array[i];

            if (fn(arrItem)) {
                return true;
            }
        }

        return false;

    } catch (e) {
        if (e.message === ERROR1) {
            throw ERROR1;
        } else if (e.message === ERROR2) {
            throw ERROR2;
        }
    }
}
/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    const ERROR = 'fn is not a function';
    var argLength = arguments.length;
    var newArr = [];

    try {
        if (typeof(fn) !== 'function') {
            throw new Error(ERROR);
        }
    } catch (e) {
        throw ERROR;
    }

    for (let i = 1; i < argLength; i++) {
        var argument = arguments[i];

        try {
            fn(argument);
        } catch (e) {
            newArr.push(argument);
        }
    }

    return newArr;
}
/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number) {
    const ERROR1 = 'number is not a number';
    const ERROR2 = 'division by 0';
    var obj = {};

    number === undefined ? number = 0 : number;

    try {
        if (typeof number !== 'number') {
            throw new Error(ERROR1);
        }

        obj.sum = function() {
            for (let i = 0; i < arguments.length; i++) {
                number += arguments[i];
            }

            return number;
        }
        obj.dif = function() {
            for (let i = 0; i < arguments.length; i++) {
                number -= arguments[i];
            }

            return number;
        }
        obj.div = function() {
            for (let i = 0; i < arguments.length; i++) {
                if (number === 0 || arguments[i] == 0) {
                    throw new Error(ERROR2);
                }
                number /= arguments[i];
            }

            return number;
        }
        obj.mul = function() {
            for (let i = 0; i < arguments.length; i++) {
                number *= arguments[i];
            }

            return number;
        } 

    } catch (e) {
        if (e.message == ERROR1) {
            throw ERROR1;
        } else {
            throw ERROR2;
        }
    }   

    return obj;
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
