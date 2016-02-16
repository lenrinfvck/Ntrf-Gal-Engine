var Strcom = require('strcom');
var $ = require('jquery');
var Ntrf = require('ntrf');
var GalView = require('ntrf_galview');

var gal = new GalView($('.gal'));
var $text = $('.gal-script');


$.ajax({
	url: 'scripts/s1.txt',
	type: 'get',
	success: function(data) {
		var reader = new Ntrf.ScriptsReader.ComList(data);
		var comList = reader.comList;
		$text.val(data);
		gal.setScript(comList);
		gal.nextCom();
	}
});

$('.btn').click(function() {
	var data = $text.val();
	var reader = new Ntrf.ScriptsReader.ComList(data);
	var comList = reader.comList;
	gal.setScript(comList);
	gal.nextCom();
})
