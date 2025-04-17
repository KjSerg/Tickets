export const tips = () => {
    $(document).on('input', '.tips-input', function (e) {
        let $t = $(this);
        let val = $t.val().trim().toLowerCase();
        let selector = $t.attr('data-selector');
        if (selector === undefined) return;
        let $selector = $(document).find(selector);
        if ($selector.length === 0) return;
        let $elements = $selector.find('> *');
        if (val === '') {
            $elements.show();
            $elements.find('li').show();
            return;
        }
        $elements.each(function () {
            const $el = $(this);
            let text = $el.text().trim().toLowerCase();
            if (text.includes(val)) {
                $el.show();
                $el.addClass('active');
                $el.find('.dropdown-cities').show();
                $el.find('li').each(function () {
                    const $_el = $(this);
                    let _text = $_el.text().trim().toLowerCase();
                    if (_text.includes(val)) {
                        console.log(_text)
                        $_el.show();
                    } else {
                        $_el.hide();
                    }
                });
            } else {
                $el.hide();
                $el.removeClass('active');
                $el.find('.dropdown-cities').hide();
            }
        });
    });
}