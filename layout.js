(function () {
    var grid;

    function init () {
        var controlButtons = document.querySelectorAll('#controls button');
        grid = document.getElementById('grid');

        controlButtons.forEach((button) => {
            button.addEventListener('click', function (event) {
                setActiveButton(event.target);
                executeAction(event.target.dataset.action);
            });
        });
    }

    function executeAction (action, ...params) {
        switch (action) {
        case 'generate': return generateGrid();
        case 'expand': return expand();
        case 'collapse': return collapse();
        }
    }

    function generateGrid () {
        clearGrid();
        var numberOfRows = parseInt(document.getElementById('numberOfRows').value) || 20;

        var fragment = document.createDocumentFragment();
        for (let i = 0; i < numberOfRows; i++) {
            let row = document.createElement('div');
            row.classList.add('grid__row');
            for (let j = 0; j < 10; j++) {
                let cell = document.createElement('div');
                cell.classList.add('grid__cell');
                cell.innerHTML = Math.floor(Math.random() * 99);
                row.appendChild(cell);
            }
            fragment.appendChild(row);
        }
        grid.appendChild(fragment);
    }

    function expand () {
        grid.classList.add('grid--large');
    }

    function collapse () {
        grid.classList.remove('grid--large');
    }

    function setActiveButton (target) {
        document.querySelectorAll('#controls .button.active').forEach((activeButton) => {
            activeButton.classList.remove('active');
        });
        target.classList.add('active');
    }

    function clearGrid () {
        while (grid.firstChild){
            grid.removeChild(grid.firstChild);
        }
        stop();
    }

    init();
})();
