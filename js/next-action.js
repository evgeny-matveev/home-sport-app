// Ждем, пока сайт полностью загрузится
window.addEventListener('load', function() {
    // Добавляем функцию, которая срабатывает при событии onclick (при клике)
    document.getElementById('next').onclick = function(event) {
        // Отключаем дефолтное поведение ссылки,
        // чтобы браузер не поменял страницу
        event.preventDefault();
        
        // Кол-во упражнений
        const LAST_EXERCISE = 18;
        // Счетчики выполненых упражнений из сета
        const SET_EX_COUNT_1 = 0;
        const SET_EX_COUNT_2 = 1;
        // Кол-во упражнений в сете
        const SET_END = 6;

        // Количество выполненых упражнений
        let exCount = Number(get('exCount'));
        // Номер упражнения из текущего сета
        let setExercise = Number(get('setExercise'));
        // Полный адрес сайта, разбитый на части по знаку /
        let url = window.location.href.split('/');
        // Адрес сайта, от которого отрезали последний кусочек
        let baseUrl = url.slice(0, -1).join('/');
        // Объявляем переменную, чтобы воспользоваться ей позже 
        let nextPage;
        
        // Если выполнили все упражнения, то
        if (exCount === LAST_EXERCISE) {
            // следующая страница — заминка
            nextPage = 'core.html';
        } else {
            // Если выполнили все упражнения в сете
            if (exCount % SET_END === 0) {
                // то увеличиваем кол-во выполненых сетов
                set('setCount', Number(get('setCount')) + 1);
                // и сбрасываем счетчики упражнений в сетах
                set('setExCount1', 1);
                set('setExCount2', 1);
            } else {
                // Увеличиваем счетчик выполненых упражнений в сете
                // и меняем текущий сет на противоположный
                if (setExercise === SET_EX_COUNT_1) {
                    set('setExCount1', Number(get('setExCount1')) + 1); 
                    set('setExercise', SET_EX_COUNT_2);
                } else {
                    set('setExCount2', Number(get('setExCount2')) + 1);
                    set('setExercise', SET_EX_COUNT_1);
                }
            }
            // Увеличиваем общий счетчик выполненых упражнений
            set('exCount', exCount + 1);
            // устанавливаем адрес следующей страницы
            nextPage = 'exercise.html';
        }

        // переносим пользователя на следующую страницу
        window.location.href = baseUrl + `/${nextPage}`;
    }
});

// Обе функции ниже написаны, чтобы сэкономить место на экране

function get(item) {
    return localStorage.getItem(item);
}

function set(item, value) {
    localStorage.setItem(item, value);
}