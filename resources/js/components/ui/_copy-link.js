import {copyToClipboard} from "../utils/_helpers";
import {showMsg} from "../../plugins/_fancybox-init";

export const copyLink = () => {
    $(document).on('click', '.copy-button-js', function (e) {
        e.preventDefault();
        const $this = $(this);
        let text = $this.attr('data-copy');
        if (text === undefined) text = $this.attr('href');
        copyToClipboard(text);
        showMsg('', 'copied');
    });
}