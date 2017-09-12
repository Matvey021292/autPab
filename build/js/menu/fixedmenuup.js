jQuery(window).scroll(function() { 
    var the_top = jQuery(document).scrollTop();
    if (the_top > 20) {
        jQuery('#menufixed').addClass('fixed');
    }
    else {
        jQuery('#menufixed').removeClass('fixed');
    }
});