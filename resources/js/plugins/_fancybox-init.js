import $ from 'jquery';

window.$ = $;
window.jQuery = $;
import '@fancyapps/fancybox';

export const fancyboxInit = () => {
    $('[data-fancybox]').fancybox({
        placeFocusBack: false, backFocus: false
    });
    $(document).on('click', '.fancybox', function (e) {
        e.preventDefault();
        const $t = $(this);
        const href = $t.attr('href');
        if (href === undefined) return;
        const $el = $(document).find(href);
        if ($el.length === 0) return;
        console.log($el)
        $.fancybox.open($el, {
            touch: false
        });
    });
    $(document).on('click', '.close-fancybox-modal', function (e) {
        e.preventDefault();
        $.fancybox.close();
    });
};

export function showMsg($msg) {
    $.fancybox.open($msg);
    setTimeout(function () {
        $.fancybox.close();
    }, 3000);
}