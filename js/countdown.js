setTimeout(() => {
    let timer = new easytimer.Timer();
    let timerTemplate = document.getElementById('timer');
    let nextBtn = document.getElementById('next');

    nextBtn.onclick = () => {
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
}, 100);




