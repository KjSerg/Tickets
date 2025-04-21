import {hidePreloader, showPreloader} from "../utils/_helpers";
import {selectrickInit} from "../../plugins/_selectric-init";

export class Checkout {
    constructor() {
        this.$document = $(document);
        this.initialize();
        this.selectInit();
    }

    initialize() {

    }

    selectInit() {
        const t = this;
        this.$document.on('change', '.select-zone-js', function () {
            const $t = $(this);
            const $ticket = $t.closest('.checkout-ticket');
            const $priceSelector = $ticket.find('.checkout-ticket-price');
            const $placeWrapperSelector = $ticket.find('.select-place-wrapper');
            const $placeSelect = $ticket.find('.select-place-js');
            const $option = $t.find('option:selected');
            const val = $t.val();
            let qnt = $option.attr('data-qnt') || 0;
            let price = $option.attr('data-price') || 0;
            let eventID = $ticket.attr('data-event-id') || 0;
            qnt = Number(qnt);
            price = Number(price);
            $ticket.attr('data-price', price);
            $priceSelector.attr('data-price', price);
            $priceSelector.text(price + ' ' + currencySymbol);
            if (qnt) {
                showPreloader();
                $.ajax({
                    type: 'post',
                    url: adminAjax,
                    data: {
                        'action': 'get_place_options_html',
                        'zone_name': val,
                        'event_id': eventID,
                        'selected_places': t.getSelectedPlaces(val),
                    }
                }).done((response) => {
                    if (response) {
                        $placeWrapperSelector.removeClass('not-active');
                        $placeSelect.html(response);
                        $placeSelect.selectric('destroy');
                        $placeSelect.removeClass('selectric-init');
                        selectrickInit();
                    } else {
                        $placeWrapperSelector.addClass('not-active');
                        $placeSelect.prop('selectedIndex', 0).selectric('refresh').change();
                    }
                    hidePreloader();
                });
            }
        });
    }
    getSelectedPlaces(zoneName){

    }
}