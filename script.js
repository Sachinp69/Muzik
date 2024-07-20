// console.log("heyy, its a simple spotify clone")

//intializing the vaiables
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let audioElement=new Audio('media/Mafia.mp3');
let progress=document.getElementById('progress');
let gif=document.getElementById('gif');
let currentTime=document.getElementById('currentTime');
let totalDuration=document.getElementById('totalDuration');
let progressDiv=document.getElementById('progressDiv');



let songs=[
    { songName: '90210', filePath:'media/90210.mp3', coverPath: 'media/cover1.jpg' },
    { songName: "Maria I'm Drunk", filePath:"media/MariaImDrunk.mp3", coverPath: 'media/cover2.jpg' },
    { songName: 'My Eyes', filePath:'media/MyEyes.mp3', coverPath: 'media/cover3.jpg' },
    { songName: 'Mafia', filePath:'media/Mafia.mp3', coverPath: 'media/cover4.jpg' },
    { songName: '5% Tint', filePath:'media/5%Tint.mp3', coverPath: 'media/cover5.jpg' }
]

//listening to events

//setting audio duration
audioElement.addEventListener('loadedmetadata', ()=>{
    console.log("Total Duration:", audioElement.duration);
    totalDuration.textContent = formatTime(audioElement.duration);
})

// made a fucntoin to show time in a proper format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

//updating the progress bar
audioElement.addEventListener('timeupdate',()=>{
    let progressPercent=(audioElement.currentTime/audioElement.duration)*100;
    progress.style.width=`${progressPercent}%`;
    //updating current time
    currentTime.textContent = formatTime(audioElement.currentTime);
});

//setting the masterPlay to play the song
masterPlay.addEventListener('click',()=>{
    
    if(audioElement.paused || audioElement.currentTime == 0){
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        audioElement.play();
        gif.style.opacity=1;
    }else{
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        audioElement.pause();
        gif.style.opacity=0;
    }
});

//adding seek feature
progressDiv.addEventListener('click', (e) => {
    const progressWidth = progressDiv.clientWidth;
    const clickX = e.offsetX;
    const newTime = (clickX / progressWidth) * audioElement.duration;
    audioElement.currentTime = newTime;
    console.log("Progress Width:", progressWidth);
    console.log("Click X:", clickX);
    console.log("New Time:", newTime);

    // Update progress bar immediately
    progress.style.width = `${(audioElement.currentTime / audioElement.duration) * 100}%`;
    // Update current time immediately
    currentTime.textContent = formatTime(audioElement.currentTime);
});

