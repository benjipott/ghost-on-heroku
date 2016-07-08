/*jslint browser:true, unparam:true*/
/*global $, FastClick, hljs*/

$(function () {

    'use strict';

// French timeAgo
    jQuery.timeago.settings.strings = {
        // environ ~= about, it's optional
        prefixAgo: "il y a",
        prefixFromNow: "d'ici",
        seconds: "moins d'une minute",
        minute: "environ une minute",
        minutes: "environ %d minutes",
        hour: "environ une heure",
        hours: "environ %d heures",
        day: "environ un jour",
        days: "environ %d jours",
        month: "environ un mois",
        months: "environ %d mois",
        year: "un an",
        years: "%d ans"
    };

    // Execute FastClick.js
    FastClick.attach(document.body);

    // Expanded article images
    $('article img').parent().addClass('article-image');

    // Custom transform and opacity modifier for Stellar.js
    $.stellar.positionProperty.transfade = {
        setPosition: function (element, newLeft, originalLeft, newTop, originalTop) {
            var distance = newTop - originalTop,
                rate = $('header').height() / 5;
            element.css('transform', 'translate3d(0, ' + distance + 'px, 0').css('opacity', 1 - (distance / rate));
        }
    };
    //Detect mobile
    var ua = navigator.userAgent,
        isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

    // Execute Stellar.js
    $.stellar({
        horizontalScrolling: false,
        positionProperty: 'transfade',
        parallaxBackgrounds: !isMobileWebkit,
        verticalOffset: 50,
        hideDistantElements: false
    });

    // Execute Highlight.js
    hljs.initHighlightingOnLoad();

    // Social sharing links
    //$('#twitter').click(function () {
    //    window.open(this.href, 'twitter-share', 'width=550,height=235');
    //    return false;
    //});

    $('#facebook').click(function () {
        window.open(this.href, 'facebook-share', 'width=580,height=296');
        return false;
    });

    $('#google-plus').click(function () {
        window.open(this.href, 'google-plus-share', 'width=490,height=530');
        return false;
    });

    //responsive video
    $('article').fitVids();

    $('.related-posts').ghostRelated({
        feed: '/rss',
        titleClass: '.post-title',
        tagsClass: '.post-meta',
        limit: 4,
        debug: false
    });

    $('.menu-button, .nav-cover, .nav-close').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('nav-opened nav-closed');
    });

    // target blank link outside url
    $(document.links).filter(function () {
        return this.hostname != window.location.hostname;
    }).attr('target', '_blank');

});
