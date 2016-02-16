var $ = require('jquery');
var Strcom = require('strcom');
var Sound = require('ntrf_sound');

var defaultOpt = {
    width: 960,
    height: 540
};

var defaultStage = {
    bgm: '',
    bg: '',
    lh: [],
    dia: {
        name: '',
        fonts: ''
    },
    comIndex: 0,
    com: {}
}

//此dom是jq封装的dom
function GalView(dom, opt) {
    this.dom = dom;
    this.opt = $.extend({}, defaultOpt, opt);
    this.stage = $.extend({}, defaultStage);
    this.state = 0;
    this.script = '';
    this.bgmObj = {};
    this.comList = {};
    this.comIndex = 0;
    this.init();
}

GalView.prototype = {
    init: function() {
        //TODO:
        //初始化视图
        //装载指令队列
        var $dom = this.dom;
        var _this = this;
        var opt = _this.opt;
        this.bgmObj = new Sound();
        $dom
            .addClass('gal')
            .css({
                width: opt.width,
                height: opt.height
            })
        this.bindUI();
    },
    setScript: function(comList) {
        this.comList = comList;
        this.comIndex = 0;
    },
    bindUI: function() {
        //TODO:
        //绑定点击事件
        var $dom = this.dom;
        var _this = this;
        $dom.bind('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            _this.nextCom();
        });
    },
    changeBgm: function(bgm) {
        this.bgmObj.changeUrl(bgm);
    },
    nextCom: function() {
        var _this = this;
        var comList = _this.comList;
        var index = _this.comIndex;
        if(_this.comIndex < _this.comList.length - 1) {
            _this.comIndex++;
        }
        comList[index].run(_this);
    },
    changeBg: function(url) {
        this.stage.bg = url;
        this.dom.find('.bg').css('background-image', 'url('+url+')');
    },
    setLh: function(url) {
        if(url) {
            this.dom.find('.lh-stage img').attr('src', url).parent().removeClass('hide');
        }else {
            this.dom.find('.lh-stage img').attr('src', '');
        }
    },
    setDia: function(title, fonts) {
        var $title = $('.dia-title');
        var $fonts = $('.dia-fonts');
        if(title) {
            $title.text(title);
        }else {
            $title.text('');
        }
        $fonts.text(fonts);
    },
    playVoice: function(url) {
        if(url) {
            var voice = new Sound(url);
            voice.playOnce();
        }
    }
}

module.exports = GalView;