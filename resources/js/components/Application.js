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
            const $modal = $t.closest('.modal');
            $t.slideUp();
            $modal.find('.order-link-container').slideDown();
            $modal.find('.order-qr').addClass('active');
        });

    }

    historyTableBodySetHeight() {
        $(window).on('load resize', function (){
            const $body = $(document).find('.history-table-body');
            if($body.length === 0) return;
            const $head = $(document).find('.wallet-head');
            const $title = $(document).find('.history__title');
            const $headTable = $(document).find('.history-table-head');
            const headHeight = $head.outerHeight(true);
            const titleHeight = $title.outerHeight(true);
            const headTableHeight = $headTable.outerHeight(true);
            const windowHeight = $(window).height();
            const navHeight = 180;
            const bodyHeight = windowHeight - (headHeight + titleHeight + headTableHeight +navHeight);
            $body.height(bodyHeight);
        });
    }
    friendsTableBodySetHeight() {
        $(window).on('load resize', function (){
            const $body = $(document).find('.friends-table-body');
            if($body.length === 0) return;
            const $head = $(document).find('.friends-link');
            const $boxes = $(document).find('.box');
            const $title = $(document).find('.friends__title');
            const headHeight = $head.outerHeight(true);
            const titleHeight = $title.outerHeight(true);
            let boxesHeight = 0;
            $boxes.each(function (){
                boxesHeight += $(this).outerHeight(true);
            });
            console.log(boxesHeight)
            const windowHeight = $(window).height();
            const navHeight = 180;
            const bodyHeight = windowHeight - (headHeight + titleHeight + boxesHeight +navHeight);
            $body.css('max-height', bodyHeight);
        });
    }


    initComponents() {
        let t = this;
        t.historyTableBodySetHeight();
        t.friendsTableBodySetHeight();
        this.$doc.ready(() => {
            hidePreloader();
            numberInput();
            fancyboxInit();
            copyLink();
            t.showQR();
        });

    }
}