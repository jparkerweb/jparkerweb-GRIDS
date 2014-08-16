$( document ).ready(function() {
	// bind gridlines toggle
	$(".gridlines-toggle").on("click", function () {
		$(".gridlines").toggle();
	});
	// bind markers toggle
	$(".markers-toggle").on("click", function () {
		$(".marker").toggle();
	});
});