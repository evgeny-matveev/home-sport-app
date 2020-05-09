window.addEventListener('load', function() {
    document.getElementById('next').onclick = function(event) {
        event.preventDefault();
        
        const EXERCISES = 18;
        const SET_END = 6;

        let nextPage;
        let url = window.location.href.split('/');
        let currentPage = url.slice(-1)[0];
        let baseUrl = url.slice(0, -1).join('/');
        let exercise = Number(get('exercise'));
        let exerciseType = get('exerciseType');
        
        if (currentPage !== 'rest.html') {
            window.location.href = baseUrl + '/rest.html';
        }
        
        if (exercise === EXERCISES) {
            nextPage = 'core.html';
        } else {
            if (exercise % SET_END === 0) {
                set('set', Number(get('set')) + 1);
                set('aNum', 1);
                set('bNum', 1);
            }
            if (exerciseType === 'a') {
                set('exerciseType', 'b');
                set('aNum', Number(get('aNum')) + 1); 
            } else {
                set('exerciseType', 'a');
                set('bNum', Number(get('bNum')) + 1);
            }
            nextPage = get('set') + get('exerciseType') + '.html';
            set('exercise', exercise + 1);
        }

        window.location.href = baseUrl + `/${nextPage}`;
    }
});

function get(item) {
    return localStorage.getItem(item);
}

function set(item, value) {
    localStorage.setItem(item, value);
}