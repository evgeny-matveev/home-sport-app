let timer = new easytimer.Timer();
let timerTemplate = document.getElementById('timer');

const TIME = 90;
let STEP = 100 / TIME / 100;
let progress = STEP;

let circle = new ProgressBar.Circle('#bar', {
    color: 'rgb(255 0 0)',
    trailColor: 'rgb(255 255 255)',
    strokeWidth: 50,
    duration: 1000,
    easing: 'linear',
});

timer.start({
    countdown: true,
    startValues: { seconds: TIME }
});

timerTemplate.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);

timer.addEventListener('secondsUpdated', e => {
    timerTemplate.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds']);
    circle.animate(progress);
    progress += STEP;
});

timer.addEventListener('targetAchieved', e => {
    // goNextPage()
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


// Обе функции ниже написаны, чтобы сэкономить место на экране

function get(item) {
    return localStorage.getItem(item);
}

function set(item, value) {
    localStorage.setItem(item, value);
}
