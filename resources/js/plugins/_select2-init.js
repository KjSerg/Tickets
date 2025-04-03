import $ from "jquery";
import "select2";

// Підключаємо стилі
import "select2/dist/css/select2.min.css";

// Ініціалізація Select2

export const select2Init = () => {
    $(document).ready(function () {
        $(".select2-init").select2();
    });
}

