(function () {
    var running;
    var playground;

    function init () {
        var controlButtons = document.querySelectorAll('#controls button');
        var controlCheckboxes = document.querySelectorAll('#controls [type=checkbox]');
        playground = document.getElementById('playground');

        controlButtons.forEach((button) => {
            button.addEventListener('click', function (event) {
                setActiveButton(event.target);
                executeAction(event.target.dataset.action);
            });
        });

        controlCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', function (event) {
                executeAction(event.target.dataset.action, event.target.checked);
            });
        });
    }

    function executeAction (action, ...params) {
        switch (action) {
        case 'stop': return stop();
        case 'clearPlayground': return clearPlayground();
        case 'animateFSL': return initAnimate(animateFSL);
        case 'animateNoFSL': return initAnimate(animateNoFSL);
        case 'toggleLayers': return toggleLayers(params[0]);
        }
    }

    function stop () {
        running = false;
    }

    function initAnimate (animateFn) {
        clearPlayground();
        requestAnimationFrame(() => {
            var classes = [];
            if (document.querySelectorAll('#controls [data-action=toggleLayers]')[0].checked) {
                classes.push('layers-enabled');
            }
            var blocks = addBlocksToPlayground(50, classes);
            running = true;
            animateFn(blocks);
        });
    }

    function animateFSL (blocks) {
        blocks.forEach((block) => {
            var nextLeft = block.left + block.deltaLeft;
            var nextTop = block.top + block.deltaTop;

            if (nextLeft + block.size > playground.offsetWidth || nextLeft < 0) {
                block.deltaLeft *= -1;
            }

            if (nextTop + block.size > playground.offsetHeight || nextTop < 0) {
                block.deltaTop *= -1;
            }

            block.left += block.deltaLeft;
            block.top += block.deltaTop;
            block.el.style.transform = `translate(${block.left}px, ${block.top}px)`;
        });
        if (running) {
            requestAnimationFrame(() => {
                animateFSL(blocks);
            });
        }
    }

    function animateNoFSL (blocks) {
        var playgroundWidth = playground.offsetWidth;
        var playgroundHeight = playground.offsetHeight;
        blocks.forEach((block) => {
            var nextLeft = block.left + block.deltaLeft;
            var nextTop = block.top + block.deltaTop;

            if (nextLeft + block.size > playgroundWidth || nextLeft < 0) {
                block.deltaLeft *= -1;
            }

            if (nextTop + block.size > playgroundHeight || nextTop < 0) {
                block.deltaTop *= -1;
            }

            block.left += block.deltaLeft;
            block.top += block.deltaTop;
            block.el.style.transform = `translate(${block.left}px, ${block.top}px)`;
        });
        if (running) {
            requestAnimationFrame(() => {
                animateNoFSL(blocks);
            });
        }
    }

    function toggleLayers (enabled) {
        var elements = playground.children;
        for (let i = 0; i < elements.length; i++) {
            if (enabled) {
                elements[i].classList.add('layers-enabled');
            } else {
                elements[i].classList.remove('layers-enabled');
            }
        }
    }

    function clearPlayground () {
        while (playground.firstChild){
            playground.removeChild(playground.firstChild);
        }
        stop();
    }

    function addBlocksToPlayground (size, classes) {
        var blocks = [];
        var playgroundWidth = playground.offsetWidth;
        var playgroundHeight = playground.offsetHeight;
        var numberOfBlocks = getNumberOfRenderedElements();
        var fragment = document.createDocumentFragment();
        for (let i = 0; i < numberOfBlocks; i++) {
            let left = Math.max(0, Math.floor(Math.random() * (playgroundWidth - size)));
            let top = Math.max(0, Math.floor(Math.random() * (playgroundHeight - size)));

            let block = document.createElement('div');
            block.classList.add('block');
            if (classes) classes.forEach((c) => block.classList.add(c));

            block.style.width = `${size}px`;
            block.style.height = `${size}px`;

            block.style.transform = `translate(${left}px, ${top}px)`;

            fragment.appendChild(block);
            blocks.push({
                el: block,
                size: size,
                deltaLeft: (Math.floor(Math.random() * 10) - 5) || 6,
                deltaTop: (Math.floor(Math.random() * 10) - 5) || 6,
                top: top,
                left: left,
            });
        }
        playground.appendChild(fragment);
        return blocks;
    }

    function getNumberOfRenderedElements () {
        var input = document.getElementById('numberOfElements');
        return parseInt(input.value) || 20;
    }

    function setActiveButton (target) {
        document.querySelectorAll('#controls .button.active').forEach((activeButton) => {
            activeButton.classList.remove('active');
        });
        target.classList.add('active');
    }

    init();
})();
