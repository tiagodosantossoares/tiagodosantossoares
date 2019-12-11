export default {
    sliderElement: $('#aboutSlider'),
    menuPosition: $('.about-slider__nav-menu').offset().top,
    menu: $('.about-slider__nav-menu'),
    isMobile: false,
    init() {
        this.bindHandlers();

        this.sliderElement.slick({
            dots: true,
            speed: 600,
            slidesToShow: 1,
            arrows: false,
            draggable: false,
            cssEase: 'cubic-bezier(.34,.54,.35,1)',
        });

        this.sliderElement.trigger('afterChange');
    },

    scrollToElement(element) {
        const offset = this.isMobile ? 100 : 150;

        $('html, body').animate({
            scrollTop: $('section[data-section="'+ element +'"]').offset().top - offset
        }, 800);
    },

    bindHandlers() {

        $(window).on('scroll', () => {
            if ($(window).width() <= 999) {
                this.isMobile = true;
            } else {
                this.isMobile = false;
            }
        });

        $(window).trigger('scroll');

        this.setMenuScrollFixed();

        $('[data-target]').on('click', (e) => {
            const target = $(e.currentTarget).data('target');

            this.menu.find('li').removeClass('active');
            $(e.currentTarget).addClass('active');

            this.scrollToElement(target);
        });

        this.sliderElement.on('afterChange', () => {
            if (!this.isMobile) {
                const currentSlider = this.sliderElement.find('.slick-active');

                currentSlider.find('.pp-logo')
                .fadeIn()
                .addClass('animated bounceIn');
            }
        });

        this.sliderElement.on('beforeChange', () => {
            if (!this.isMobile) {
                const currentSlider = this.sliderElement.find('.slick-active');

                currentSlider.find('.pp-logo').fadeOut();
            }
        });
    },

    setMenuScrollFixed() {
        $(window).scroll( () => {
            const offsetSection = this.isMobile ? 130 : 300;
            const offsetMenu = this.isMobile ? 75 : 130;
            const windowPosition = $(window).scrollTop();
            const aboutSection = $('#aboutSlider').offset().top;
            const pressSection = $('.press').offset().top;
            const contact = $('.contact').offset().top;
            const timeline = $('.timeline').offset().top;


            if (windowPosition <= aboutSection) {
                $('.about-slider__nav-menu').removeClass('about-slider__nav-menu--fixed');
            }

            if (windowPosition <= timeline) {
                this.menu.find('li').removeClass('active');
                this.menu.find('li[data-target="about"]').addClass('active');
            }

            if (windowPosition >= pressSection) {
                this.menu.find('li').removeClass('active');
                this.menu.find('li[data-target="press"]').addClass('active');
            }

            if (windowPosition >= contact - offsetSection) {
                this.menu.find('li').removeClass('active');
                this.menu.find('li[data-target="contact"]').addClass('active');
            }

            if (windowPosition + offsetMenu > this.menuPosition) {
                $('.about-slider__nav-menu').addClass('about-slider__nav-menu--fixed');
            }
        });
    },
}