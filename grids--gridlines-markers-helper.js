// ---------------------------------
// -- jparkerweb-GRIDS Framework  --
// ---------------------------------------------------
// -- http://jparkerweb.github.io/jparkerweb-grids/ --
// ---------------------------------------------------

$(document).ready(function() {
	// *************************
	// ***** Notifications *****
	// *************************
	// define markup for the notification box
	var gridsNotificationsMarkup = "<div id=\"gridsNotification\" class=\"grids-notification\"></div>";
	// insert markup into the page
	$("body").append(gridsNotificationsMarkup);

	// set varibale for accessing the notification block
	var $gridsNotification = $("#gridsNotification");
	var gridsNotificationTimeouts = [];

	// show notification
	function showGridsNotification(message, timeToShow) {
		// clear and existing notifications
		for (var i = 0; i < gridsNotificationTimeouts.length; i++) {
		    clearTimeout(gridsNotificationTimeouts[i]);
		}
		gridsNotificationTimeouts = [];		

		$gridsNotification
			.html(message)
			.removeClass("grids-notification--slide-off-right")
			.addClass("grids-notification--show");

		gridsNotificationTimeouts.push(
			setTimeout(function() {
				$gridsNotification.addClass("grids-notification--slide-off-right");
				gridsNotificationTimeouts.push(
					setTimeout(function() {
						$gridsNotification.removeClass("grids-notification--show grids-notification--slide-off-right");
					}, 300)
				);
			}, timeToShow)
		);
	} 

	// bind clicking of notifiction to clear itself
	$("#gridsNotification").on("click", function () {
		$gridsNotification.removeClass("grids-notification--show grids-notification--slide-off-right");
	});
	// *************************



	// ****************************
	// ***** Viewport Display *****
	// ****************************
	// markup to display viewport size in top left corner of page
	var viewportDisplay = "<div id=\"viewportDisplay\" class=\"viewportDisplay\"></div>";
	// insert Viewport display element
	$("body").append(viewportDisplay);

	// declare vaiable for global viewport
	var viewportDisplayValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	// update viewport display value
	function updateViewportDisplay(selector, html) {
		$(selector).html(html);
	}
	// set initial viewport display value
	updateViewportDisplay("#viewportDisplay", "vp: " + viewportDisplayValue + "px");

	// bind notification message
	$("#viewportDisplay").on("click", function() {
		showGridsNotification("The viewport helper in the top left corner displays the current \"viewport\" of your browser window.", 4000);
	});

	// bind browser resize to update viewport display value
	$(window).on("resize", function () {
		viewportDisplayValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		updateViewportDisplay("#viewportDisplay", "vp: " + viewportDisplayValue + "px");
		// **TODO: update col markers on breakpoints
		console.log(gridBreakpoints);
	});	
	// ****************************



	// *********************************
	// ***** Gridlines and Markers *****
	// *********************************

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
		"<!-- col markers toggle --> " +
		"<div class=\"col-markers-toggle\">col-markers</div>	" +
		"<!-- ******************************************************************* --> " +
	" ";

	// insert Gridline and Marker elements
	$("body").append(gridlinesAndMarkers);

	// bind gridlines toggle
	$(".gridlines-toggle").on("click", function () {
		var viewportValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var stackBreakpoint = parseInt($(".marker.marker--stack").css("margin-left"));
		if (viewportValue > stackBreakpoint) {
			$(".gridlines").toggle();
			$(".gridlines-toggle").toggleClass("toggle-button--active");
		}
		else {
			showGridsNotification("\"Gridlines\" overlay is only available for browser widths greater than the \"stack\" breakpoint (" + stackBreakpoint + "px).  Increase the size of your browser to enable this.", 4000);
		}		
	});
	// toggle off gridlines on page load
	$(".gridlines").toggle();

	// bind markers toggle
	$(".markers-toggle").on("click", function () {
		var viewportValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var stackBreakpoint = parseInt($(".marker.marker--stack").css("margin-left"));

		if (viewportValue > stackBreakpoint) {
			$(".markers").toggle();
			$(".markers-toggle").toggleClass("toggle-button--active");
			$("body").toggleClass("show-marker-outlines");
		}
		else {
			showGridsNotification("Breakpoint \"marker\" overlays are only available for browser widths greater than the \"stack\" breakpoint (" + stackBreakpoint + "px).  Increase the size of your browser to enable this.", 4000);
		}
	});

	// bind notification for markers
	$(".markers .marker").on("click", function() {
		showGridsNotification("Markers overlay a visual line showing each \"breapoint\" value defined in your GRIDS configuration.", 4000);
	});
	// bind notification for marker indicator
	$(".marker-indicator").on("click", function() {
		showGridsNotification("The breakpoint indicator bar on the bottom of the page displays the current \"breakpoint\" that is trigged in the GRIDS framework.", 4000);
	});

	// toggle off markers on page load
	$(".markers").toggle();
	// *********************************



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

	// bind toggle button
	$(".col-markers-toggle").on("click", function() {
		var viewportValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var stackBreakpoint = parseInt($(".marker.marker--stack").css("margin-left"));
		if (viewportValue > stackBreakpoint) {
			$(".innerMarkers").toggle();
			$(".col-markers-toggle").toggleClass("toggle-button--active");
		}
		else {
			showGridsNotification("\"Column Markers\" are only available for browser widths greater than the \"stack\" breakpoint (" + stackBreakpoint + "px).  Increase the size of your browser to enable this.", 4000);
		}		
	});

	// bind the insert/remove of inner col markers
	// to click event of each columns
	$("[class*=col-]").on("click", function () {
		var isGridlinesCol = ($(this).parents(".gridlines").length > 0);

		if(isGridlinesCol) {
			showGridsNotification("The gridlines overlay is active, to toggle them off click the \"gridlines\" button in the bottom left corner.", 5500);
		}
		else {
			var isInnerColMarkersEnabled = ($(".col-markers-toggle.toggle-button--active").length > 0);

			if (isInnerColMarkersEnabled) {
				var isNestedGrid = ($(this).parents(".grid").length > 1);
				if(!isNestedGrid) {
					var hasInnerMarkers = ($(this).find(".innerMarkers").length > 0);
					if (hasInnerMarkers) {
						// remove existing inner markers
						$(this).find(".innerMarkers").remove();
					}
					else {
						// add inner markers
						$(this).prepend(innerColMarkers);

						// set the inner marker left offset for
						// each breakpoint based on the clicked 
						// col size
						var className = $(this).attr("class");
						if (className.match(/col\-[0-9]{1,2}/)) {
							var size = className.match(/col\-([0-9]{1,2})/, '$1');
							setInnerMarkerOffsets(this, size[1]);
						}
					}
				}
			}
		}
	});

	// if a scrollbar exists return its calculated width
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
	
	// return the current grid's gutter width
	function getGutterWidth() {
		var gutter = parseInt($(".grid").last().css("padding-left"));
		return gutter;
	}

	// return the current grid's breakpoints
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

	// set the inner marker offsets per passed in col width (1-12)
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
