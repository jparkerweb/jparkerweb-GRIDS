// ---------------------------------
// -- jparkerweb-GRIDS Framework  --
// ---------------------------------------------------
// -- http://jparkerweb.github.io/jparkerweb-grids/ --
// ---------------------------------------------------

$( document ).ready(function() {

	// markup to display viewport size in top left corner of page
	var viewportDisplay = " \
		<div id=\"viewportDisplay\" class=\"viewportDisplay\"></div> \
	";
	// update viewport display value
	function updateViewportDisplay(selector) {
		var viewportDisplayValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		$(selector).html("vp: " + viewportDisplayValue + "px");
	}

	// // inner col markers **FIX**
	// var innerColMarkers = " \
	// 	<div class=\"innerMarkers\"> \
	// 		<div class=\"innerMarker-xxs\"></div> \
	// 		<div class=\"innerMarker-xs\"></div> \
	// 		<div class=\"innerMarker-s\"></div> \
	// 		<div class=\"innerMarker-m\"></div> \
	// 		<div class=\"innerMarker-l\"></div> \
	// 		<div class=\"innerMarker-xl\"></div> \
	// 	</div> \
	// ";
	// // insert/remove col markers **FIX**
	// $("[class*=col-]").on("click", function () {
	// 	if ($(this).find(".innerMarkers").length > 0) {
	// 		$(this).find(".innerMarkers").remove();
	// 	}
	// 	else {
	// 		$(this).prepend(innerColMarkers);
	// 	}
	// });

	// define markup require to render Gridline & Marker Helper elements
	var gridlinesAndMarkers = " \
		<!-- \
			******************************************************************* \
			** Helper Markup - Gridline/Breakpoint Marker Overlay & Controls ** \
			******************************************************************* \
		--> \
		<!-- gridlines --> \
		<div class=\"gridlines\"> \
			<div class=\"grid\"> \
				<div class=\"col-1\"><div class=\"gridlines--col\">1</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">2</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">3</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">4</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">5</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">6</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">7</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">8</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">9</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">10</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">11</div></div> \
				<div class=\"col-1\"><div class=\"gridlines--col\">12</div></div> \
			</div> \
		</div> \
		<!-- markers for grid --> \
		<div class=\"markers\"> \
			<div class=\"grid\"> \
				<div class=\"marker marker--xl\"></div> \
				<div class=\"marker marker--l\"></div> \
				<div class=\"marker marker--m\"></div> \
				<div class=\"marker marker--s\"></div> \
				<div class=\"marker marker--xs\"></div> \
				<div class=\"marker marker--xxs\"></div> \
				<div class=\"marker marker--stack\"></div> \
			</div> \
		</div> \
		<div class=\"marker-indicator\"></div> \
		<!-- gridlines toggle --> \
		<div class=\"gridlines-toggle\">gridlines</div> \
		<!-- markers toggle --> \
		<div class=\"markers-toggle\">markers</div>	\
		<!-- ******************************************************************* --> \
	";

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
	
});
