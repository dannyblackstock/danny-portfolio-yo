'use strict';

var loadContent = function(href) {
    var htmlRequest;
    var $portfolioContent = $('#contents-container');

    // fade out content
    $portfolioContent.animo({animation: 'fadeOut', duration: 0.5, keep: true, timing: 'ease-in-out'});

    // if the url being looked for isn't empty
    if (href && href !== '' && href !== ' ' && href !== '/'){
        // automatically look in the container_contents folder
        htmlRequest = 'container_contents/' + href + '.html';
    }
    // otherwise, just load the homepage
    else {
        htmlRequest = 'container_contents/work.html';
    }

    $portfolioContent.load(htmlRequest, function(responseText, textStatus) {
        if (textStatus === 'error') {
            // show the 404 page if the page could not be found
            $portfolioContent.load('404.html');
            // history.pushState({title: 'Danny Blackstock | 404'}, 'Danny Blackstock | 404', '404');
            // document.title = history.state.title;
        }

        // fade in loaded content
        $('#contents-container').animo({animation: 'scaleUp', duration: 0.5, timing: 'ease-in-out'});
    });
    console.log(htmlRequest);
};

console.log('document.location.pathname.substring(1): ' + document.location.pathname.substring(1));
// check the url on initial load
if (document.location.pathname.substring(1) !== '' && document.location.pathname.substring(1) !== '/') {
    // load the requested page if the url is not empty
    loadContent(document.location.pathname.substring(1));
}
else {
    // if the url is empty on initial page load, just show the homepage
    loadContent('work');
}

// call replaceState at initial page load so that we can handle the popstate when we get back to the initial page load
// for chrome that calls popstate on initial load
history.replaceState({myTag: true});

// when the user clicks a link
$(document).on('click', 'a, area', function(e) {
    // prevent the normal link click behaviour from happening
    e.preventDefault();

    // load the content based on the href attribute of the link
    var href = $(this).attr('href');

    $('#contents-container').animo({animation: 'fadeOut', duration: 0.3, keep: true, timing: 'ease-in-out'}, function() {
        loadContent(href);
    });

    // add to the history and add some data ('myTag') to ignore the initial load popstate
    history.pushState({myTag: true}, '', href);
    console.log('href: ' + href);
});

// when the user presses the back or forward buttons
$(window).on('popstate', function(e) {
    // for chrome that calls popstate on initial load, check if my tag is present
    if (!e.originalEvent || !e.originalEvent.state.myTag) {
        return; // if it's not, skip
    }
    var returnLocation = history.location || document.location;
    // alert('We returned to the page with a link: ' + returnLocation.href);
    console.log(returnLocation.pathname.substring(1));
    loadContent(returnLocation.pathname.substring(1));
});