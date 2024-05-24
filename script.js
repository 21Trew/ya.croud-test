class Slider {
    constructor(slider, autoplay = false) {
        this.slider = slider;
        this.allFrames = slider.querySelectorAll('.carousel-item');
        this.frameChain = slider.querySelector('.carousel-slides');
        this.nextButton = slider.querySelector('.carousel-next');
        this.prevButton = slider.querySelector('.carousel-prev');

        this.index = 0; // индекс кадра, который сейчас в окне просмотра
        this.length = this.allFrames.length; // сколько всего есть кадров

        window.innerWidth < 666 ? this.init() : null;
            // this.init(); // инициализация слайдера
    }
    
    init() {
        this.dotButtons = this.dots(); // создать индикатор текущего кадра
        this.allFrames.forEach(frame => frame.style.width = 100 / this.length + '%');
        this.frameChain.style.width = 100 * this.length + '%';

        this.nextButton.addEventListener('click', event => { // клик по кнопке «вперед»
            event.preventDefault();
            this.next();
        });

        this.prevButton.addEventListener('click', event => { // клик по кнопке «назад»
            event.preventDefault();
            this.prev();
        });

        // клики по кнопкам индикатора текущего кадра
        this.dotButtons.forEach(dot => {
            dot.addEventListener('click', event => {
                event.preventDefault();
                const index = this.dotButtons.indexOf(event.target);
                if (index === this.index) return;
                this.goto(index);
            });
        });

        if (this.index === 0) {
            this.prevButton.style.backgroundColor = 'rgba(49, 49, 49, 0.2)';
        } else {
            this.prevButton.style.backgroundColor = 'rgba(49, 49, 49, 1)';
        }

        if (this.index === this.length - 1) {
            this.nextButton.style.backgroundColor = 'rgba(49, 49, 49, 0.2)';
        } else {
            this.nextButton.style.backgroundColor = 'rgba(49, 49, 49, 1)';
        }
    }

    goto(index) {
        if (index > this.length - 1) {
            this.index = 0;
        } else if (index < 0) {
            this.index = this.length - 1;
        } else {
            this.index = index;
        }
        this.move();
    }

    next() {
        if (this.index !== this.length - 1) {
            this.goto(this.index + 1);
        }
    }

    prev() {
        if (this.index !== 0) {
            this.goto(this.index - 1);
        }
    }

    move() {
        // на сколько нужно сместить, чтобы нужный кадр попал в окно
        const offset = 100 / this.length * this.index;
        this.frameChain.style.transform = `translateX(-${offset}%)`;
        this.dotButtons.forEach(dot => dot.classList.remove('active'));
        this.dotButtons[this.index].classList.add('active');
    }

    // создать индикатор текущего слайда
    dots() {
        const ol = document.createElement('ol');
        ol.classList.add('carousel-indicators');
        const children = [];
        for (let i = 0; i < this.length; i++) {
            let li = document.createElement('li');
            if (i === 0) li.classList.add('active');
            ol.append(li);
            children.push(li);
        }
        this.slider.prepend(ol);
        return children;
    }
}