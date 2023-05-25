(function(){
    console.log('reading JS');
    "use strict";

    const volumeCtrl = document.querySelector("#volumeCtrl");
    const volSlider = document.querySelector("#volSlider");
    const jumpTo = document.querySelector('#jumpTo');
    const seal = document.querySelector("#seal")
    let volToggle = true;
    let jumpToggle = true;
    let bgPos = [-2500, 400];
    let prevBgPos = [-2500, 400];
    let clientPos = [0,0];
    let prevClientPos = [0,0];

    const position = { x: 0, y: 0 }

    interact('.draggable').draggable({
        listeners: {
            start (event) {
                console.log(event.type, event.target)
            },
            move (event) {
                position.x += event.dx
                position.y += event.dy
                event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
            },
        }
    });


    document.querySelector("#continueBtn").addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector("#headphoneAlert").className = "hidden";
        document.querySelector("#intro").className = "showing";
        document.querySelector("main").className = "showing";
    })

    volumeCtrl.addEventListener("click", function(){
        console.log('clicked');
    
        if (volToggle){
            volumeCtrl.style.height = "300px";
            volSlider.className = "showing";
        } else {
            volumeCtrl.style.height = "70px";
            volSlider.className = "hidden";
        };

        volToggle = !volToggle;
    });

    jumpTo.addEventListener("click", function(){
        console.log('clicked');
    
        if (jumpToggle){
            jumpTo.style.height = "300px";
        } else {
            jumpTo.style.height = "70px";
        };

        jumpToggle = !jumpToggle;
    });

    // document.addEventListener('touchmove', function(event){

    //     // bgPos[0] = prevBgPos[0] + (prevClientPos[0] - (event.touches[0].clientX - (window.innerWidth / 2)));
    //     // console.log(prevClientPos[0] - event.touches[0].clientX);
    //     // bgPos[1] = prevBgPos[1] + (prevClientPos[1] - (event.touches[0].clientY - (window.innerHeight / 2)));

    //     bgPos[0] = prevBgPos[0] + (event.touches[0].clientX - prevClientPos[0]);
    //     bgPos[1] = prevBgPos[1] + (event.touches[0].clientY - prevClientPos[1]);

    //     seal.style.backgroundPosition = `${bgPos[0]}px ${bgPos[1]}px`

    //     // console.log(event.touches[0].clientX - prevClientPos[0]);

    //     console.log("bgPos is" + bgPos);

    //     console.log("prevbgPos is" + prevBgPos);

    //     prevBgPos[0] = bgPos[0];
    //     prevBgPos[1] = bgPos[1];

    //     prevClientPos[0] = event.touches[0].clientX;
    //     prevClientPos[1] = event.touches[0].clientY;
    // });

    // document.addEventListener('touchend', function(event){
    //     prevBgPos[0] = bgPos[0];
    //     prevBgPos[1] = bgPos[1];
    // });

}());