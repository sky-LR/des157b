(function(){
    console.log('reading JS');
    "use strict";

    const volumeCtrl = document.querySelector("#volumeCtrl");
    const volSlider = document.querySelector("#volSlider");
    const jumpTo = document.querySelector('#jumpTo');
    let volToggle = true;
    let jumpToggle = true;

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

}());