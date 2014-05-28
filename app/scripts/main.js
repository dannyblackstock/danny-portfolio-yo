'use strict';

var loadContent = function(href, animationOutStyle, animationInStyle, animationOutDuration, animationInDuration) {
    var htmlRequest;
    // default values for animatin styles
    animationOutStyle = typeof animationOutStyle !== 'undefined' ? animationOutStyle : 'fadeOut';
    animationInStyle = typeof animationInStyle !== 'undefined' ? animationInStyle : 'fadeIn';
    animationOutDuration = typeof animationOutDuration !== 'undefined' ? animationOutDuration : 0.4;
    animationInDuration = typeof animationInDuration !== 'undefined' ? animationInDuration : 0.4;

    // if the url being looked for isn't empty
    if (href && href !== '' && href !== ' ' && href !== '/'){
        // automatically look in the container_contents folder
        htmlRequest = 'container_contents/' + href + '.html';
    }
    // otherwise, just load the homepage
    else {
        htmlRequest = 'container_contents/work.html';
        animationOutStyle = 'scaleDownOut';
        animationInStyle = 'scaleDownIn';
    }

    $('#contents-container').animo({animation: animationOutStyle, duration: animationOutDuration, keep: true, timing: 'ease-in-out'}, function() {

        $('html,body').scrollTop(0);

        $('#contents-container').load(htmlRequest, function(responseText, textStatus) {

            if (textStatus === 'error') {
                // show the 404 page if the page could not be found
                $('#contents-container').load('404.html');
                animationInStyle = 'rotateIn';
                animationInDuration = 0.8;
                // history.pushState({title: 'Danny Blackstock | 404'}, 'Danny Blackstock | 404', '404');
                // document.title = history.state.title;
            }

            // fade in loaded content
            $('#contents-container').animo({animation: animationInStyle, duration: animationInDuration, timing: 'ease-in-out'});
        });
        console.log(htmlRequest);
    });
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
    var href = $(this).attr('href');
    console.log('href: ' + href);

    var arr = href.split('/');
    // var result = arr[0] + '//' + arr[2];

    // if it is an external link, then open it in a new tab/window
    if ((arr[2])) {
        var win = window.open(href, '_blank');
        if(win){
            //Browser has allowed it to be opened
            win.focus();
        }
        else{
            //Browser has blocked it
            alert('Please allow popups for this site.');
        }
    }

    // if it's a 'mailto' link
    else if (href.indexOf('mailto:') > -1) {
        // open it
        window.location.href = href;
    }

    // if it's a pdf link
    else if (href.indexOf('.pdf') > -1) {
        // open it
        var win = window.open(href, '_blank');
        if(win){
            //Browser has allowed it to be opened
            win.focus();
        }
        else{
            //Browser has blocked it
            alert('Please allow popups for this site.');
        }
    }

    // otherwise, it's an internal, relative link.
    else {
        // add to the history and add some data ('myTag') to ignore the initial load popstate
        history.pushState({myTag: true}, '', href);

        // check if the link is a navigation arrow in the class name, so a slide transition can be used instead.
        if (($(this).attr('class')) && ($(this).attr('class').indexOf('right-arrow') > -1)) {
            loadContent(href, 'slideOutLeft');
        }

        else if (($(this).attr('class') && $(this).attr('class').indexOf('left-arrow') > -1)) {
            loadContent(href, 'slideOutRight');
        }

        else {
            // load the content based on the href attribute of the link
            loadContent(href);
        }
    }
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

// $(window).scroll(function() {
//     if($(window).scrollTop() >= 40) {
//         $('#top-navbar').addClass('viewing-content');
//     }
//     else {
//         $('#top-navbar').removeClass('viewing-content');
//     }
// });