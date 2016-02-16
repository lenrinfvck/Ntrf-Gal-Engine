var Strcom = require('strcom');
var Ac = require('ntrf_actives');
var $ = require('jquery');

function Comrun() {

}

Comrun.comParse = function(comstr) {
    var mark = $.trim(comstr).slice(0, 1);
    if(mark === '@') {
        var str = Strcom.clear(comstr);
        var type = str.match(/@([^\[]*)/)[1];
        var optionArr = []
        var options = {};
        str.match(/\[([^\]]*)/)? optionArr = str.match(/\[([^\]]*)/)[1].split(','): optionArr=[];
        optionArr.forEach(function(option) {
            options[option.split('=')[0]] = option.split('=')[1];
        });
        return new Comrun.Active({
            type: type,
            options: options
        });
    }else if(mark === '#') {
        var str = $.trim(comstr);
        var name,
            voice,
            img,
            fonts;
        str.match(/#\[([^\]]*)/) ? name = str.match(/#\[([^\]]*)/)[1]: name=undefined;
        str.match(/\(([^\)]*)/) ? img = str.match(/\(([^\)]*)/)[1]: img=undefined;
        str.match(/\{([^\}]*)/) ? voice = str.match(/\{([^\}]*)/)[1]: voice=undefined;
        var fontsmatch = str.match(/#(\[[^\]]*\]*)*(\([^\)]*\)*)*(\{[^\}]*\}*)*([\s\S]*)/);
        if(fontsmatch[4]) {
            fonts = fontsmatch[4];
        }
        return new Comrun.Dialogue({
            name: name,
            voice: voice,
            img: img,
            fonts: fonts,
        });
    }
}

Comrun.Active = function(comobj) {
    this.type = comobj.type;
    this.options = comobj.options;
}

Comrun.Active.prototype = {
    run: function(gal) {
        Ac[this.type](gal, this.options);
        if(this.type !== 'xxx') {
            gal.nextCom();
        }
    }
}

Comrun.Dialogue = function(comobj) {
    this.name = comobj.name;
    this.voice = comobj.voice;
    this.img = comobj.img;
    this.fonts = comobj.fonts;
}

Comrun.Dialogue.prototype = {
    run: function(gal) {
        var _this = this;
        gal.setLh(this.img);
        gal.playVoice(this.voice);
        gal.setDia(this.name, this.fonts);
    }
}

module.exports = Comrun;
