$(document).ready(function() {

    // ==============================================================
    // intlTelInput
    // ==============================================================
    $("input.phone").intlTelInput({
        utilsScript: 'js/utils.js',
        defaultCountry: 'auto',
        separateDialCode: false,
        nationalMode: false,
        initialCountry: 'auto',
        geoIpLookup: function(callback) {
            $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                callback(countryCode);
            });
        },
        preferredCountries: ['ua', 'ru', 'by', 'kz']
    });

    // ==============================================================
    // countdown
    // ==============================================================
    $(".simpleCountdown").each(function() {
        var myDate = new Date();

        function returnEndDate(d, h, m) {
            myDate.setDate(myDate.getDate() + d);
            myDate.setHours(myDate.getHours() + h);
            myDate.setMinutes(myDate.getMinutes() + m);
            return myDate;
        }
        var note = $('#note');

        if ($(this).data('cookies') == 'yep') {
            if ($.cookie("timer")) {
                var dateEnd = $.cookie("timer");
            } else {
                var extraDate = $(this).data('extra').split(',');
                var dateEnd = returnEndDate(Number(extraDate[0]), Number(extraDate[1]), Number(extraDate[2]));
                $.cookie("timer", dateEnd, {
                    expires: null
                });
            };
            var ts = new Date(dateEnd);
        } else {
            var staticDate = $(this).data('date').split(',');
            var ts = new Date(Number(staticDate[0]), Number(staticDate[1]), Number(staticDate[2]), Number(staticDate[3]));
        };
        $(this).countdown({
            timestamp: ts
        });

    });

    // ==============================================================
    // slider
    // ==============================================================
    var sliderAuthors = $('.sliderAuthors').lightSlider({
        item: 1,
        slideMargin: 0,
        addClass: '',
        mode: "slide", //fade
        useCSS: true,
        cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
        easing: 'linear', //'for jquery animation',////
        speed: 400, //ms'
        auto: false,
        loop: true,
        pager: true,
        pause: 3500,
        keyPress: true,
        controls: false,
        prevHtml: '<svg width="15" height="28" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0532 27.2416C14.4224 26.8724 14.4224 26.2724 14.0532 25.9032L2.26144 14.1346L14.0532 2.34284C14.4224 1.97363 14.4224 1.37366 14.0532 1.00445C13.684 0.635236 13.084 0.635236 12.7148 1.00445L0.276925 13.4423C0.0923196 13.6269 1.54154e-05 13.8577 1.54184e-05 14.1115C1.54211e-05 14.3423 0.0923197 14.5961 0.276925 14.7807L12.7148 27.2185C13.084 27.6108 13.684 27.6108 14.0532 27.2416Z" fill="#BDBDBD"/></svg>',
        nextHtml: '<svg width="15" height="28" viewBox="0 0 15 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.0532 27.2416C14.4224 26.8724 14.4224 26.2724 14.0532 25.9032L2.26144 14.1346L14.0532 2.34284C14.4224 1.97363 14.4224 1.37366 14.0532 1.00445C13.684 0.635236 13.084 0.635236 12.7148 1.00445L0.276925 13.4423C0.0923196 13.6269 1.54154e-05 13.8577 1.54184e-05 14.1115C1.54211e-05 14.3423 0.0923197 14.5961 0.276925 14.7807L12.7148 27.2185C13.084 27.6108 13.684 27.6108 14.0532 27.2416Z" fill="#BDBDBD"/></svg>',
        enableTouch: true,
        enableDrag: true,
        freeMove: true,
        onBeforeSlide: function (el) {
            $('#current').text(el.getCurrentSlideCount());
            el.find('.embed-responsive').each(function() {
                $(this).html($(this).html());
            });
        },
        responsive: [{
            breakpoint: 767.98,
            settings: {
                controls: true,
                item: 1,
            }
        }]
    });
    $('.sleder_wrapp .arrow-prev').click(function() {
        sliderAuthors.goToPrevSlide();
    });

    $('.sleder_wrapp .arrow-next').click(function() {
        sliderAuthors.goToNextSlide();
    });

    // ==============================================================
    // scrollToSection
    // ==============================================================
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 500, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex',
                                '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });

    // ==============================================================
    // stop video on modal close
    // ==============================================================
    $('body').on('hidden.bs.modal', '.modal', function() {
        var getIframe = $(this).find('iframe');
        var videoURL = getIframe.prop('src');
        getIframe.prop('src', '');
        getIframe.prop('src', videoURL);
    });
    // ==============================================================
    // accordion arrow
    // ==============================================================
    $('.collapse.show').siblings('.card-header').addClass('show');
    $('.accordion .collapse').on('show.bs.collapse', function() {
        $(this).siblings('.card-header').addClass('show');
    });

    $('.accordion .collapse').on('hide.bs.collapse', function() {
        $(this).siblings('.card-header').removeClass('show');
    });
    // ==============================================================
    // play video on click
    // ==============================================================
    $('#play-video').on('click', function(ev) {
        $("#video")[0].src += "&autoplay=1";
        ev.preventDefault();
    });
    // ==============================================================
    // Closes the Responsive Menu on Menu Item Click
    // ==============================================================
    $('.navbar-collapse ul li a.page-scroll').click(function() {
        $('.navbar-toggler:visible').click();
    });
});