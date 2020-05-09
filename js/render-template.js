window.onload = () => {
    let template = document.getElementById('template').innerHTML;
    let html = ejs.compile(template)(data);
    document.getElementById('content').innerHTML = html;
}


