import flatpickr from "flatpickr";

export const flatpickrInit = () => {
    $(document).find('.datepicker:not(.flatpickr-input)').each(function () {
        const $t = $(this);
        $t.flatpickr({
            mode: "range",
            dateFormat: "d.m.Y",
            minDate: "today",
            onChange: function (selectedDates, dateStr, instance) {
                if (selectedDates.length === 2) {
                    $t.closest('form').trigger('submit');
                }
            }
        });
    });


}