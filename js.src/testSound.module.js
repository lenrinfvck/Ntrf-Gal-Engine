var Sound = require('ntrf_sound');
var $ = require('jquery');

var bgm = new Sound('resource/bgm/philosophy01.mp3');

bgm.play();

$("body").click(function(e) {
    var voice = new Sound('resource/voice/voicetest01.mp3');
    voice.playOnce();
});

//左右键
$("body").bind('mousedown', function(e) {
    if(e.button === 2) {
        console.log('right');
    }else {
        console.log('left');
    }
});

//右键菜单
$(".gal").bind('contextmenu', function(e) {
    console.log('right2');
    return false;
})