/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    let filterInputValue = filterNameInput.value;
    let cookieInBrowserObj = getCookies(); 

    listTable.innerHTML = '';

    // если фильтр пустой, отображаем все куки
    if (filterInputValue === '') {
        for (let cookie in cookieInBrowserObj) {
            createTableCookie(cookie, cookieInBrowserObj[cookie]);
        }   
    } else {
    // если фильтр есть, то сравниваем с куками браузера
        for (let cookie in cookieInBrowserObj) { 
            // если нет совпадений, удаяем из табицы
            if (cookie.indexOf(filterInputValue) < 0 && cookieInBrowserObj[cookie].indexOf(filterInputValue) < 0) {
                deleteTableCookie(cookie);
            }
            // если есть совпадения, добавляем в таблицу
            if (cookie.indexOf(filterInputValue) >= 0 || cookieInBrowserObj[cookie].indexOf(filterInputValue) >= 0) {
                createTableCookie(cookie, cookieInBrowserObj[cookie]);
            }
        }
    }
});

// обработчик кнопки добавления куки
addButton.addEventListener('click', () => {
    let cookieName = addNameInput.value;
    let cookieValue = addValueInput.value;
    let filterInputValue = filterNameInput.value;
    let cookieInBrowserObj = getCookies();    

    // если хотябы одно поле пустое не добавяем куку
    if (cookieName === '' || cookieValue === '') {
        return false
    }

    // елси кука с таким именем и значением уже есть
    if (cookieInBrowserObj.hasOwnProperty(cookieName) && cookieInBrowserObj[cookieName] === cookieValue) {
        return false
    }

    // елси кука с таким же именем, но с другим значением
    if (cookieInBrowserObj.hasOwnProperty(cookieName) && cookieInBrowserObj[cookieName] !== cookieValue) {
        deleteBrowserCookie(cookieName, cookieInBrowserObj[cookieName]);
        deleteTableCookie(cookieName);
    }

    // добовляем куку в браузер
    createBrowserCookie(cookieName, cookieValue);

    // добавляем куку в таблицу, если проходит по фильтру
    if (cookieName.indexOf(filterInputValue) >= 0 || cookieValue.indexOf(filterInputValue) >= 0) {
        createTableCookie(cookieName, cookieValue);        
    }
});

// обработчик кнопки удаления куки
listTable.addEventListener('click', (e) => {
    let target = e.target;

    if (target.tagName === 'BUTTON') {
        let cookieName = target.parentElement.parentElement.firstElementChild.innerText;

        // удаляем куку в таблицу
        target.parentElement.parentElement.outerHTML = null;
        // удаляем куку в браузере
        deleteBrowserCookie(cookieName);
    }
});

// функция создания куки в таблице
function createTableCookie(name, value) {
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdValue = document.createElement('td');
    let tdDelete = document.createElement('td');
    let buttonDel = document.createElement('button');

    tr.setAttribute('name', name);
    tr.setAttribute('value', value);
    tdName.innerHTML = name;
    tdValue.innerHTML = value;
    buttonDel.innerHTML = 'удалить';
    
    tdDelete.appendChild(buttonDel);

    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdDelete);

    listTable.appendChild(tr);
}

// функция создания куки в браузере
function createBrowserCookie(name, value) {
    document.cookie = `${name}=${value}`;        
}

// функция удаления куки из браузера
function deleteBrowserCookie(name) {
    let date = new Date(0);

    document.cookie = `${name}=''; expires=${date}`; 
}
// функция удаления куки из таблицы
function deleteTableCookie(name) {
    let cookieInTable = document.getElementsByName(name)[0];
    
    if (cookieInTable === undefined) {
        return false;
    }
    cookieInTable.remove();
}

// функция создает объект из кук которые есть в браузере
function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}
