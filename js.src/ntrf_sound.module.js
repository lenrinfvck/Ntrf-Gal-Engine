var $ = require('jquery');

function Sound(url) {
    this.url = url;
    this.dom = {};
    this.$dom = {};
    this.init();
}

Sound.prototype = {
    init: function() {
        var $dom = $('<audio></audio>');
        $dom.attr('src', this.url);
        $("body").append($dom);
        this.dom = $dom[0];
        this.$dom = $dom;
        this.dom.loop = true;
    },
    playToggle: function() {
        var $dom = this.dom;
        if($dom.paused) {
            $dom.play();
        }else {
            $dom.pause();
        }
    },
    play: function() {
        var $dom = this.dom;
        if($dom.paused) {
            $dom.play();
        }
    },
    changeUrl: function(url) {
        this.dom.pause();
        this.url = url;
        this.dom.src = this.url;
        this.dom.load();
        this.play();
    },
    playOnce: function() {
        var _this = this;
        this.dom.loop = false;
        this.dom.volume = 1;
        this.play();
        this.dom.addEventListener('ended', function() {
            _this.$dom.remove();
        });
    }
}

module.exports = Sound;