$(document).ready(function(){
	    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	    $('.modal').modal();
	});

$("#code").bind('input propertychange', function() {
	try {
		$("#error").hide();
 		$("#error").html('');
 		var diagram = Diagram.parse($("#code").val());
 		$(".diagram").html('');
 		diagram.drawSVG($(".diagram").get(0), {theme: 'simple'});
 	}
 	catch(err) {
 		$("#error").html(err.message);
 		$("#error").show();
 	}

});


$("#download_svg").on("click", function(ev) {
 	var svg = $(".diagram").find('svg')[0];
 	var width = parseInt(svg.width.baseVal.value);
 	var height = parseInt(svg.height.baseVal.value);
 	var data = $("#code").val();
 	var xml = '<?xml version="1.0" encoding="utf-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"><svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '" xmlns:xlink="http://www.w3.org/1999/xlink"><source><![CDATA[' + data + ']]></source>' + svg.innerHTML + '</svg>';

 	var a = $(this);
          a.attr("download", "diagram.svg"); // TODO I could put title here
          a.attr("href", "data:image/svg+xml," + encodeURIComponent(xml));
      });

$("#download_png").on("click", function(e) {
 	e.preventDefault();
 	saveSvgAsPng($(".diagram").find('svg')[0], "diagram.png", {"backgroundColor": "#FFF"});
});