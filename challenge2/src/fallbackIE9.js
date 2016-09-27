(/**
 * Manually moves code for browsers which do not support flex, IE 9 in our case
 * Tested using IE 9 emulation
 */
  function () {
   'use strict';
    var CHECKED_CLASS = ' accordion-title--checked';
    setupFlexBackup();

    /**
     * Toggles the checked class
     * @param targetTitle
     * @param accordionLargeScreenTitleArr
     */
    function toggleClass(targetTitle, accordionLargeScreenTitleArr) {
      accordionLargeScreenTitleArr.forEach(function (accordionLargeScreenTitle) {
        // IE 9 does not support classlist
        var hasCheckedClass = accordionLargeScreenTitle.className.indexOf(CHECKED_CLASS) > -1;
        if (accordionLargeScreenTitle === targetTitle && !hasCheckedClass) {
          accordionLargeScreenTitle.className += CHECKED_CLASS;
        }
        if (accordionLargeScreenTitle !== targetTitle && hasCheckedClass) {
          accordionLargeScreenTitle.className = accordionLargeScreenTitle.className.replace(CHECKED_CLASS, '');
        }
      });
    }

  /**
   * handles Accordion click
   * @param click
   * @param accordionTitleArr
   * @param accordionLargeScreenTitleArr
   */
    function handleAccordionClick(click, accordionTitleArr, accordionLargeScreenTitleArr) {
      var target = click.target;
      var targetIndex = accordionLargeScreenTitleArr.indexOf(target);
      // Pass to original target to load ajax content
      if (targetIndex > -1) {
        accordionTitleArr[targetIndex].click();
        // Manually add checked class
        toggleClass(target, accordionLargeScreenTitleArr);
      }
    }

    /**
     * Manually sets up flex backup
     */
    function setupFlexBackup() {
      var accordion = document.getElementsByClassName('accordion')[0];
      // We need querySelectorAll as we need static node list
      var accordionTitleArr = Array.prototype.slice.call(accordion.getElementsByClassName('accordion-title'));
      var accordionLargeScreenTitleArr = [];
      var firstChild = accordion.firstChild;
      accordionTitleArr.forEach(function (accordionTitle) {
        var accordionLargeScreenTitle = accordionTitle.cloneNode(true);
        accordionLargeScreenTitleArr.push(accordionLargeScreenTitle);
        accordionLargeScreenTitle.className = 'accordion-title-large';
        accordion.insertBefore(accordionLargeScreenTitle, firstChild);
      });
      accordion.addEventListener('click', function(click) {
        handleAccordionClick(click, accordionTitleArr, accordionLargeScreenTitleArr);
      });
  }
})();