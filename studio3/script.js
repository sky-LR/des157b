console.log('reading JS');
    let sliders = [];
    let sounds;
    let currentStep = 0;
    let counter = 0;
    let millisInterval;
    let runningSequencer = false;
    let sequence = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]
    
    //okay heres what im thinking:
    //A grid of toggle switches
    //all those do is store the values for what sound to play in a big 2d array
    //Then there can be a lightweight function that just cycles through that object and plays the right sounds at the right time

    function preload(){
        sounds = [  
            loadSound("sounds/perc.mp3"),
            loadSound("sounds/perc2.mp3"),
            loadSound("sounds/hat.mp3"),
            loadSound("sounds/snare.mp3"),
            loadSound("sounds/kick.mp3")
        ];
    }
    
    function setup() {
        createCanvas(0,0);
        getAudioContext().suspend();
        playButton = createButton('play');
        playButton.mousePressed(toggleSequencer);
        bpmSlider = createSlider(100,800,300,1);
        bpmSlider.class(`bpmSlider`);
        createSequencer();
    }
    
    function loaded(){
    }

    function mousePressed() { 
        userStartAudio();
    }

    function BPMtoMs(bpm){
        return 60000/bpm;
    };

    function createSequencer() {
        for(let i = 0; i<sounds.length; i++){
            const newRow = document.createElement("div");
            newRow.className = `row${i}`;
            sliders[i] = createSlider(0,1,0.7,0.01); 
            sliders[i].class(`volSlider`);
            document.querySelector('#sequencer').appendChild(newRow);

            for(let j = 0; j < sequence.length; j++){
                const newBox = document.createElement("input");
                newBox.type = "checkbox";
                newBox.className = `step${j}`;
                document.querySelector(`.row${i}`).appendChild(newBox);
            };
        };
    };

    function playSounds(step){
        for(let i = 0; i < sounds.length; i++){
            console.log(sequence[step][i]);
            if(sequence[step][i]){
                sounds[i].play();
            }
        };
    }

    function toggleSequencer(){
        currentStep = 0;
        runningSequencer = !runningSequencer;

        if(runningSequencer){
            playButton.html('stop');
        } else {
            playButton.html('play');
        }

    }

    function runSequencer(){
        if (currentStep> (sequence.length - 1)){
            currentStep = 0;
        }

        playSounds(currentStep);
        counter = millis();
        currentStep++;

        let currentStepCheckboxes = document.querySelectorAll(`.step${currentStep - 1}`);
        let allCheckboxes = document.querySelectorAll(`input[type="checkbox"]`);

        allCheckboxes.forEach( e => {
            e.style.borderWidth = "1px";
        });
        
        currentStepCheckboxes.forEach( e => {
            e.style.borderWidth = "2px";
        });
    }
      
    function draw() {

        millisInterval = BPMtoMs(bpmSlider.value());

        for(let i = 0; i<sequence.length; i++){
            for(let j = 0; j < sounds.length; j++){
                sequence[i][j] = document.querySelector(`.row${j} .step${i}`).checked;
            };
        };

        for(let i = 0; i < sounds.length; i++){
            sounds[i].setVolume(sliders[i].value());
        };

        if ( counter < (millis() - millisInterval) && runningSequencer == true) {
                runSequencer();
        }
    }