class Members {
    constructor(Members, autoplay = true) {
        this.Members = Members;
        this.allFrames = Members.querySelectorAll('.members-item');
        this.frameChain = Members.querySelector('.members-slides');
        this.nextButton = Members.querySelector('.members-next');
        this.prevButton = Members.querySelector('.members-prev');
        this.nextButtonDesctop = Members.querySelector('.members-next_1366');
        this.prevButtonDesctop = Members.querySelector('.members-prev_1366');

        this.index = 0; // индекс кадра, который сейчас в окне просмотра
        this.length = this.allFrames.length; // сколько всего есть кадров
        this.autoplay = autoplay; // включить автоматическую прокрутку?
        this.paused = null; // чтобы можно было выключать автопрокрутку

        window.innerWidth < 666 ? this.init() : this.initDesctop();
    }

    init() {
        this.counterItem = this.counter(); // создать счетчик текущего кадра
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

        if (this.autoplay) { // включить автоматическую прокрутку?
            this.play();
            // когда мышь над слайдером — останавливаем автоматическую прокрутку
            this.Members.addEventListener('mouseenter', () => clearInterval(this.paused));
            // когда мышь покидает пределы слайдера — опять запускаем прокрутку
            this.Members.addEventListener('mouseleave', () => this.play());
        }
    }

    initDesctop() {
        this.counterItem = this.counterDesctop(); // создать счетчик текущего кадра
        this.allFrames.forEach(frame => frame.style.width = 100 / this.length + '%');
        this.frameChain.style.width = 100 * this.length + '%';

        // this.frameChain.style.width = this.allFrames * this.length;

        this.nextButtonDesctop.addEventListener('click', event => { // клик по кнопке «вперед»
            event.preventDefault();
            this.next();
        });

        this.prevButtonDesctop.addEventListener('click', event => { // клик по кнопке «назад»
            event.preventDefault();
            this.prev();
        });

        if (this.autoplay) { // включить автоматическую прокрутку?
            this.play();
            // когда мышь над слайдером — останавливаем автоматическую прокрутку
            this.Members.addEventListener('mouseenter', () => clearInterval(this.paused));
            // когда мышь покидает пределы слайдера — опять запускаем прокрутку
            this.Members.addEventListener('mouseleave', () => this.play());
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

    gotoDesctop(index) {
        if (index > this.length / 3 - 1) {
            this.index = 0;
        } else if (index < 0) {
            this.index = 1;
        } else {
            this.index = index;
        }
        this.move();
    }

    next() {
        window.innerWidth < 666
            ?
            this.goto(this.index + 1)
            :
            this.gotoDesctop(this.index + 1)
    }

    prev() {
        window.innerWidth < 666
            ?
            this.goto(this.index - 1)
            :
            this.gotoDesctop(this.index - 1)
    }

    move() {
        // на сколько нужно сместить, чтобы нужный кадр попал в окно
        const offset = 100 / this.length * this.index;
        this.frameChain.style.transform = `translateX(-${offset}%)`;

        window.innerWidth < 666
            ?
            this.counter()
            :
            this.counterDesctop()
    }

    play() {
        this.paused = setInterval(() => this.next(), 4000);
    }

    counter() {
        const startCounter = (this.index + 1),
            endCounter = this.length;
        let counterElement = document.getElementsByClassName('counter')[0];

        counterElement.innerHTML = '<span class="black-text">' + startCounter + '</span> / ' + endCounter;

        return;
    }

    counterDesctop() {
        const startCounter = (this.index*3+ 3);
        const endCounter = this.length;
        let counterElement = document.getElementsByClassName('counter_1366')[0];

        counterElement.innerHTML = '<span class="black-text">' + startCounter + '</span> / ' + endCounter;

        return;
    }
}