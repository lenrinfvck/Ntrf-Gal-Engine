function Ntrf() {
	this.gameName = "";
}
Ntrf.ScriptsReader = function() {
	this.log = "";
};
//文本字符读写
Ntrf.ScriptsReader.CharRead = function(scriptsFile) {
	if (scriptsFile === undefined) {
		str = "";
	} else {
		str = scriptsFile;
	}
	this.string = str;
	this.length = str.length;
	this.curPos = 0;
};
Ntrf.ScriptsReader.CharRead.prototype = {
	//移位, 返回当前字符串, 并curPos序数下移, 跳过win双换行符
	nextChar: function() {
		var pos = this.curPos;
		if (pos >= this.length) {
			return -1;
		}
		//windows
		if (this.string[this.curPos + 1] === "\r" && this.string[this.curPos + 2] === "\n") {
			this.curPos += 2;
			return this.string[this.curPos-2];
		}
		return this.string[this.curPos++];
	},
	curChar: function() {
		return this.string[this.curPos];
	},
	retract: function(n) {
		if (n === undefined) {
			n = 1;
		}
		this.curPos -= n;
		if (this.curPos < 0) {
			this.curPos = 0;
		}
	}
};
//单行命令脚本对象
Ntrf.ScriptsReader.Commond = function(string) {
	this.comHead = "";
	this.comArr = {};
};

//脚本命令管理, 解析, 处理
Ntrf.ScriptsReader.ComList = function(scriptsFile) {
	this.charRead = new Ntrf.ScriptsReader.CharRead(scriptsFile);
	this.curLine = 0;
	this.comList = [];
	this.strParse(scriptsFile);
};
Ntrf.ScriptsReader.ComList.prototype = {
	//将字符串转化为单行命令
	strParse: function() {
		var read = this.charRead;
		var comStr = "";
		while(read.curChar()) {
			var curChar = read.nextChar();
			if(curChar === -1) {
				break;
			}
			comStr += curChar; 
			if ((curChar === "\n" || curChar === "\r") && (read.string[read.curPos] === "@" || read.string[read.curPos] === "#")) {
				if(comStr === "\n" || comStr === "\r") {
					comStr = "";
					continue;
				}
				this.curLine++;
				this.comList.push(comStr);
				comStr = "";
			}
		}
	},
	comRun: function() {

	}
};