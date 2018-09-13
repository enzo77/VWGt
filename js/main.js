var _stageNoTxt = document.getElementById("stageNoTxt");
var _IdLegal = document.getElementById("IdLegal");
var _legalTxt = document.getElementById("legalTxt");
var _close = document.getElementById("close");
var _btnCta = document.getElementById("btnCta");

/* VIDEO */
var timeImg = 0.5;
var timeTxt = 1;
var timeFade = 0.5;
var arrVideo = [];
var loop = false;
var stopLoop = true;
var n = 1;
var nLoop = 9;
var posterVideo = document.getElementById("posterVideo");

var detector = document.getElementById('detector');
var expanded = document.getElementById("expanded");
var contracted = document.getElementById("contracted");
var expandButton = document.getElementById("expandButton");
var videoBox = document.getElementById("videoBox");
var videoContainer = document.getElementById("videoContainer");
var video = document.getElementById("video");
var video1;

var sdkVideoPlayer = document.getElementById("sdk-video-player");
var sdkVideoPlayButton = document.getElementById("sdk-video-play-button");

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();
       
    }
}

function startAd(){
    setEvents();
    utilsVideos();
    video1 = new EBG.VideoModule(video);
}

function setEvents(){
    
    _IdLegal.addEventListener("click", function(){
        _legalTxt.classList.remove('fadeOutLegal'); 
        _legalTxt.classList.add('fadeInLegal'); 
        EB.userActionCounter('BTN CONDICIONES');
    });

    _close.addEventListener("click", function(){
        _legalTxt.classList.remove('fadeInLegal');
        _legalTxt.classList.add('fadeOutLegal'); 
        EB.userActionCounter('BTN CERRAR CONDICIONES');
    });
    
    _btnCta.addEventListener("click", function(){
        EB.clickthrough("BTN RESERVA ONLINE");
    });
    
}

function logicBanner(){

    classie.add( _btnCta, 'hover' )
    
    setTimeout(function(){ 
           classie.add( _btnCta, 'bgCta' )
           classie.add( _btnCta, 'bgCtaR' )
           classie.remove( _btnCta, 'hover' )
            setTimeout(function(){   
                classie.remove( _btnCta, 'bgCta' ) 
            },1200);
    }, 1200);
     
}

function utilsVideos(){
  
    video.addEventListener("ended", function(){  
        stageNoTxt.style.display = "block";
        videoBox.style.display = "none";
        
        curTime = 0;
        timeVideoSee = 0;
        arrVideo.length = 0;  
        logicBanner();
    });
    
    video.addEventListener("timeupdate", function(){
        curTime = Math.round( this.currentTime ) ;
        timeVideoSee = arrVideo.push(curTime);
        //console.log(">>>" , timeVideoSee)
        if(timeVideoSee == 11) {
            AnimeLines.init();
            if(!loop) {
                AnimeTxt.init();
            } else {
                setTimeout(function(){ AnimeTxt.play() }, 1500);
            }
           
        }

    });
    
    if(!stopLoop){
       setTimeout(function(){   startLoop()  }, 20000);
    }
 
}

function startLoop(){
    stopLoop = true;
    stageNoTxt.style.display = "none";
    videoBox.style.display = "block";
    classie.remove( _btnCta, 'bgCtaR' )
    loop = true;
    video.play();
    utilsVideos();
}

window.onload = initEB;