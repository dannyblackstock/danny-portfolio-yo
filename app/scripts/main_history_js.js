'use strict';


var loadPortfolioContent = function(href) {
    var htmlRequest = 'portfolio_item_contents/' + href + '.html';
    $('#portfolio-item-contents-container').show().load(htmlRequest);
    console.log(htmlRequest);
};

var hidePortfolioContent = function () {
    $('#portfolio-item-contents-container').hide();
};

// on script load, if the url is not empty, load the requested page
if (document.location.pathname.substring(1)) {
    loadPortfolioContent(document.location.pathname.substring(1));
}

// when the user clicks a link
$('a, area').click( function(e) {
    //
    e.preventDefault();
    var href = $(this).attr('href');

    history.pushState({data:'data is here!'}, '', href);
    loadPortfolioContent(href);

    console.log('href: ' + href);
});

$(window).on('popstate', function(e) {
    if (e.originalEvent) {
        if (e.originalEvent.state !== 'undefined' && e.originalEvent.state !== null) {
            var returnLocation = history.location || document.location;
            // alert('We returned to the page with a link: ' + returnLocation.href);
            console.log(returnLocation.pathname.substring(1));
            loadPortfolioContent(returnLocation.pathname.substring(1));
        }
        else {
            hidePortfolioContent();
        }
    }
});
