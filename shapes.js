$(function() {
  createElements(20);
});

function clearStage () {
  $('.stage').empty();
}

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

  outer.addClass('shape__outer--animate-transform')
  inner.addClass('shape__inner--animate-transform')

  randomizeAnimation(outer, inner)
  return outer;
}

function randomizeAnimation (outer, inner) {
  var width = $('.stage').width();
  var height = $('.stage').height();
  var x = Math.floor(Math.random() * width);
  var y = Math.floor(Math.random() * height);

  var outerDurration = Math.floor(Math.random() * 5 + 2);
  var innerDurration = Math.floor(Math.random() * 5 + 2);
  var delayOuter = `-${x / width * outerDurration}s`;
  var delayInner = `-${y / height * innerDurration}s`;

  outer.css('animation-duration', outerDurration+'s');
  inner.css('animation-duration', innerDurration+'s');
  outer.css('animation-delay', delayOuter);
  inner.css('animation-delay', delayInner);
}


function exposeOne () {
  $('.shape__inner').css('opacity', 0.1);
  $('.shape__inner').first().css('opacity', 1);
}

function configureAnimation (shape, animation, color) {
  if (shape === 1) {
    $('.shape__inner').removeClass('shape__inner--animate-transform');
    $('.shape__inner').removeClass('shape__inner--animate-position');
    $('.shape__inner').removeClass('shape__inner--animate-transform-color');
    $('.shape__inner').removeClass('shape__inner--animate-position-color');
    if (color) {
      if (animation === 1) $('.shape__inner').addClass('shape__inner--animate-position-color');
      if (animation === 2) $('.shape__inner').addClass('shape__inner--animate-transform-color');
    } else {
      if (animation === 1) $('.shape__inner').addClass('shape__inner--animate-position');
      if (animation === 2) $('.shape__inner').addClass('shape__inner--animate-transform');
    }
  }

  if (shape === 2) {
    $('.shape__outer').removeClass('shape__outer--animate-transform');
    $('.shape__outer').removeClass('shape__outer--animate-position');
    if (animation === 1) $('.shape__outer').addClass('shape__outer--animate-position');
    if (animation === 2) $('.shape__outer').addClass('shape__outer--animate-transform');
  }
}

function stopAnimation () {
  configureAnimation(1, -1);
  configureAnimation(2, -1);
}

function startAnimation (animation, color) {
  configureAnimation(1, animation, color);
  configureAnimation(2, animation);
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