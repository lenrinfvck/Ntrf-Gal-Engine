(function(f){typeof define==="function"?define(f):f()})(function(require,exports,module){var Strcom=require("strcom"),$=require("jquery"),Ntrf=require("ntrf"),GalView=require("ntrf_galview"),gal=new GalView($(".gal")),$text=$(".gal-script");$.ajax({url:"scripts/s1.txt",type:"get",success:function(t){var e=new Ntrf.ScriptsReader.ComList(t),r=e.comList;$text.val(t),gal.setScript(r),gal.nextCom()}}),$(".btn").click(function(){var t=$text.val(),e=new Ntrf.ScriptsReader.ComList(t),r=e.comList;gal.setScript(r),gal.nextCom()});});