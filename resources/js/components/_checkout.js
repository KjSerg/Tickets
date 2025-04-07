import {$document, hidePreloader, showPreloader} from "./utils/_helpers";
import {selectrickInit} from "../plugins/_selectric-init";

export const addTicketRow = () => {
    $document.on('click', '.checkout-ticket-add__button', function (e) {
        e.preventDefault();
        const $t = $(this);
        let href = $t.attr('href');
        if(href === undefined) return;
        if(href === '#') return;
        showPreloader();
        $.ajax({
            type: 'get',
            url: href
        }).done((response) => {
            if (response) {
                $t.closest('.checkout-ticket-add').before(response);
                selectrickInit();
            }
            hidePreloader();
        });
    });
}
export const removeTicketRow = () => {
    $document.on('click', '.checkout-ticket-remove', function (e) {
        e.preventDefault();
        const $t = $(this);
        const $rows = $document.find('.checkout-ticket');
        if($rows.length <= 1) return;
        $t.closest('.checkout-ticket').remove();
    });
}