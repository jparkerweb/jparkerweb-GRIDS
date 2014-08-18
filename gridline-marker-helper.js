$( document ).ready(function() {
	
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
