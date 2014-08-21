// ---------------------------------
// -- jparkerweb-GRIDS Framework  --
// ---------------------------------------------------
// -- http://jparkerweb.github.io/jparkerweb-grids/ --
// ---------------------------------------------------

$( document ).ready(function() {

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
		<div class=\"marker marker--stack\"></div> \
		<div class=\"marker marker--xs\"></div> \
		<div class=\"marker marker--s\"></div> \
		<div class=\"marker marker--m\"></div> \
		<div class=\"marker marker--l\"></div> \
		<div class=\"marker marker--xl\"></div> \
		<div class=\"marker-indicator\"></div> \
		<!-- gridlines toggle --> \
		<div class=\"gridlines-toggle\">gridlines</div> \
		<!-- markers toggle --> \
		<div class=\"markers-toggle\">markers</div>	\
		<!-- ******************************************************************* --> \
	";

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
		$(".marker").toggle();
		$("body").toggleClass("show-marker-outlines");
	});
	// toggle off markers on page load
	$(".marker").toggle();
	
});
