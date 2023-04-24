(function(){
    const video = document.querySelector("video");
    const videoSource = document.querySelector("video source");
    const videoNames = ["media/vinyl1.mp4", "media/vinyl2.mp4", "media/vinyl3.mp4", "media/vinyl4.mp4"];
    const videoPosters = ["images/vinyl1poster.png", "media/vinyl2poster.png", "media//vinyl3poster.png", "media//vinyl4poster.png"];
    const loading = document.querySelector('.fas')
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');
    const poem = {
        start: [0, 5, 10, 15],
        stop: [5, 10, 15, 30],
        line: [line1, line2, line3, line4]
    };
    let videoNum = 0;
    let timeLoop = 0;

    const sound = document.querySelector("audio");
    sound.volume = 0.5;

    video.addEventListener('playing', function() {
        loading.style.display = 'none';
    });

    const clock = setInterval(checkTime, 1000);

    function checkTime() {

        timeLoop++;

        for (let i = 0; i < poem.start.length; i++) {
            if (poem.start[i] < timeLoop && timeLoop < poem.stop[i]) {
                poem.line[i].className = "showing";
            } else {
                poem.line[i].className = "hidden";
            }
        }
    }

    document.addEventListener('click', function(){
        videoNum += 1;
        if (videoNum >= 4){videoNum = 0;};
        videoSource.src = videoNames[videoNum];
        video.load();
    });

}());