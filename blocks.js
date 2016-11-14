(function () {
    function init (blocksRendered, blockSize) {
        var blocksRendered = blocksRendered || 10;
        var blockSize = blockSize || 75;

        var controlButtons = document.querySelectorAll('#controls button');
        var playground = document.getElementById('playground');

        var blocks = [];
        var playgroundWidth = playground.offsetWidth;
        var playgroundHeight = playground.offsetHeight;

        var fragment = document.createDocumentFragment();
        for (let i = 0; i < blocksRendered; i++) {
            let block = document.createElement('div');
            block.classList.add('block');
            block.style.width = blockSize + 'px';
            block.style.height = blockSize + 'px';
            block.style.left = Math.max(0, Math.floor(Math.random() * (playgroundWidth - blockSize))) + 'px';
            block.style.top = Math.max(0, Math.floor(Math.random() * (playgroundHeight - blockSize))) + 'px';
            fragment.appendChild(block);
        }
        playground.appendChild(fragment);

        controlButtons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                setActiveButton(event.target);
                executeAction(event.target.dataset.action);
            });
        });
    }

    function executeAction (action) {
        switch (action) {
        case 'ex1': return console.log(1);
        case 'ex2': return console.log(2);
        case 'ex3': return console.log(3);
        }
    }

    function setActiveButton (target) {
        document.querySelectorAll('#controls .button.active').forEach(function (activeButton) {
            activeButton.classList.remove('active');
        });
        target.classList.add('active');
    }

    init();
})();
