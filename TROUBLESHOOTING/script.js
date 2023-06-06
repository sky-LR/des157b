"use strict";

interact('.draggable').draggable({
    inertia: true,
    //  modifiers: [
    //     interact.modifiers.restrictRect({
    //         restriction: 'parent'
    //       })
    //    ],

    listeners: {
        start (event) {
            console.log(event.type, event.target)
            // intro.className = 'slideUp';
            // if(!volToggle){
            //     volumeCtrl.style.height = "70px";
            //     volSlider.className = "hidden";
            //     volToggle = true;
            // }
        },
        move (event) {
            var target = event.target

            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

            target.style.transform = `translate(${x}px, ${y}px)`

            target.setAttribute('data-x', x)
            target.setAttribute('data-y', y)
        }
    }
});