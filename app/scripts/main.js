console.log('\'Allo \'Allo!');

function loadContentFromHash() {
    // get hash
    'use strict';

    var hash = window.location.hash.substring(1);
    console.log('hash is now: ' + hash);

    // check hash
    if (hash === '')
    {
        $('#ajax-content-container').load('main_page_contents.html', function() {
            console.log('main_page_contents.html was loaded');
        });
    }

    else if (hash === 'portfolio_item_contents.html')
    {
        $('#ajax-content-container').load('portfolio_item_contents.html', function() {
            console.log('portfolio_item_contents.html was loaded');
            window.location.hash = 'portfolio_item_contents.html';
        });
    }
}

$(document).ready( function(){
    'use strict';

    loadContentFromHash();

    $('#logo').click( function() {
        window.location.hash = 'portfolio_item_contents.html';
    });
});

$(window).on('hashchange', function() {
    'use strict';
    loadContentFromHash();
});