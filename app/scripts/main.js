console.log('\'Allo \'Allo!');

$(document).ready( function(){
    'use strict';

    $('#content-container').load('main_page_contents.html', function() {
        console.log('main_page_contents.html was loaded');
    });

    $('.hero-unit').click( function() {
        $('#content-container').load('portfolio_item_contents.html', function() {
            console.log('portfolio_item_contents.html was loaded');
        });
    });
});