import {detectBrowser, isHorizontal, isMobile, showPreloader} from "./utils/_helpers";
import {burger} from "./ui/_burger";
import {accordion} from "./ui/_accardion";
import {numberInput} from "./forms/_number-input";
import {showPassword} from "./forms/_show-password";
import {fancyboxInit, showNotices} from "../plugins/_fancybox-init";
import {selectrickInit} from "../plugins/_selectric-init";
import FormHandler from "./forms/FormHandler";
import {toggler} from "./ui/_togglers";
import {tabs} from "./ui/_tabs";
import Slick from "../plugins/Slick";
import {catalogFilterInit} from "./forms/_catalog-filter";
import {copyLink} from "./ui/_copy-link";
import {showText} from "./ui/_show-text";
import {hoveredModel} from "./ui/_models";

export default class Application {
    constructor() {
        this.$doc = $(document);
        this.$body = $("body");
        this.parser = new DOMParser();
        this.init();
    }

    init() {
        this.initBrowserAttributes();
        this.initComponents();
    }

    showLoaderOnClick() {
        this.$doc.on('click', 'a.show-load, .header a, .footer a', function (e) {
            let href = $(this).attr('href') || '';
            let target = $(this).attr('target') || '';

            let test = !href.includes('#') &&
                !href.includes('tel') &&
                !href.includes('mailto') &&
                target !== '_blank';

            if (test) showPreloader();

        });
    }

    initBrowserAttributes() {
        const browserName = detectBrowser();
        this.$body.attr("data-browser", browserName).addClass(browserName);
        $(window).on('load resize', (e) => {
            const attr = window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical'
            this.$body.attr("data-screen-position", attr);
            this.$body.attr("data-mobile", isMobile ? "mobile" : '');
        });
    }

    initComponents() {
        this.$doc.ready(() => {
            showNotices();
            burger();
            toggler();
            accordion();
            numberInput();
            showPassword();
            selectrickInit();
            fancyboxInit();
            tabs();
            catalogFilterInit();
            copyLink();
            showText();
            hoveredModel();
            this.showLoaderOnClick();
            this.linkListener();
            this.mainProductTrigger();
            const form = new FormHandler('.form-js');
            const slick = new Slick();
            slick.gallerySliderRefresh();
        });

    }


    linkListener() {
        const t = this;
        this.$doc.on('click', 'a[href*="#"]:not(.fancybox, .book-form__trigger)', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    if ($t.hasClass('not-scroll')) return;
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
        this.$doc.on('click', '[data-link]', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('data-link');
            if (href === '#') return;
            const hashValue = href.split('#')[1];
            if (hashValue !== undefined) {
                const $el = t.$doc.find('#' + hashValue);
                if ($el.length > 0) {
                    $('html, body').animate({
                        scrollTop: $el.offset().top
                    });
                    return;
                }
            }
            window.location.href = href;
        });
    }

    mainProductTrigger() {
        this.$doc.on('click', '.main-product-box__item', function (e) {
            e.preventDefault();
            const $t = $(this);
            window.location.href = $t.attr('href');
        });
        this.$doc.on('click', '.main-product', function (e) {
            e.preventDefault();
            const $t = $(this);
            const $box = $t.find('.main-product-box');
            if ($(window).width() > 1023) return;
            $box.addClass('active');
        });
        this.$doc.mouseup(function (e) {
            var div = $('.main-product-box');
            if (!div.is(e.target)
                && div.has(e.target).length === 0) {
                div.removeClass('active');
            }
        });
    }
}