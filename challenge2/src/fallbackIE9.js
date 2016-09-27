(
  /**
 * Manually moves code for browsers which do not support flex, IE 9 in our case
 */
  function setupFlexBackup() {
    'use strict';
    var accordion = document.getElementsByClassName('accordion')[0];
    var accordionOptionNodeList = accordion.getElementsByClassName('accordion-title');
    var firstChild = accordion.firstChild;
    for (var i = 0; i < accordionOptionNodeList.length; i++) {
      var accordionLargeScreenOption = accordionOptionNodeList[i].cloneNode(true);
      accordionLargeScreenOption.className = 'accordion-title-large';
      accordion.insertBefore(accordionLargeScreenOption, firstChild);
    }
})();