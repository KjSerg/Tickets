import {$document, hidePreloader, isJsonString, showPreloader} from "../utils/_helpers";
import {selectrickInit} from "../../plugins/_selectric-init";
import {catalogFilterInit} from "./_catalog-filter";
import {showMsg} from "../../plugins/_fancybox-init";

export class Checkout {
    constructor() {
        this.$document = $document;
        this.initialize();
        this.selectInit();
    }

    initialize() {
        const t = this;
        this.$document.on('change', 'input[name="delivery_method"]', function () {
            t.setTotal()
        });
        this.$document.on('change', 'input[name="payment_method"]', function () {
            t.setTotal()
        });
        $document.on('click', '.checkout-ticket-add__button', function (e) {
            e.preventDefault();
            const $t = $(this);
            let href = $t.attr('href');
            if (href === undefined) return;
            if (href === '#') return;
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
        $document.on('click', '.checkout-ticket-remove', function (e) {
            e.preventDefault();
            const $t = $(this);
            const $rows = $document.find('.checkout-ticket');
            if ($rows.length <= 1) return;
            $t.closest('.checkout-ticket').remove();
            t.setTotal();
        });
        t.setTotal();
        t.initPromo();
    }

    selectInit() {
        const t = this;
        t.$document.on('change', '.select-zone-js', function () {
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
            t.setTotal();
            $placeSelect.prop('selectedIndex', 0).selectric('refresh').change();
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
                    if($placeSelect.find('option').length > 1){
                        $placeSelect.attr('required', 'required');
                        $placeSelect.selectric('destroy');
                        $placeSelect.removeClass('selectric-init');
                        selectrickInit();
                    }else {
                        $placeSelect.removeAttr('required');
                        $placeWrapperSelector.addClass('not-active');
                        $placeWrapperSelector.removeClass('error');
                        $placeSelect.prop('selectedIndex', 0).selectric('refresh').change();
                    }


                } else {
                    $placeWrapperSelector.addClass('not-active');
                    $placeSelect.prop('selectedIndex', 0).selectric('refresh').change();
                }
                hidePreloader();
            });
        });
        t.$document.on('change', '.select-place-js', function () {
            const $t = $(this);
            const val = $t.val();
            const $_ticket = $t.closest('.checkout-ticket');
            const $zoneSelect = $_ticket.find('.select-zone-js');
            const zone = $zoneSelect.val();
            console.log(val)
            if(val === 'false') return;
            t.$document.find('.checkout-ticket').not($_ticket).each(function () {
                const $ticket = $(this);
                const $zone = $ticket.find('.select-zone-js');
                if ($zone.val() === zone) {
                    const $place = $ticket.find('.select-place-js');
                    if ($place.val() === val) {
                        $ticket.find('.checkout-ticket-remove').trigger('click');
                    }
                }
            });
        });
    }

    getTicketPrices() {
        let subSum = 0;
        this.$document.find('.checkout-ticket').each(function () {
            const $ticket = $(this);
            const $zone = $ticket.find('.select-zone-js');
            if ($zone.val()) {
                const $option = $zone.find('option:selected');
                let price = $option.attr('data-price') || 0;
                price = Number(price);
                subSum = subSum + price;
            }
        });
        return subSum;
    }

    getShippingPrice() {
        const $selected = this.$document.find('input[name="delivery_method"]:checked');
        let price = $selected.attr('data-price') || 0;
        return Number(price);
    }

    getPaymentPrice() {
        const $selected = this.$document.find('input[name="payment_method"]:checked');
        let price = $selected.attr('data-price') || 0;
        return Number(price);
    }

    setTotal() {
        const t = this;
        const tickets = t.getTicketPrices();
        const payment = t.getPaymentPrice();
        const delivery = t.getShippingPrice();
        let total = tickets + payment + delivery + (serviceFees || 0);
        t.$document.find('.tickets-price').text(tickets.toFixed(2) + ' ' + currencySymbol);
        t.$document.find('.delivery-price').text(delivery.toFixed(2) + ' ' + currencySymbol);
        t.$document.find('.payment-price').text(payment.toFixed(2) + ' ' + currencySymbol);
        t.$document.find('.total-price').text(total.toFixed(2) + ' ' + currencySymbol);
        let discount = localStorage.getItem('discountValue');
        if (!discount) return;
        discount = Number(discount);
        if (isNaN(discount) || discount === 0) return;
        total = total - discount;
        t.$document.find('.total-price').text(total.toFixed(2) + ' ' + currencySymbol);
        t.$document.find('.promo-code-js').val(localStorage.getItem('discountTitle'));
    }

    getSelectedPlaces(zoneName = '') {
        let res = [];
        this.$document.find('.checkout-ticket').each(function () {
            const $ticket = $(this);
            const $zone = $ticket.find('.select-zone-js');
            if ($zone.val() === zoneName) {
                const $place = $ticket.find('.select-place-js');
                if ($place.val()) res.push($place.val());
            }
        });
        return res.join(',');
    }

    initPromo() {
        const t = this;
        $document.on('click', '.checkout-promo__button', function (e) {
            e.preventDefault();
            const $t = $(this);
            const $input = $document.find('.promo-code-js');
            if ($input.val().trim().length === 0) {
                $input.addClass('error');
                return;
            }
            $input.removeClass('error');
            showPreloader();
            $.ajax({
                type: 'post',
                url: adminAjax,
                data: {
                    'action': 'set_promo_code',
                    'promo_code': $input.val(),
                    'event_id': $input.attr('data-event-id'),
                }
            }).done((response) => {
                if (response) {
                    if (isJsonString(response)) {
                        const data = JSON.parse(response);
                        const discount = data.discount || 0;
                        const msg = data.msg || '';
                        if (msg) showMsg(msg);
                        localStorage.setItem('discountValue', discount);
                        localStorage.setItem('discountTitle', $input.val());
                        t.setTotal();
                    } else {
                        showMsg(response);
                    }
                }
                hidePreloader();
            });
        });
    }
}