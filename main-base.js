(function () {

  const container = document.querySelector('#carousel');
  const slides = container.querySelectorAll('.slide');
  const indicatorsContainer = container.querySelector('#indicators-container');
  const indicators = indicatorsContainer.querySelectorAll('.indicator');
  const controlsContainer = container.querySelector('#controls-container');
  const pauseBtn = controlsContainer.querySelector('#pause-btn');
  const prevBtn = controlsContainer.querySelector('#prev-btn');
  const nextBtn = controlsContainer.querySelector('#next-btn');
  
  // console.log(nextBtn);
  
  let currentSlide = 0;
  let timerID = null;
  let slidesCount = slides.length;
  let isPlaying = true;
  let interval = 2000;
  let swipeStartX = null;
  let swipeEndX = null;
  
  const CLASS_TRIGGER = 'active';
  const FA_PAUSE = '<i class="fa fa-pause-circle"></i>';
  const FA_PLAY ='<i class="fa fa-play-circle"></i>';
  const SPACE = ' ';
  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';
  
  
  function gotoNth(n) {
    slides[currentSlide].classList.toggle(CLASS_TRIGGER);
    indicators[currentSlide].classList.toggle(CLASS_TRIGGER);
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle(CLASS_TRIGGER);
    indicators[currentSlide].classList.toggle(CLASS_TRIGGER);
  }
  
  function gotoNext () {
    gotoNth(currentSlide + 1);
  }
  
  function gotoPrev() {
    gotoNth(currentSlide - 1);
  }
  
  function pause() {
    pauseBtn.innerHTML = FA_PLAY;
    clearInterval(timerID);
    isPlaying = false;
  }
  
  function play() {
    pauseBtn.innerHTML = FA_PAUSE;
    timerID = setInterval(gotoNext, interval);
    isPlaying = true;
  }
  
  const pausePlay = () => isPlaying ? pause() : play();
  
  function next() {
    pause();
    gotoNext();
  }
  
  function prev() {
    pause();
    gotoPrev();
  }
  
  function indicate(e) {
    let target = e.target;
  
    if (target.classList.contains('indicator')) {
      pause();
      gotoNth(+target.dataset.slideTo);
    }
  }
  
  function pressKey(e) {
    if (e.key === LEFT_ARROW) prev();
    if (e.key === RIGHT_ARROW) next();
    if (e.key === SPACE) pausePlay();
  }
  
  function swipeStart(e) {
    if (e.changedTouches === 1) swipeStartX = e.changedTouches[0].pageX;
  }
  
  function swipeEnd(e) {
    if (e.changedTouches.length === 1) {
      swipeEndX = e.changedTouches[0].pageX;
      if ((swipeStartX - swipeEndX) < 0) prev();
      if ((swipeStartX - swipeEndX) > 0) next();
    }
  }
  
  pauseBtn.addEventListener('click', pausePlay);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  indicatorsContainer.addEventListener('click', indicate);
  container.addEventListener('touchstart', swipeStart);
  container.addEventListener('touchend', swipeEnd);
  document.addEventListener('keydown', pressKey);
  
  
  timerID = setInterval(gotoNext, interval);
  
  }())