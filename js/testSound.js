(function(f){typeof define==="function"?define(f):f()})(function(require,exports,module){var Sound=require("ntrf_sound"),$=require("jquery"),bgm=new Sound("resource/bgm/philosophy01.mp3");bgm.play(),$("body").click(function(o){var n=new Sound("resource/voice/voicetest01.mp3");n.playOnce()}),$("body").bind("mousedown",function(o){2===o.button?console.log("right"):console.log("left")}),$(".gal").bind("contextmenu",function(o){return console.log("right2"),!1});});