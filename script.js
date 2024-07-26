//intializing the vaiables
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let audioElement=new Audio('media/90210.mp3');
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
    { songName: '5% Tint', filePath:'media/5Tint.mp3', coverPath: 'media/cover5.jpg' }
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

//play song exclusively
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        
        // If the clicked song is already playing, pause it
        if (!audioElement.paused ) {
            audioElement.pause();
            e.target.classList.add('fa-play');
            e.target.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            masterPlay.classList.remove('fa-pause');
        } else {
            // Pause any currently playing song and reset its icon
            makeAllPlays();
            
            // Update the audio source and play the new song
            audioElement.src = songs[songIndex].filePath;
            audioElement.play();
            e.target.classList.remove('fa-play');
            e.target.classList.add('fa-pause');
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
        }
    });
});

//next song button
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>3){
        songIndex=0;
    }
    else songIndex++;
    console.log('Next song index:', songIndex);
    console.log('Playing song:', songs[songIndex].songName);
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

//previous song button
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<1){
        songIndex=songs.length-1;
    }
    else songIndex--;
    console.log('Previous song index:', songIndex);
    console.log('Playing song:', songs[songIndex].songName);
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
