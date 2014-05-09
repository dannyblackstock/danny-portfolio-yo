'use strict';

var $portfolioContent = $('#contents-container');

var loadContent = function(href) {
    var htmlRequest;

    if (href && href !== '' && href !== ' ' && href !== '/'){
        htmlRequest = 'container_contents/' + href + '.html';
    }
    else {
        htmlRequest = 'container_contents/work.html';
    }

    $portfolioContent.load(htmlRequest, function(responseText, textStatus) {
        if (textStatus === 'error') {
            $portfolioContent.load('404.html');
            // history.pushState({title: 'Danny Blackstock | 404'}, 'Danny Blackstock | 404', '404');
            // document.title = history.state.title;
        }
    });
    console.log(htmlRequest);
};

console.log('document.location.pathname.substring(1): ' + document.location.pathname.substring(1));
if (document.location.pathname.substring(1) !== '' && document.location.pathname.substring(1) !== '/') {
    // load the requested page
    loadContent(document.location.pathname.substring(1));
}
else {
    loadContent('work');
}
// call replaceState at page load so that we can handle the popstate when we get back to the initial page load
// for chrome that calls popstate on initial load
history.replaceState({myTag: true});

// when the user clicks a link
$('a, area').click( function(e) {
    e.preventDefault();
    var href = $(this).attr('href');
    loadContent(href);
    history.pushState({myTag: true}, '', href);
    console.log('href: ' + href);
});

$(window).on('popstate', function(e) {
    // for chrome that calls popstate on initial load, check if my tag is present
    if (!e.originalEvent.state.myTag) return; // if it's not, skip
    var returnLocation = history.location || document.location;
    // alert('We returned to the page with a link: ' + returnLocation.href);
    console.log(returnLocation.pathname.substring(1));
    loadContent(returnLocation.pathname.substring(1));
});