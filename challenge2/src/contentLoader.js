
(function (ContentFetcher) {
  'use strict';
  var NO_CONTENT_MESSAGE = '&#x26a0; Content could not be loaded, please try again later';

  // Use getElementsByClassName instead of querySelectorAll as it is more
  // efficient amd meets our usecase
  var accordions = document.getElementsByClassName('accordion');
  for(var i =0; i < accordions.length; i++) {
    var accordionData = setupAccordion(accordions[i]);
    // fire manually to display the first option
    accordionData.accordionOptions[0].click();
  }

  /**
   * Appends the given content
   *
   * @param accordionTitle
   * @param contentHTML
   */
  function appendContentHTML(accordionTitle, contentHTML) {
    var fullHTML = '<div class="accordion-content">' + contentHTML + '</div>';
    accordionTitle.insertAdjacentHTML('afterend', fullHTML);
  }

  /**
   * Function to handle accordion clicks
   *
   * @param accordionTitle
   * @param accordionData
   */
  function handleAccordionChange(accordionTitle, accordionData) {
    // Use index of to figure out which option was clicked
    var accordionOption = accordionData.accordionOptions.indexOf(accordionTitle);
    if (accordionOption > -1 && !accordionData.loaded[accordionOption]) {
      ContentFetcher.fetchContent(accordionOption, function (contentHTML) {
        appendContentHTML(accordionTitle, contentHTML);
        accordionData.loaded[accordionOption] = true;
      }, function() {
        appendContentHTML(accordionTitle, NO_CONTENT_MESSAGE);
        accordionData.loaded[accordionOption] = true;
      });
    }
  }

  /**
   * Sets up all the accordions on the page
   *
   * @param accordion
   */
  function setupAccordion(accordion) {
    // A local representation of DOM state, to avoid querying the DOM every time
    var accordionData = {
      loaded: []
    };
    var accordionOptionNodeList = accordion.getElementsByClassName('accordion-title');
    // convert the live nodelist to Array of options
    accordionData.accordionOptions = Array.prototype.slice.call(accordionOptionNodeList);
    // Add listener to Accordion to listen to bubbled child events
    accordion.addEventListener('click', function (clickEvent) {
      handleAccordionChange(clickEvent.target, accordionData);
    });
    return accordionData;
  }

})(App.ContentFetcher);