function Carousel(containerID = '#carousel', slideID = '.slide') {
  console.log(containerID);
  console.log(slideID);
  this.container = document.querySelector(containerID);
  this.slides = this.container.querySelectorAll( slideID);
  
  this.interval = 2000;

  this._initProps();
  this._initIndicators();
  this._initControls();
  this._initListeners();
}

Carousel.prototype = {
  _initProps() { 
    this.currentSlide = 0;
    this.slidesCount = this.slides.length;
    this.isPlaying = true;
    

    this.CLASS_TRIGGER = 'active';
    this.FA_PAUSE = '<i class="fa fa-pause-circle"></i>';
    this.FA_PLAY ='<i class="fa fa-play-circle"></i>';
    this.FA_PREV ='<i class="fas fa-angle-left"></i>';
    this.FA_NEXT ='<i class="fas fa-angle-right"></i>';
    this.SPACE = ' ';
    this.LEFT_ARROW = 'ArrowLeft';
    this.RIGHT_ARROW = 'ArrowRight';
  },

  _initControls() {
    const controls = document.createElement('div');

    const PAUSE = '<span id="pause-btn" class="control control-pause">${this.FA_PAUSE}</span>';
    const PREV = '<span id="prev-btn" class="control control-pause">${this.FA_PREV}</span>';
    const NEXT = ' <span id="next-btn" class="control control-pause">${this.FA_NEXT}</span>';

    controls.setAttribute('class', 'controls');
    controls.setAttribute('id', 'controls-container');

    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.appendChild(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');
  },

  _initIndicators() {
    const indicators = document.createElement('ol');
    

    indicators.setAttribute('class', 'indicators');
    indicators.setAttribute('id', 'indiators-container');

    for (let i = 0, n = this.slidesCount; i <n; i++) {
      const indicator = document.createElement('li');

      indicator.setAttribute('class', 'indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.dataset.slideTo = `${i}`;

      indicators.appendChild(indicator);
    }

    this.container.appendChild(indicators);


    this.indicatorsContainer = this.container.querySelector('#indicators-container');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  },

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  },

  _indicate(e) {
    let target = e.target;
  
    if (target.classList.contains('indicator')) {
      this.pause();
      this.gotoNth(+target.dataset.slideTo);
    }
  },

  _pressKey(e) {
    if (e.key === this.LEFT_ARROW) prev();
    if (e.key === this.RIGHT_ARROW) next();
    if (e.key === this.SPACE) pausePlay();
  },

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
  
  init() {
    this.timerID = setInterval(function() {
      this.gotoNext();
    }, this.interval);
  }
};

function SwipeCarousel() {
  Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initListeners = function() {
  Carousel.prototype._initListeners.apply(this);
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
};

SwipeCarousel.prototype._swipeStart = function(e) {
  if (e.changedTouches === 1) this.swipeStartX = e.changedTouches[0].pageX;
};

SwipeCarousel.prototype._swipeEnd = function(e) {
  if (e.changedTouches.length === 1) {
    this.swipeEndX = e.changedTouches[0].pageX;
    if (this.swipeStartX - this.swipeEndX < 0) this.prev();
    if (this.swipeStartX - this.swipeEndX > 0) this.next();
  };
};



  
  
  