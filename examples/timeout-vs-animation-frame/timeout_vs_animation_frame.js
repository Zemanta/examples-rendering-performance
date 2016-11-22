function init () {
    var controlButtons = document.querySelectorAll('#controls button');

    controlButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            setActiveButton(event.target);
            executeAction(event.target.dataset.action);
        });
    });
}

function executeAction (action, ...params) {
    switch (action) {
    case 'restartSt': return restartSt();
    case 'restartAf': return restartAf();
    }
}

var st = {
    el: document.getElementById('st'),
    len: 0,
    timeLabel: document.getElementById('timeSt'),
};
var af = {
    el: document.getElementById('af'),
    len: 0,
    timeLabel: document.getElementById('timeAf')
};

function work (workLength) {
    var start = (new Date()).getTime();
    while((new Date()).getTime() - start < workLength){}
}

function render (obj, workLength, startTime){
    if (obj.len > 300){
        obj.timeLabel.innerHTML = `${((new Date()).getTime() - startTime)}ms`;
        return false;
    }
    work(workLength);
    obj.el.style.width = `${obj.len}px`;
    obj.len += 4;
    return true;
}

function restartSt () {
    if (st.len > 0 && st.len < 300) return;
    var workLength = parseInt(document.getElementById('workLength').value) || 0;
    var startTime = (new Date()).getTime();
    st.len = 0;
    st.timeLabel.innerHTML = '';
    stLoop(st, workLength, startTime);
}

function restartAf () {
    if (af.len > 0 && af.len < 300) return;
    var workLength = parseInt(document.getElementById('workLength').value) || 0;
    var startTime = (new Date()).getTime();
    af.len = 0;
    af.timeLabel.innerHTML = '';
    afLoop(af, workLength, startTime);
}

function stLoop (st, workLength, startTime) {
    if (!render(st, workLength, startTime)) {
        restartAf();
        return false;
    }
    setTimeout(() => {
        stLoop(st, workLength, startTime)
    }, 16.667);
}

function afLoop (af, workLength, startTime) {
    if (!render(af, workLength, startTime)) {
        return false;
    }
    requestAnimationFrame(() => {
        afLoop(af, workLength, startTime)
    });
}

function setActiveButton (target) {
    document.querySelectorAll('#controls .button.active').forEach((activeButton) => {
        activeButton.classList.remove('active');
    });
    target.classList.add('active');
}

init();
