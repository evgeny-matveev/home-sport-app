// Инициализируем библиотеку Изи Таймера
let timer = new easytimer.Timer();
// Находим и кладем в переменную ссылку на элемент,
// куда будем выводить счетчик времени
let timerTemplate = document.getElementById('timer');

// Задаем время отдыха в секундах 
const TIME = 90;
// Задаем шаг, на который должен увеличиваться прогресс
// за одну секунду
// Находим 1% от времени, затем делим весь прогресс на найденные доли
let STEP = 100 / TIME * 0.01;
// Задаем прогрессу один шаг, чтобы совпала анимация и таймер
let progress = STEP;

// Инициализируем библиотеку с анимацией круга
let circle = new ProgressBar.Circle('#bar', {
    color: 'rgb(255 0 0)',
    trailColor: 'rgb(255 255 255 0)',
    strokeWidth: 50,
    duration: 1000,
    easing: 'linear',
});

// Запускаем счетчик времени
timer.start({
    countdown: true,
    startValues: { seconds: TIME }
});

// Вставляем счетчик времени в HTML
timerTemplate.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);

// Добавляем обработчик событий таймера,
// чтобы на каждую пройденную секунду
// таймер обновлял в HTMLе кол-во времени,
// а круг анимировался 
timer.addEventListener('secondsUpdated', e => {
    timerTemplate.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
    circle.animate(progress);
    progress += STEP;
});

// Переводим человека на страницу упражнения,
// когда таймер закончится
timer.addEventListener('targetAchieved', e => {
    // Но сначала ждем одну секунду, 
    // чтобы закончилась анимация
    setTimeout(goNextPage, 1000)
});

function goNextPage() {
    // Кол-во упражнений
    const LAST_EXERCISE = 18;
    // Счетчики выполненых упражнений из сета
    const SET_EX_COUNT_1 = 0;
    const SET_EX_COUNT_2 = 1;
    // Кол-во упражнений в сете
    const SET_END = 6;

    // Количество выполненых упражнений
    let exCount = Number(_get('exCount'));
    // Номер упражнения из текущего сета
    let setExercise = Number(_get('setExercise'));
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
            _set('setCount', Number(_get('setCount')) + 1);
            // и сбрасываем счетчики упражнений в сетах
            _set('setExCount1', 1);
            _set('setExCount2', 1);
        } else {
            // Увеличиваем счетчик выполненых упражнений в сете
            // и меняем текущий сет на противоположный
            if (setExercise === SET_EX_COUNT_1) {
                _set('setExCount1', Number(_get('setExCount1')) + 1);
                _set('setExercise', SET_EX_COUNT_2);
            } else {
                _set('setExCount2', Number(_get('setExCount2')) + 1);
                _set('setExercise', SET_EX_COUNT_1);
            }
        }
        // Увеличиваем общий счетчик выполненых упражнений
        _set('exCount', exCount + 1);
        // устанавливаем адрес следующей страницы
        nextPage = 'exercise.html';
    }

    // переносим пользователя на следующую страницу
    window.location.href = baseUrl + `/${nextPage}`;
}


// Обе функции ниже написаны, чтобы сэкономить место на экране

function _get(item) {
    return localStorage.getItem(item);
}

function _set(item, value) {
    localStorage.setItem(item, value);
}
