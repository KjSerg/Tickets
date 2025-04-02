import {isMobile} from "../utils/_helpers";

export const headerFormInit = () => {
    $(document).on('click', '.header-form button', function (e) {
        e.preventDefault();
        const $this = $(this);
        const $form = $this.closest('form');
        if ($form.hasClass('active')) {
            $form.submit();
        } else {
            $form.addClass('active');
        }
    });
}