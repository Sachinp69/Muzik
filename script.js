// console.log("heyy, its a simple spotify clone")

//intializing the vaiables
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let audioElement=new Audio('media/90210.mp3');
let myProgress=document.getElementById('myProgress');
let gif=document.getElementById('gif');



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
    
})

//updating the progress bar
audioElement.addEventListener('timeupdate',()=>{
    myProgress.max=audioElement.duration;
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgress.value=progress;
    console.log(progress);
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

//addding seek feature

myProgress.addEventListener('change',()=>{
    let seekTime = (myProgress.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});
