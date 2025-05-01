import {detectBrowser, hidePreloader, isHorizontal, isMobile, showPreloader} from "./utils/_helpers";
import {numberInput} from "./forms/_number-input";
import {fancyboxInit, showNotices} from "../plugins/_fancybox-init";

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


    initComponents() {
        let t = this;
        this.$doc.ready(() => {
            hidePreloader();
            numberInput();
            fancyboxInit();
        });

    }
}