console.log('\'Allo \'Allo!');

$(document).ready( function(){
    'use strict';

    $('#content-container').load('main_page_contents.html', function() {
        console.log('main_page_contents.html was loaded');
    });

    $('.hero-unit').click( function() {
        window.location.hash = 'portfolio_item_contents.html';
    });
});

$(window).on('hashchange', function() {
    'use strict';

    // get hash
    var hash = window.location.hash.substring(1);
    console.log('hash changed to ' + hash);

    // check hash
    if (hash === '')
    {
        $('#content-container').load('main_page_contents.html', function() {
            console.log('main_page_contents.html was loaded');
        });
    }

    else if (hash === 'portfolio_item_contents.html')
    {
        $('#content-container').load('portfolio_item_contents.html', function() {
            console.log('portfolio_item_contents.html was loaded');
            window.location.hash = 'portfolio_item_contents.html';
        });
    }
});