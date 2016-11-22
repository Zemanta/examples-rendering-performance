const ANIMATE_NONE = 0;
const ANIMATE_POSITION = 1;
const ANIMATE_TRANSFORM = 2;

const SHAPE_INNER = 'inner';
const SHAPE_OUTER = 'outer';

let stage = {
  shapeCount: 0,
  exposeOne: false,
  colorAnimate: false,
  heavyStyle: false,
  heavyWork: false,
  animation:{
    inner: ANIMATE_NONE,
    outer: ANIMATE_NONE,
  }
}

let emptyStage = $.extend(true, {}, stage);

function updateStage (stage) {
  // Sync #shapes
  let activeShapes = $('.shape__inner').length;
  if (activeShapes < stage.shapeCount) {
    createElements(stage.shapeCount - activeShapes);
  } 
  if (activeShapes > stage.shapeCount) {
    clearStage();
    createElements(stage.shapeCount);
  }

  // configure animation
  configureAnimation(SHAPE_INNER, stage.animation[SHAPE_INNER], stage.colorAnimate);
  configureAnimation(SHAPE_OUTER, stage.animation[SHAPE_OUTER]);

  // configure work
  if (stage.heavyWork) {
    startWork(200);
  } else {
    stopWork();
  }

  // configure style
  enableHeavyStyle(stage.heavyStyle);

  // expose one
  exposeOne(stage.exposeOne);
}

$(function() {
    function init () {
        var controlButtons = document.querySelectorAll('#controls button');
        var controlCheckboxes = document.querySelectorAll('#controls [type=checkbox]');
        playground = document.getElementById('playground');

        $('#controls button').click(_ => {
              setActiveButton(event.target);
              executeAction(event.target.dataset.action);
        });

        $('#controls [type=checkbox]').change(_ => {
              executeAction(event.target.dataset.action, event.target.checked);
        });
    }

    function setActiveButton (target) {
        $('#controls .button.active').removeClass('active');
        $(target).addClass('active');
    }

    function executeAction (action, ...params) {
        stage.shapeCount = parseInt($('#shapeCount').val()) || 10;

        switch (action) {
        case 'clear': stage = $.extend(true, {}, emptyStage); break;
        case 'animatePosition': stage.animation.inner = ANIMATE_POSITION; stage.animation.outer = ANIMATE_POSITION; break;
        case 'animateTransform': stage.animation.inner = ANIMATE_TRANSFORM; stage.animation.outer = ANIMATE_TRANSFORM; break;
        case 'animateAlternate': {
          if (stage.animation.inner === stage.animation.outer) {
            stage.animation.inner = ANIMATE_TRANSFORM; stage.animation.outer = ANIMATE_POSITION; break;
          } else {
            let temp = stage.animation.inner;
            stage.animation.inner = stage.animation.outer;
            stage.animation.outer = temp;
          }
        }
        default: stage[action] = !stage[action]; // Checkbox flags
        }

        updateStage(stage);
    }

    init();
});

function clearStage () {
  $('.stage').empty();
}

//
// Create elements
//
function createElements(count) {
  var documentFragment = $(document.createDocumentFragment());
  for (var i = 0; i < count; i++) {
    documentFragment.append(createElement());
  }
  $('.stage').append(documentFragment);
}

function createElement () {
  outer = $('<div><div>').addClass('shape shape__outer');
  inner = $('<div><div>').addClass('shape shape__inner');
  outer.append(inner)

  // outer.addClass('shape__outer--animate-transform')
  // inner.addClass('shape__inner--animate-transform')

  randomizeAnimation(outer, inner)
  return outer;
}

function randomizeAnimation (outer, inner) {
  var width = $('.stage').width();
  var height = $('.stage').height();
  var x = Math.floor(Math.random() * width);
  var y = Math.floor(Math.random() * height);

  var outerDurration = Math.floor(Math.random() * 10 + 4);
  var innerDurration = Math.floor(Math.random() * 10 + 4);
  var delayOuter = `-${x / width * outerDurration}s`;
  var delayInner = `-${y / height * innerDurration}s`;

  outer.css('animation-duration', outerDurration+'s');
  inner.css('animation-duration', innerDurration+'s');
  outer.css('animation-delay', delayOuter);
  inner.css('animation-delay', delayInner);
}


// 
// Sgate function
//
function exposeOne (expose) {
  if (expose) {
    $('.shape__inner').css('opacity', 0.1);
    $('.shape__inner').first().css('opacity', 1);
  } else {
    $('.shape__inner').css('opacity', 1);
  }
}

function configureAnimation (shape, animation, color) {
  if (shape === SHAPE_INNER) {
    $('.shape__inner').removeClass('shape__inner--animate-transform');
    $('.shape__inner').removeClass('shape__inner--animate-position');
    $('.shape__inner').removeClass('shape__inner--animate-transform-color');
    $('.shape__inner').removeClass('shape__inner--animate-position-color');
    if (color) {
      if (animation === ANIMATE_POSITION) $('.shape__inner').addClass('shape__inner--animate-position-color');
      if (animation === ANIMATE_TRANSFORM) $('.shape__inner').addClass('shape__inner--animate-transform-color');
    } else {
      if (animation === ANIMATE_POSITION) $('.shape__inner').addClass('shape__inner--animate-position');
      if (animation === ANIMATE_TRANSFORM) $('.shape__inner').addClass('shape__inner--animate-transform');
    }
  }

  if (shape === SHAPE_OUTER) {
    $('.shape__outer').removeClass('shape__outer--animate-transform');
    $('.shape__outer').removeClass('shape__outer--animate-position');
    if (animation === ANIMATE_POSITION) $('.shape__outer').addClass('shape__outer--animate-position');
    if (animation === ANIMATE_TRANSFORM) $('.shape__outer').addClass('shape__outer--animate-transform');
  }
}

function stopAnimation () {
  configureAnimation(SHAPE_OUTER, ANIMATE_NONE);
  configureAnimation(SHAPE_INNER, ANIMATE_NONE);
}

function startAnimation (animation, color) {
  configureAnimation(SHAPE_INNER, animation, color);
  configureAnimation(SHAPE_OUTER, animation);
}

function enableHeavyStyle (heavy) {
  if (heavy) {
    $('.shape__inner').addClass('shape__inner--heavy-style');
  } else {
    $('.shape__inner').removeClass('shape__inner--heavy-style');
  }
}

let workInterval;
function startWork (millis) {
  if (workInterval) return;
  workInterval = setInterval(_ => {
    let start = new Date().getTime();
    let ticks = 0;
    while (new Date().getTime() < start + millis) {
    }
  }, 1000/60)
}

function stopWork () {
  clearInterval(workInterval);
  workInterval = null;
}