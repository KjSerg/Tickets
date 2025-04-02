export const showText = () => {
    $(document).on('click', '.text-hidden__button', function (e) {
        e.preventDefault();
        const $t = $(this);
        const hideText = $t.attr('data-hide-text');
        const showText = $t.attr('data-show-text');
        if ($t.hasClass('active')) {
            $t.find('.button-text').text(showText);
            $t.removeClass('active');
            $t.closest('.text-hidden').find('.text-hidden-container').slideUp();
        } else {
            $t.find('.button-text').text(hideText);
            $t.addClass('active');
            $t.closest('.text-hidden').find('.text-hidden-container').slideDown();
        }
    });
}