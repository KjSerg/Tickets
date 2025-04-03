import flatpickr from "flatpickr";

export const flatpickrInit = () => {
    document.querySelectorAll('.datepicker').forEach(function (element) {
        flatpickr(element, {
            mode: "range",
            dateFormat: "d.m.Y",
            minDate: "today",
            onValueUpdate: function (selectedDates, dateStr, instance) {
                console.log(selectedDates)
                console.log(dateStr)
                console.log(instance)
            }
        });
    })

}