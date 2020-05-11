// После полной загрузки сайта
window.onload = () => {
    // Находим шаблон — элемент template
    // и забираем из него содержимое — данных внутри тега
    let template = document.getElementById('template').innerHTML;
    // При помощи библиотеки ejs заполняем шаблон данными
    let html = ejs.compile(template)(data);
    // и выводим его внутрь элемента content
    document.getElementById('content').innerHTML = html;
}


