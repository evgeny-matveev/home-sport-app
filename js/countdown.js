let timer = new easytimer.Timer();
let timerTemplate = document.getElementById('timer');
let finBtn = document.getElementById('fin');
let nextBtn = document.getElementById('next');

finBtn.onclick = () => {
    finBtn.style.display = 'none';

    timer.start({
        countdown: true,
        startValues: { seconds: 5 }
    });

    timerTemplate.innerHTML = timer.getTimeValues().toString();

    timer.addEventListener('secondsUpdated', e => {
        timerTemplate.innerHTML = timer.getTimeValues().toString();
    });

    timer.addEventListener('targetAchieved', e => {
        timerTemplate.style.display = 'none';
        nextBtn.style.display = 'block';
    });
}



