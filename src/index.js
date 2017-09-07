/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
    var div = document.createElement('DIV');

    div.textContent = text;

    return div; 
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
    var a = document.createElement('A');
    
    a.setAttribute('href', hrefValue);
    
    return a; 
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
    var firstElemWhere = where.firstChild;

    where.insertBefore(what, firstElemWhere);
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    var listElem = where.children,
        array = [];

    for (var i = 0; i < listElem.length - 1; i++) {
        var sibling = listElem[i].nextElementSibling;

        if (sibling.tagName == 'P') {
            array.push(listElem[i]);
        }
    }

    return array;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    var result = [];

    for (var i = 0; i < where.children.length; i++) {
        result.push(where.children[i].innerText);
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    var listNode = where.childNodes;

    for (var i = listNode.length - 1; i >= 0; i--) {
        var node = listNode[i];

        if (node.nodeType == Node.TEXT_NODE) {
            where.removeChild(node);
        }
    }
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    var listNode = where.childNodes;
    
    for (var i = 0; i < listNode.length; i++) {
        var node = listNode[i];

        if (node.nodeType == Node.ELEMENT_NODE) {
            deleteTextNodesRecursive(node);
        } else {
            where.removeChild(node);
            --i;
        }
    }
}

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
function collectDOMStat(root) {
    var obj = {
        tags: {},
        classes: {},
        texts: 0
    };

    function gothroughRoot(elem) {
        var listNode = elem.childNodes;
        
        for (let i = 0; i < listNode.length; i++) {
            let node = listNode[i];
            
            if (node.nodeType == Node.ELEMENT_NODE) {
                tagCollect(node);
                classCollect(node);
                gothroughRoot(node);
            } else {
                obj.texts += 1;
            }
        } 
    }

    function tagCollect(elem) {
        var tagName = elem.tagName;
        
        if (!obj.tags.hasOwnProperty(tagName)) {
            obj.tags[tagName] = 1;
        } else {
            obj.tags[tagName] += 1;
        }
    }

    function classCollect(elem) {  
        for (let i = 0; i < elem.classList.length; i++) {
            var className = elem.classList[i];

            if (!obj.classes.hasOwnProperty(className)) {
                obj.classes[className] = 1;
            } else {
                obj.classes[className] += 1;
            }
        }
    }

    gothroughRoot(root);

    return obj;
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объек с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {
    var config = { 
            childList: true,
            subtree: true
        },
        obj = {
            type: '',
            nodes: []
        };
      
    var observer = new MutationObserver(function(mutations) {
        var arrAppendEl = [],
            arrRemovedEl = [];

        mutations.forEach(function(MutationRecord) {
            if (MutationRecord.addedNodes) {
                for (let i = 0; i < MutationRecord.addedNodes.length; i++ ) {
                    arrAppendEl.push(MutationRecord.addedNodes[i]);
                }
            }
          
            if (MutationRecord.removedNodes) { 
                for (let i = 0; i < MutationRecord.removedNodes.length; i++ ) {
                    arrRemovedEl.push(MutationRecord.removedNodes[i]);
                }
            }
        });
        
        if (arrAppendEl.length > 0) {
            obj.nodes = arrAppendEl;
            obj.type = 'insert';
            fn(obj);
            arrAppendEl.length = 0;
        } 

        if (arrRemovedEl.length > 0) {
            obj.nodes = arrRemovedEl;
            obj.type = 'remove';
            fn(obj);     
            arrRemovedEl.length = 0;
        }
    });
        
    observer.observe(where, config);
}

export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
