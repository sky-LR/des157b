

// --------THIS IS ALL THE WORK I DID TO TRY TO MAKE THIS DRAGGABLE BEFORE I GAVE UP AND USED A LIBRARY--------
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

// --------THESE ARE USEFUL PIECES OF MATH I DID TO FIND THE DIV'S POSITION--------
// div distance from center on y axis is ((-Math.abs(((window.innerHeight/2) - divOffset.top)/(window.innerHeight/2)))+1)
//x axis is ((-Math.abs(((window.innerWidth/2) - divOffset.left)/(window.innerWidth/2)))+1)
// AVERAGE OF BOTH ((((-Math.abs(((window.innerWidth/2) - divOffset.left)/(window.innerWidth/2)))+1)+((-Math.abs(((window.innerHeight/2) - divOffset.top)/(window.innerHeight/2)))+1))/2)

"use strict";

//makes fullscreen on mobile
const pageHeight = function() {
    const doc = document.documentElement;
    doc.style.setProperty('--page-height', `${window.innerHeight}px`);
    console.log(`innerHeight: ${window.innerHeight}px`);
    console.log(`visualViewport: ${visualViewport.height}`);
}

//all global vars
    const volumeCtrl = document.querySelector("#volumeCtrl");
    const volSlider = document.querySelector("#volSlider");
    const jumpTo = document.querySelector('#jumpTo');
    const jumpOptions = document.querySelector('#jumpOptions');
    const info = document.querySelector('#info');
    const intro = document.querySelector('#intro');
    const seal = document.querySelector("#seal");
    const sealDivs = document.querySelectorAll("#seal div");
    const visualizer = document.querySelector('#visualizer');
    const sealPosition = { x: 0, y: 0 }

    let volToggle = true;
    let jumpToggle = true;
    let bgPos = [-2500, 400];
    let prevBgPos = [-2500, 400];
    let clientPos = [0,0];
    let prevClientPos = [0,0];
    let divOffset;
    let sounds;
    let divDistance;
    let divXDist;
    let divYDist;
    let amp;

//preloads all sounds
    function preload(){
        sounds = [
            loadSound("sounds/water.mp3"), 
            loadSound("sounds/birds2.mp3"),
            loadSound("sounds/frogs.mp3"),
            loadSound("sounds/bike1.mp3"),
            loadSound("sounds/duck.mp3"),
            loadSound("sounds/middle.mp3"),
            loadSound("sounds/wagon.mp3"),
            loadSound("sounds/children.mp3"),
            loadSound("sounds/bike2.mp3"),
            loadSound("sounds/train.mp3"),
            loadSound("sounds/crowd.mp3"),
            loadSound("sounds/truck.mp3"),
            loadSound("sounds/bats.mp3")
        ];
    };

//gets around chrome's autoplay rules
    function setup() {
        createCanvas(0,0);
        getAudioContext().suspend();
        outputVolume(parseFloat(volSlider.value));
        amp = new p5.Amplitude();
    }

    function draw(){
        visualizer.style.transform = `scale(${amp.getLevel() * 100})`;
    }

    function mousePressed() { 
        console.log(amp.getLevel());
        userStartAudio();
    }

//gets rid of heaphone alert
    document.querySelector("#continueBtn").addEventListener("click", function(e){
    e.preventDefault();
    document.querySelector("#headphoneAlert").className = "disappear";
    document.querySelector("#intro").className = "slideDown";
    document.querySelector("main").className = "appear";
})

//makes the seal draggable using interact library
    interact('.draggable').draggable({
        
        inertia: true,

         modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent'
              })
           ],

        listeners: {
            start (event) {
                console.log(event.type, event.target)
                intro.className = 'slideUp';
                if(!volToggle){
                    volumeCtrl.style.height = "70px";
                    volSlider.className = "hidden";
                    volToggle = true;
                }
            },
            move (event) {
                sealPosition.x += event.dx
                sealPosition.y += event.dy
                event.target.style.transform = `translate(${sealPosition.x}px, ${sealPosition.y}px)`
                setDivVolumes();
            }
        }
    });

//makes the sounds change volume and pan based on their div's distance from the center
    function setDivVolumes(){
        for (let i = 0; i < sealDivs.length; i++) {

            divOffset = sealDivs[i].getBoundingClientRect();

            //stores a 0-1 value for how close the div is to the center on each axis
            divXDist = ((-Math.abs(((window.innerWidth/2) - divOffset.left)/(window.innerWidth/2)))+1);
            divYDist = ((-Math.abs(((window.innerHeight/2) - divOffset.top)/(window.innerHeight/2)))+1);
            

            if (divOffset.top < window.innerHeight && divOffset.top > 0 && divOffset.left < window.innerWidth && divOffset.left > 0 ){
                if (!sounds[i].isPlaying()){
                    sounds[i].loop();
                }
                //the function that
                divDistance = Math.sqrt(divXDist*divYDist);

                sounds[i].pan(-(((window.innerWidth/2) - divOffset.left)/(window.innerWidth/2))/3);
                sounds[i].setVolume(divDistance - 0.1, 0.2, 0);
            } else {
                sounds[i].setVolume(0);
                sounds[i].pause();
            }

        };
    }

//sets output volume
    volSlider.addEventListener("change", function() {
        outputVolume(parseFloat(volSlider.value));
    })

//adds functionality for all HUD elements
    volumeCtrl.addEventListener("click", function(){
        console.log('clicked');
    
        if (volToggle){
            volSlider.className = "appear";
            volumeCtrl.style.height = "300px";
            volToggle = false;
        }

    });

    // jumpTo.addEventListener("click", function(){
    //     console.log('clicked');
    
    //     if (jumpToggle){
    //         jumpTo.style.height = "300px";
    //         jumpOptions.className = "showing";
    //     } else {
    //         jumpTo.style.height = "70px";
    //         jumpOptions.className = "hidden";
    //     };

    //     jumpToggle = !jumpToggle;
    // });

    info.addEventListener("click", function(){
        console.log('clicked');

        intro.className = 'slideDown';
    
    });

