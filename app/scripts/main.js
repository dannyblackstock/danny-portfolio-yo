'use strict';
console.log('\'Allo \'Allo!');

function loadPortfolioItemContent(filename) {
    $('#work-container').hide();
    $('#portfolio-item-page-container').show(); // show the container

    $('#portfolio-item-contents-container').load(filename, function() {
        console.log(filename + ' was loaded');
    });
}

function checkHashAndLoad() {
    // get hash

    var hash = window.location.hash.substring(1);
    console.log('hash is now: ' + hash);

    // check hash
    if (hash === '')
    {
        $('#portfolio-item-page-container').hide();
        $('#work-container').show();
    }

    // if not on the homepage, show the portfolio item contents container

    else if (hash === 'wayfinding') {
        loadPortfolioItemContent('wayfinding.html');
    }

    else if (hash === 'demo_reel') {
        loadPortfolioItemContent('demo_reel.html');
    }
}

$(document).ready( function(){

    checkHashAndLoad();

    $('#wayfinding-button').click( function() {
        window.location.hash = 'wayfinding';
    });

    $('#demo-reel-button').click( function() {
        window.location.hash = 'demo_reel';
    });

    $('#close-portfolio-item').click( function() {
        window.location.hash = '';
    });
});

$(window).on('hashchange', function() {
    checkHashAndLoad();
});