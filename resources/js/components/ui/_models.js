export const hoveredModel = (selector = ".models-item") => {

    $(document).on({
        mouseenter: function () {
            const $t = $(this);
            const $wrapper = $t.closest('.models');
            $wrapper.find(selector).not($t).removeClass('active');
            $t.addClass('active');
        },
        mouseleave: function () {
            const $t = $(this);
            const $wrapper = $t.closest('.models');
            const count = $wrapper.find(selector).length;
            if (count === $t.index() + 1) return;
            console.log()
            $wrapper.find(selector).last().addClass('active');
            $t.removeClass('active');
        }
    }, selector);
}