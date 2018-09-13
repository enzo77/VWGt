/*
 * ANIMELINE 
*/

var AnimeLines = function() {
    var lineField,
      height,
      width,
      mainTimeline,
      textSplit;

    var _init = function() {
        lineField     = document.getElementById('lineField');
        height        = window.innerHeight;
        width         = window.innerWidth;
        mainTimeline  = new TimelineMax({repeat:-1});
        text          = document.getElementById('text');
        _addEventHandlers();
        _setMainTimeline();
    }

    var _addEventHandlers = function() {
        window.addEventListener('resize', _resize, false);
    }

    var _play = function() {
        mainTimeline.restart();
    }

    var _resize = function() {
        width = 300;
        height = 600;
    }

    var _createLinesTl = function() {
        var tl = new TimelineMax();
        var nLines = 90; //numeros lineas
        for(var i = 0; i < nLines ; i++ ) {
            var line = document.createElement('div');
            var lineNumber = Math.floor((Math.random() * 6) + 1);
            line.className = 'line line--'+lineNumber;
            lineField.appendChild(line);
            TweenLite.set(line, {y:Math.random()*height, x: width});
            tl.to(line, Math.random() * 1, {x:-width* Math.floor((Math.random() * 4) + 1), opacity:0, immediateRender:true, ease:SlowMo.ease.config(0.6, 0.9)}, Math.random()*5 + (0.5));
        }   
        return tl;
    }

    var _setMainTimeline = function() {
        mainTimeline
        .from(lineField, 0.2, {autoAlpha:0})
        .add(_createLinesTl(), 'field1')
        .to(lineField, 0.5, {autoAlpha:0}, '-=0.3')
    }

    return {
        init: _init
    }

}();

/*
 * ANIMETXT SLOWMO
*/

var AnimeTxt = function() {
    
    var vendors_timeline,
        slowmo,
        prefixList_timeline,
        firstMedTxt,secondMedTxt,logoR,thirdStepBg;
    
    var _init = function() {  
        firstMedTxt         = document.getElementById('firstMedTxt');
        secondMedTxt        = document.getElementById('secondMedTxt');
        logoR               = document.getElementById('logoR');
        thirdStepBg         = document.getElementById('thirdStepBg');
        lastTxt             = document.getElementById('lastTxt');
        lastTxtCv           = document.getElementById('lastTxtCv');
        
        vendors_timeline    = new TimelineMax({
            repeat:0,
            onRepeat: onRepeat
        
        });
        slowmo = new TimelineMax({paused:true});
        prefixList_timeline = new TimelineMax({paused:true});
        txtSlowCreate();
    }

    var txtSlowCreate = function (){
        slowmo.fromTo(firstMedTxt,5, {left:-250}, {left:260, immediateRender:true, ease:SlowMo.ease.config(0.6, 0.9)}, "vendors")
              .fromTo(secondMedTxt, 5, {left:300}, {left:-310, immediateRender:true, ease:SlowMo.ease.config(0.6, 0.9),onComplete: endAnimTweet}, "vendors")
        vendors_timeline.to([prefixList_timeline], 3, {time:3, ease:Linear.easeNone}, "vendors")
            .to(slowmo, 3, {time:3, ease:Linear.easeNone}, "vendors+=1")
            .to(slowmo, 0.3, {progress:1}, "vendorsDone")

            .to(vendorsList, 0.1, {autoAlpha:0}, "vendorsDone")
            .fromTo(logoR, 0.2, {scale:10, autoAlpha:0, rotationZ:-20}, {scale:1, rotationZ:0, autoAlpha:1, ease:Power3.easeOut, immediateRender:true})
            .fromTo(lastTxt, 0.2, {scale:10, autoAlpha:0, rotationZ:0}, {scale:1, rotationZ:0, autoAlpha:1, ease:Power3.easeOut, immediateRender:true},"vendorsDone+=0.5")
            .fromTo(lastTxtCv, 0.2, {scale:10, autoAlpha:0, rotationZ:0}, {scale:1, rotationZ:0, autoAlpha:1, ease:Power3.easeOut, immediateRender:true},"vendorsDone+=0.8")
        
            .to([thirdStepBg], 0.2, {autoAlpha:1}, "vendorsDone+=0.5")
            //.to(nomore, 0.5, {scale:0.5, autoAlpha:0, ease:Power1.easeIn}, "+=.5")
    }
     var onRepeat = function (){
         vendors_timeline.time(0)
     }
    
    var endAnimTweet = function(){
       
    }
    
    var _play = function() {
        vendors_timeline.restart();
    }
    
    return {
        init: _init,
        play: _play
    }

}();    

