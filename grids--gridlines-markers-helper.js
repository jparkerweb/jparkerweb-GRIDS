// ---------------------------------
// -- jparkerweb-GRIDS Framework  --
// ---------------------------------------------------
// -- http://jparkerweb.github.io/jparkerweb-grids/ --
// ---------------------------------------------------

$( document ).ready(function() {

	// ****************************
	// ***** Viewport Display *****
	// ****************************
	// markup to display viewport size in top left corner of page
	var viewportDisplay = "<div id=\"viewportDisplay\" class=\"viewportDisplay\"></div>";
	// update viewport display value
	function updateViewportDisplay(selector) {
		var viewportDisplayValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		$(selector).html("vp: " + viewportDisplayValue + "px");
	}
	// ****************************



	// ****************************
	// define markup require to render Gridline & Marker Helper elements
	var gridlinesAndMarkers = " " +
		"<!-- " +
		"	******************************************************************* " +
		"	** Helper Markup - Gridline/Breakpoint Marker Overlay & Controls ** " +
		"	******************************************************************* " +
		"--> " +
		"<!-- gridlines --> " +
		"<div class=\"gridlines\"> " +
		"	<div class=\"grid\"> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">1</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">2</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">3</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">4</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">5</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">6</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">7</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">8</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">9</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">10</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">11</div></div> " +
		"		<div class=\"col-1\"><div class=\"gridlines--col\">12</div></div> " +
		"	</div> " +
		"</div> " +
		"<!-- markers for grid --> " +
		"<div class=\"markers\"> " +
		"	<div class=\"grid\"> " +
		"		<div class=\"marker marker--xl\"></div> " +
		"		<div class=\"marker marker--l\"></div> " +
		"		<div class=\"marker marker--m\"></div> " +
		"		<div class=\"marker marker--s\"></div> " +
		"		<div class=\"marker marker--xs\"></div> " +
		"		<div class=\"marker marker--xxs\"></div> " +
		"		<div class=\"marker marker--stack\"></div> " +
		"	</div> " +
		"</div> " +
		"<div class=\"marker-indicator\"></div> " +
		"<!-- gridlines toggle --> " +
		"<div class=\"gridlines-toggle\">gridlines</div> " +
		"<!-- markers toggle --> " +
		"<div class=\"markers-toggle\">markers</div>	" +
		"<!-- ******************************************************************* --> " +
	" ";

	// insert Viewport display element
	$("body").append(viewportDisplay);
	// insert Gridline and Marker elements
	$("body").append(gridlinesAndMarkers);

	// bind gridlines toggle
	$(".gridlines-toggle").on("click", function () {
		$(".gridlines").toggle();
	});
	// toggle off gridlines on page load
	$(".gridlines").toggle();

	// bind markers toggle
	$(".markers-toggle").on("click", function () {
		$(".markers").toggle();
		$("body").toggleClass("show-marker-outlines");
	});
	// toggle off markers on page load
	$(".markers").toggle();

	// set initial viewport display value
	updateViewportDisplay("#viewportDisplay");
	// brid browser resize to update viewport display value
	$(window).on("resize", function () {
		updateViewportDisplay("#viewportDisplay");
	});
	



	// *****************************
	// ***** Inner Col Markers *****
	// *****************************
	// inner col markers
	var innerColMarkers = " " +
		"<div class=\"innerMarkers\"> " +
		"	<div class=\"innerMarker-outline\"></div> " +
		"	<div class=\"innerMarker-xxs\"></div> " +
		"	<div class=\"innerMarker-xs\"></div> " +
		"	<div class=\"innerMarker-s\"></div> " +
		"	<div class=\"innerMarker-m\"></div> " +
		"	<div class=\"innerMarker-l\"></div> " +
		"	<div class=\"innerMarker-xl\"></div> " +
		"</div> ";

	// insert/remove col markers
	$("[class*=col-]").on("click", function () {
		if ($(this).find(".innerMarkers").length > 0) {
			$(this).find(".innerMarkers").remove();
		}
		else {
			$(this).prepend(innerColMarkers);

			var className = $(this).attr("class");
			if (className.match(/col\-[0-9]{1,2}/)) {
				var size = className.match(/col\-([0-9]{1,2})/, '$1');
				setInnerMarkerOffsets(this, size[1]);
			}
		}
	});

	function getScrollbarWidth() {
		var pageHasScrollbar = ($(document).height() > $(window).height());
		if (pageHasScrollbar) {
			var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
				$outer = jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
				inner = $inner[0],
				outer = $outer[0];
		 
			jQuery('body').append(outer);
			var width1 = inner.offsetWidth;
			$outer.css('overflow', 'scroll');
			var width2 = outer.clientWidth;
			$outer.remove();

			return (width1 - width2);
		}
		else {
			return 0;
		}
	}
	
	function getGutterWidth() {
		var gutter = parseInt($(".grid").last().css("padding-left"));
		return gutter;
	}

	function getGridBreakpoints() {
		var gridBreakpoints = {
			XL: parseInt($(".marker.marker--xl").css("margin-left")),
			L: parseInt($(".marker.marker--l").css("margin-left")),
			M: parseInt($(".marker.marker--m").css("margin-left")),
			S: parseInt($(".marker.marker--s").css("margin-left")),
			XS: parseInt($(".marker.marker--xs").css("margin-left")),
			XXS: parseInt($(".marker.marker--xxs").css("margin-left"))
		};
		return gridBreakpoints;
	}

	var pageScrollbarWidth = getScrollbarWidth();
	var gridGutterWidth = getGutterWidth();
	var gridBreakpoints = getGridBreakpoints();

	function setInnerMarkerOffsets(selector, size) {
		var leftXL, leftL, leftM, leftS, leftXS, leftXXS;

		leftXL = ((gridBreakpoints.XL - gridGutterWidth - pageScrollbarWidth) * (size/12)) - gridGutterWidth;
		leftL = ((gridBreakpoints.L - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftM = ((gridBreakpoints.M - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftS = ((gridBreakpoints.S - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftXS = ((gridBreakpoints.XS - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftXXS = ((gridBreakpoints.XXS - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);

		var $innerMarkers = $(selector).find(".innerMarkers");
		
		$innerMarkers.find(".innerMarker-xl").css("margin-left", leftXL);
		$innerMarkers.find(".innerMarker-l").css("margin-left", leftL);
		$innerMarkers.find(".innerMarker-m").css("margin-left", leftM);
		$innerMarkers.find(".innerMarker-s").css("margin-left", leftS);
		$innerMarkers.find(".innerMarker-xs").css("margin-left", leftXS);
		$innerMarkers.find(".innerMarker-xxs").css("margin-left", leftXXS);
	}
	// ****************************	
});
