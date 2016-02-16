function Strcom() {}
Strcom.prototype = {
    trim: function(str) {
        return str.replace(/\s+/g, '');
    },
    clearBr: function(str) {
        return str.replace(/[\r\n]/g, "");
    },
    clear: function(str) {
        return this.clearBr(this.trim(str));
    },
    delNote: function(str) {
        return str.replace(/\/\*[^\*\/]*\*\//mg, "");
    }
}
module.exports = new Strcom();