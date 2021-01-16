function Carousel() {
  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
  this.indicatorsContainer = this.container.querySelector('#indicators-container');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  this.controlsContainer = this.container.querySelector('#controls-container');
  this.pauseBtn = this.controlsContainer.querySelector('#pause-btn');
  this.prevBtn = this.controlsContainer.querySelector('#prev-btn');
  this.nextBtn = this.controlsContainer.querySelector('#next-btn');


  this.currentSlide = 0;
  this.timerID = null;
  this.slidesCount = this.slides.length;
  this.isPlaying = true;
  this.interval = 2000;
  this.swipeStartX = null;
  this.swipeEndX = null;
  
  this.CLASS_TRIGGER = 'active';
  this.FA_PAUSE = '<i class="fa fa-pause-circle"></i>';
  this.FA_PLAY ='<i class="fa fa-play-circle"></i>';
  this.SPACE = ' ';
  this.LEFT_ARROW = 'ArrowLeft';
  this.RIGHT_ARROW = 'ArrowRight';
}

  Carousel.prototype = {
    gotoNth: function (n) {
    this.slides[this.currentSlide].classList.toggle(this.CLASS_TRIGGER);
    this.indicators[this.currentSlide].classList.toggle(this.CLASS_TRIGGER);
    this.currentSlide = (n + this.slidesCount) % this.slidesCount;
    this.slides[this.currentSlide].classList.toggle(this.CLASS_TRIGGER);
    this.indicators[this.currentSlide].classList.toggle(this.CLASS_TRIGGER);
    },
    
    gotoNext() {
      this.gotoNth(this.currentSlide + 1);
    },
    
    gotoPrev() {
      this.gotoNth(this.currentSlide - 1);
    },

    pause() {
      this.pauseBtn.innerHTML = this.FA_PLAY;
      clearInterval(this.timerID);
      this.isPlaying = false;
    },
    
    play() {
      this.pauseBtn.innerHTML = this.FA_PAUSE;
      let that = this;

      this.timerID = setInterval(function () {
        that.gotoNext();
      }, this.interval);
      this.isPlaying = true;
    },
    
    pausePlay() {
      this.isPlaying ? this.pause() : this.play();
    },

    next() {
      this.pause();
      this.gotoNext();
    },
    
    prev() {
      this.pause();
      this.gotoPrev();
    },

    indicate(e) {
      let target = e.target;
    
      if (target.classList.contains('indicator')) {
        this.pause();
        this.gotoNth(+target.dataset.slideTo);
      }
    },
    
    pressKey(e) {
      if (e.key === this.LEFT_ARROW) prev();
      if (e.key === this.RIGHT_ARROW) next();
      if (e.key === this.SPACE) pausePlay();
    },
    
    swipeStart(e) {
      if (e.changedTouches === 1) this.swipeStartX = e.changedTouches[0].pageX;
    },
    
    swipeEnd(e) {
      if (e.changedTouches.length === 1) {
        this.swipeEndX = e.changedTouches[0].pageX;
        if (this.swipeStartX - this.swipeEndX < 0) this.prev();
        if (this.swipeStartX - this.swipeEndX > 0) this.next();
      }
    }, 
    
    initListeners() {
      this.pauseBtn.addEventListener('click', this.pausePlay);
      this.prevBtn.addEventListener('click', this.prev);
      this.nextBtn.addEventListener('click', this.next);
      this.indicatorsContainer.addEventListener('click', this.indicate);
      this.container.addEventListener('touchstart', this.swipeStart);
      this.container.addEventListener('touchend', this.swipeEnd);
      document.addEventListener('keydown', this.pressKey);
    },

    init() {
      this.timerID = setInterval(function () {
        this.gotoNext;
      }, this.interval);
    }
  }
