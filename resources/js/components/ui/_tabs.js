export const tabs = () => {
    $(document).on('click', '.tab-head', function (e) {
        e.preventDefault();
        const $this = $(this);
        const selector = $this.attr('href');
        $this.addClass('active');
        if (!selector) return;
        const $element = $(document).find(selector);
        if ($element.length === 0) return;
        let $section = $element.closest('section');
        $section = $section.length === 0 ? $element.closest('footer') : $section;
        $section = $section.length === 0 ? $element.closest('header') : $section;
        const isShowed = $element.hasClass('active');
        $section.find('.tab-head').not($this).removeClass('active');
        $section.find('.tab-content').not($element).removeClass('active');
        if (isShowed) return;
        $element.addClass('active');
    });
    $(document).on('click', '.row-tab-head', function (e) {
        e.preventDefault();
        const $i = $(this);
        if($i.hasClass('active')) return;
        const href = $i.attr('href');
        if (href === undefined) return;
        const $el = $(document).find(href);
        if($el.length === 0) return;
        const $head = $i.closest('section').find('.row-tab-head');
        $head.removeClass('active');
        $i.addClass('active');
        const index = $el.index();
        let transformX = index * 100;
        $i.closest('section').find('.row-tab-content').css('transform', 'translateX(-' + transformX + '%)');
    });
}