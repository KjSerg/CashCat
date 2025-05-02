import {detectBrowser, hidePreloader, isHorizontal, isMobile, showPreloader} from "./utils/_helpers";
import {numberInput} from "./forms/_number-input";
import {fancyboxInit, showNotices} from "../plugins/_fancybox-init";
import {copyLink} from "./ui/_copy-link";

export default class Application {
    constructor() {
        this.$doc = $(document);
        this.$body = $("body");
        this.parser = new DOMParser();
        this.init();
    }

    init() {
        this.initBrowserAttributes();
        this.initComponents();
    }

    initBrowserAttributes() {
        const browserName = detectBrowser();
        this.$body.attr("data-browser", browserName).addClass(browserName);
        $(window).on('load resize', (e) => {
            const attr = window.innerWidth > window.innerHeight ? 'horizontal' : 'vertical'
            this.$body.attr("data-screen-position", attr);
            this.$body.attr("data-mobile", isMobile ? "mobile" : '');
        });
    }

    showQR(){

        this.$doc.on('click', '.order-qr__button', function (e){
            e.preventDefault();
            const $t = $(this);
            const $modal = $t.closest('.modal-order')
            $t.hide();
            $modal.find('.order-link-container').slideDown();
            $modal.find('.order-qr').addClass('active');
        });
    }


    initComponents() {
        let t = this;
        this.$doc.ready(() => {
            hidePreloader();
            numberInput();
            fancyboxInit();
            copyLink();
            t.showQR();
        });

    }
}