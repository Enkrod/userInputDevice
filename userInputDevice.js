/*!
 * userInputDetect (UID) v1.1
 * @author: S.Wolfertz
 *
 * Builds an object that stores our configuration and functions for everything touch.
 * Works it"s magic(*) on unsorted lists with links, should be updated to become something similar to MQR in the future.
 * Using this instead of Device-Detection-Fuckery means we are certain how the user wants to interact.
 * Because the future can bring laptops or even desktops with touch and touchpads with a mouse and device-detection is
 * chronically unreliable.
 *
 * (magic): Turns every ul containing a"s into touch-to-open menus.
 */
var userInputDetect = {
    // Assume all devices = false until one is detected
    touch: false,
    hover: false
};

// We don"t need to find out if the device we are on supports touch,
// we only need to know if the user touches something
userInputDetect.init = function(selector) {

    // store the selector
    userInputDetect.selector = selector;

    // On the first touch remember touch is used
    window.addEventListener("touchstart", function onFirstTouch() {
        document.body.classList.add("userInputTouch");
        userInputDetect.touch = true;
        // we only need to know once that a human touched the screen, so we can stop listening now
        window.removeEventListener("touchstart", onFirstTouch, false);
    }, false);

    // On the first mouseover remember hover is used
    // Watch out: Some touch devices might send an additional hover-event on touching something
    // so always check for userInputDetect.hover AND NOT userInputDetect.touch
    window.addEventListener("mouseover", function onFirstHover() {
        document.body.classList.add("userInputHover");
        userInputDetect.hover = true;
        // we only need to know once that a mouse hovered, so we can stop listening now
        window.removeEventListener("mouseover", onFirstHover, false);
    }, false);

    // Find all the links and give them touch-to-show-behaviour
    userInputDetect.anchors = $(userInputDetect.selector).find("a");
    userInputDetect.anchors.on("click", function(event) {
        var anchor = $(this);
        var listNode = anchor.closest("li");
        if (userInputDetect.touch && listNode.children("ul").length > 0 ) {
            // If the list was opened, follow the links, else open the list
            if (!listNode.hasClass("touchOpened")) {
                event.preventDefault();
                listNode.addClass("touchOpened");
            } else {
                listNode.removeClass("touchOpened");
            }
        }
    });
    userInputDetect.anchors.on("blur",function(){
        $(this).closest("li").removeClass("touchOpened");
    });
    console.log(userInputDetect);
};