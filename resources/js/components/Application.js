import {
    $document,
    detectBrowser,
    hidePreloader,
    isHorizontal,
    isJsonString,
    isMobile,
    showPreloader
} from "./utils/_helpers";
import {burger} from "./ui/_burger";
import {accordion} from "./ui/_accardion";
import {numberInput} from "./forms/_number-input";
import {showPassword} from "./forms/_show-password";
import {fancyboxInit, showMsg, showNotices} from "../plugins/_fancybox-init";
import {selectrickInit} from "../plugins/_selectric-init";
import FormHandler from "./forms/FormHandler";
import {dropdownCustom, toggler} from "./ui/_togglers";
import {tabs} from "./ui/_tabs";
import Slick from "../plugins/Slick";
import {catalogFilterInit} from "./forms/_catalog-filter";
import {copyLink} from "./ui/_copy-link";
import {showText} from "./ui/_show-text";
import {hoveredModel} from "./ui/_models";
import {flatpickrInit} from "../plugins/_flatpickr-init";
import {select2Init} from "../plugins/_select2-init";
import {tips} from "./ui/_tips";
import {addTicketRow, removeTicketRow} from "./_checkout";

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
            fancyboxInit();
            tabs();
            catalogFilterInit();
            copyLink();
            showText();
            hoveredModel();
            flatpickrInit();
            selectrickInit();
            tips();
            dropdownCustom();
            addTicketRow();
            removeTicketRow();
            this.showLoaderOnClick();
            this.linkListener();
            this.addToFavorites();
            const form = new FormHandler('.form-js');
            const slick = new Slick();
            slick.gallerySliderRefresh();
        });

    }


    linkListener() {
        const t = this;
        this.$doc.on('click', 'a[href*="#"]:not(.fancybox, .dropdown-trigger)', function (e) {
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

    addToFavorites() {
        $document.on('click', '.add-to-favorites', function (e) {
            e.preventDefault();
            const $t = $(this);
            let id = $t.attr('data-id');
            if (id === undefined) return;
            id = Number(id);
            $t.addClass('not-active');
            showPreloader();
            const options = {
                type: "POST",
                url: adminAjax,
                data: {
                    action: 'toggle_favorites',
                    id: id
                },
            };
            $.ajax(options).done((response) => {
                hidePreloader();
                $t.removeClass('not-active');
                if (response) {
                    if (isJsonString(response)) {
                        response = JSON.parse(response);
                        const favorites = response.favorites || [];
                        const icon_active = response.icon_active;
                        const icon_not_active = response.icon_not_active;
                        if (favorites.includes(id)) {
                            $document.find(`.add-to-favorites[data-id="${id}"]`).addClass('active');
                            $document.find(`.add-to-favorites[data-id="${id}"]`).html(icon_not_active);

                        } else {
                            $document.find(`.add-to-favorites[data-id="${id}"]`).removeClass('active');
                            $document.find(`.add-to-favorites[data-id="${id}"]`).html(icon_active);
                        }
                    } else {
                        showMsg(response);
                    }
                }
            });
        });
    }
    loadMore() {
        let load = false;
        const parser = new DOMParser();
        $(document).on('click', '.button-load-more', function (e) {
            e.preventDefault();
            const $t = $(this);
            const href = $t.attr('href');
            if (load) return;
            const $pagination = $(document).find('.pagination-container');
            showPreloader();
            $pagination.addClass('not-active');
            $t.addClass('not-active');
            $.ajax({
                type: 'GET',
                url: href,
            }).done(function (r) {
                hidePreloader();
                let $requestBody = $(parser.parseFromString(r, "text/html"));
                $(document).find('.container-js').append($requestBody.find('.container-js').html());
                $pagination.html($requestBody.find('.pagination-container').html());
                load = false;
                $pagination.removeClass('not-active');
                $t.remove();
            });
        });
    }
}