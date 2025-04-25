import {catalogFilterInit} from "../forms/_catalog-filter";

export const toggler = () => {
    const $doc = $(document);
    $doc.on('click', '.toggle-class', function (e) {
        e.preventDefault();
        const $t = $(this);
        const isActive = $t.hasClass('active');
        const href = $t.attr('href');
        const cls = $t.attr('data-class') || 'active';
        if (href === undefined) return;
        const $elem = $doc.find(href);
        if ($elem.length === 0) return;
        if (isActive) {
            $t.removeClass('active');
            $elem.removeClass(cls);
        } else {
            $t.addClass('active');
            $elem.addClass(cls);
            if ($t.hasClass('not-scroll')) return;
            if ($(window).height() <= 500) {
                $('html, body').animate({
                    scrollTop: $elem.offset().top
                });
            }
        }
    });
    $doc.on('change', '.checkout-promo__checkbox', function (e) {
        e.preventDefault();
        const $t = $(this);
        const isActive = $t.prop('checked') === true;
        const $container = $t.closest('.checkout-promo').find('.checkout-promo-container');
        if (isActive) {
            $container.slideDown();
        } else {
            $container.slideUp();
        }
    });

}
export const dropdownCustom = () => {
    const $doc = $(document);
    setLocationDropdownHeight();
    $doc.on('click', '.dropdown-trigger', function (e) {
        e.preventDefault();
        const $t = $(this);
        const isActive = $t.hasClass('active');
        const href = $t.attr('href');
        const cls = $t.attr('data-class') || 'active';
        if (href === undefined) return;
        const $elem = $doc.find(href);
        if ($elem.length === 0) return;
        if (isActive) {
            $t.removeClass('active');
            $elem.removeClass(cls);
        } else {
            const $window = $(window);
            const windowW = $window.width();
            const windowH = $window.height();
            const triggerPositionTop = $t.offset().top;
            const triggerPositionLeft = $t.offset().left;
            const triggerHeight = $t.outerHeight();
            const triggerWidth = $t.outerWidth();
            const elW = $elem.outerWidth();
            const elH = $elem.outerHeight();
            const topPosition = triggerPositionTop + triggerHeight + 10;
            let position = {
                'left': triggerPositionLeft,
                'top': topPosition
            };
            if (elW + triggerPositionLeft > windowW) {
                position.left = triggerPositionLeft - (elW - triggerWidth);
            }
            if (elH + (triggerHeight + triggerPositionTop) > windowH) {
                position.top = triggerPositionTop - elH;
            }
            $elem.css(position);

            closeDropdowns(cls);

            $t.addClass('active');
            $elem.addClass(cls);
        }
    });
    $(window).on('resize', closeDropdowns);
}

const setLocationDropdownHeight = () => {
    const $list = $(document).find('#tips-list');
    const $dropdown = $(document).find('#location-dropdown');
    const $dropdownSearch = $dropdown.find('.location-dropdown-search');
    const styles = window.getComputedStyle($dropdownSearch[0]);
    const height = parseFloat(styles.height);
    const marginTop = parseFloat(styles.marginTop);
    const marginBottom = parseFloat(styles.marginBottom);
    const totalHeight = height + marginTop + marginBottom;
    $list.css('max-height', 'none');
    const listHeight = $list.height() + 10;
    $list.css('max-height', listHeight + 'px');
    const dropdownHeight = listHeight + totalHeight;
    $dropdown.css('max-height', dropdownHeight + 'px');
}

export const closeDropdowns = (cls = 'active') => {
    const $doc = $(document);
    $doc.find('.dropdown-trigger').removeClass('active');
    $doc.find('.custom-dropdown').removeClass(cls);
}