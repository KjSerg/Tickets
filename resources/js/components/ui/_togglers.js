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

}
export const dropdownCustom = () => {
    const $doc = $(document);
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

export const closeDropdowns = (cls = 'active') => {
    const $doc = $(document);
    $doc.find('.dropdown-trigger').removeClass('active');
    $doc.find('.custom-dropdown').removeClass(cls);
}