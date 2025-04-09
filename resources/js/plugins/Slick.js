import 'slick-carousel';

export default class Slick {
    constructor() {
        this.init();
    }

    init() {
        this.mainSliderInit();
        this.similarSliderInit();
    }

    similarSliderInit() {

        $(document).find('.similar-slider').each(function () {
            const $slider = $(this);
            const $section = $slider.closest('section');
            const $prev = $section.find('.slick__prev');
            const $next = $section.find('.slick__next');
            let slidesToShow = 4;
            const slides = $slider.find('> *');
            const param = {
                slidesToShow: slidesToShow,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: false,
                adaptiveHeight: true,
                responsive: [
                    {
                        breakpoint: 1300,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 650,
                        settings: {
                            slidesToShow: 1,
                            adaptiveHeight: true
                        }
                    },
                ]
            };
            if(slides.length < slidesToShow) return;
            $slider.slick(param);
        });
    }

    mainSliderInit() {

        $(document).find('.main-slider').each(function () {
            const $slider = $(this);
            const $section = $slider.closest('section');
            const $prev = $section.find('.slick__prev');
            const $next = $section.find('.slick__next');
            const $preview = $section.find('.main-slider-preview');
            const param = {
                slidesToShow: 1,
                arrows: true,
                prevArrow: $prev,
                nextArrow: $next,
                dots: false,
            };
            if ($preview.length > 0) {
                $preview.slick({
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    asNavFor: $slider,
                    dots: false,
                    centerMode: false,
                    focusOnSelect: true,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 4
                            }
                        },
                        {
                            breakpoint: 769,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 601,
                            settings: {
                                slidesToShow: 2
                            }
                        }
                    ]
                });
                param.asNavFor = $preview;
            }
            $slider.slick(param);
        });
    }

    gallerySliderRefresh() {
        $(window).on('load', function () {
            $(document).find('.single-gallery').each(function () {
                $(this).slick('refresh');
            });
        });
    }
}

