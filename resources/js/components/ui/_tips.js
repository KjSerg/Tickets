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
            return;
        }
        $elements.each(function () {
            const $el = $(this);
            let text = $el.text().trim().toLowerCase();
            if (text.includes(val)) {
                $el.show();
            } else {
                $el.hide();
            }
        })
    });
}