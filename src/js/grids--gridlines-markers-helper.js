// ---------------------------------
// -- jparkerweb-GRIDS Framework  --
// ---------------------------------------------------
// -- http://jparkerweb.github.io/jparkerweb-GRIDS/ --
// ---------------------------------------------------

$(document).ready(function() {
	// *********************************
	// ***** jQuery RegEx Selector *****
	// *********************************
	//http://james.padolsey.com/javascript/regex-selector-for-jquery/
	jQuery.expr[':'].regex = function(elem, index, match) {
		var matchParams = match[3].split(','),
			validLabels = /^(data|css):/,
			attr = {
				method: matchParams[0].match(validLabels) ? matchParams[0].split(':')[0] : 'attr',
				property: matchParams.shift().replace(validLabels,'')
			},
			regexFlags = 'ig',
			regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
		return regex.test(jQuery(elem)[attr.method](attr.property));
	};
	// *********************************



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
	function showGridsNotification(message, timeToShow, bgColor, hook) {
		bgColor = typeof bgColor !== 'undefined' ? bgColor : '#2980b9';
		hook = typeof hook !== 'undefined' ? hook : '';

		// clear and existing notifications
		for (var i = 0; i < gridsNotificationTimeouts.length; i++) {
			clearTimeout(gridsNotificationTimeouts[i]);
		}
		gridsNotificationTimeouts = [];		

		$gridsNotification
			.html(message)
			.css("background", bgColor)
			.removeClass("grids-notification--slide-off-right")
			.addClass("grids-notification--show")
			.attr("data-hook", hook);

		gridsNotificationTimeouts.push(
			setTimeout(function() {
				$gridsNotification.addClass("grids-notification--slide-off-right");
				gridsNotificationTimeouts.push(
					setTimeout(function() {
						$gridsNotification
							.removeClass("grids-notification--show grids-notification--slide-off-right")
							.attr("data-hook", "");					
					}, 300)
				);
			}, timeToShow)
		);
	} 

	// bind clicking of notifiction to clear itself
	$("#gridsNotification").on("click", function () {
		$gridsNotification
			.removeClass("grids-notification--show grids-notification--slide-off-right")
			.attr("data-hook", "");
	});
	// *************************



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
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">1</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">2</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">3</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">4</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">5</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">6</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">7</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">8</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">9</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">10</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">11</div></div> " +
		"		<div class=\"col-1 col-nostack\"><div class=\"gridlines--col\">12</div></div> " +
		"	</div> " +
		"</div> " +
		"<!-- markers for grid --> " +
		"<div class=\"markers\"> " +
		"	<div class=\"grid\"> " +
		"		<div class=\"marker marker--xxl\"></div> " +
		"		<div class=\"marker marker--xl\"></div> " +
		"		<div class=\"marker marker--l\"></div> " +
		"		<div class=\"marker marker--m\"></div> " +
		"		<div class=\"marker marker--s\"></div> " +
		"		<div class=\"marker marker--xs\"></div> " +
		"		<div class=\"marker marker--xxs\"></div> " +
		"		<div class=\"marker marker--stack\"></div> " +
		"	</div> " +
		"</div> " +
		"<!-- current grid position --> " +
		"<div id=\"gridsCurrentGridPosition\" class=\"grid\" style=\"visibility:hidden;\"></div> " +
		"<!-- current breakpoint --> " +
		"<div id=\"gridsCurrentBreakpoint\"></div> " +
		"<!-- marker indicator --> " +
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
		$(".gridlines").toggle();
		$(".gridlines-toggle").toggleClass("toggle-button--active");		
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
			showGridsNotification("Breakpoint \"marker\" overlays are only available for browser widths greater than the \"stack\" breakpoint (" + stackBreakpoint + "px).  Increase the size of your browser to enable this.", 8000);
		}
	});

	// bind notification for markers
	$(".markers .marker").on("click", function() {
		var breapointValue = $(this).css("margin-left");
		var breakpointColor = $(this).css("background-color");
		showGridsNotification("clicked breakpoint is at: <span class=\"grids-notification--keyword\">" + breapointValue + "</span><br><br>Breakpoint \"markers\" overlay a visual line on the page, showing each \"breapoint\" value defined in your GRIDS configuration.", 8000, breakpointColor);
	});
	// bind notification for marker indicator
	$(".marker-indicator").on("click", function() {
		showGridsNotification("The breakpoint indicator bar on the bottom of the page displays the current \"breakpoint\" that is trigged in the GRIDS framework.", 8000);
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
		"	<div class=\"innerMarker-stack\"></div> " +
		"	<div class=\"innerMarker-xxs\"></div> " +
		"	<div class=\"innerMarker-xs\"></div> " +
		"	<div class=\"innerMarker-s\"></div> " +
		"	<div class=\"innerMarker-m\"></div> " +
		"	<div class=\"innerMarker-l\"></div> " +
		"	<div class=\"innerMarker-xl\"></div> " +
		"	<div class=\"innerMarker-xxl\"></div> " +
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
			showGridsNotification("\"Column Markers\" are only available for browser widths greater than the \"stack\" breakpoint (" + stackBreakpoint + "px).  Increase the size of your browser to enable this.", 8000);
		}		
	});

	// bind the insert/remove of inner col markers
	// to click event of each columns
	$(":regex(class,col\\-[0-9])").on("click", function () {
		var isGridlinesCol = ($(this).parents(".gridlines").length > 0);

		if(isGridlinesCol) {
			showGridsNotification("The gridlines overlay is active, to toggle them off click the \"gridlines\" button in the bottom left corner.", 6000);
		}
		else {
			var isInnerColMarkersEnabled = ($(".col-markers-toggle.toggle-button--active").length > 0),
				gridlinesLeftPosition = $("#gridsCurrentGridPosition").position().left,
				thisGridLeftPosition = $(this).parent(".grid").position().left,
				isGridPositionValid = (thisGridLeftPosition === gridlinesLeftPosition);

			if (isInnerColMarkersEnabled) {
				var isNestedGrid = ($(this).parents(".grid").length > 1);
				if(!isNestedGrid) {
					if(isGridPositionValid) {
						var hasInnerMarkers = ($(this).find(".innerMarkers").length > 0);
						if (hasInnerMarkers) {
							// remove existing inner markers
							$(this).find(".innerMarkers").remove();
						}
						else {
							// add inner markers
							$(this).prepend(innerColMarkers);

							// set the inner marker left offset for
							// each breakpoint based on col size
							updateColMarkers();
						}
					}
					else {
						showGridsNotification("Can not show column markers for this element because its \"grid\" row width is not the same as your configured GRIDS width.  This is usual due to nesing a grid inside of an element that has left or right padding/margin.  If extra padding or margin is needed it is advised to do this within the colum where your content resides and not outside of the grid row itself.", 40000, "#c0392b");
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
			XXL: parseInt($(".marker.marker--xxl").css("margin-left")),
			XL: parseInt($(".marker.marker--xl").css("margin-left")),
			L: parseInt($(".marker.marker--l").css("margin-left")),
			M: parseInt($(".marker.marker--m").css("margin-left")),
			S: parseInt($(".marker.marker--s").css("margin-left")),
			XS: parseInt($(".marker.marker--xs").css("margin-left")),
			XXS: parseInt($(".marker.marker--xxs").css("margin-left")),
			Stack: parseInt($(".marker.marker--stack").css("margin-left"))
		};
		return gridBreakpoints;
	}

	var pageScrollbarWidth = getScrollbarWidth();
	var gridGutterWidth = getGutterWidth();
	var gridBreakpoints = getGridBreakpoints();


	// bind after browser resize to update col markers
	$(window).resize(function () {
		clearTimeout(this.id);
		this.id = setTimeout(updateColMarkers, 300);
	});
	// update col markers
	function updateColMarkers() {
		var $grid = $(".grid");
		var gridsCurrentBreakpoint = $("#gridsCurrentBreakpoint").width();
		viewportDisplayValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		
		// update default cols
		$grid.find("[class*=col-]").each(function() {
			// set the inner marker left offset for
			// each breakpoint based on the clicked 
			// col size
			var className = $(this).attr("class");
			if (className.match(/col\-[0-9]{1,2}/)) {
				var size = className.match(/col\-([0-9]{1,2})/, '$1');
				setInnerMarkerOffsets(this, size[1]);
			}
		});

		// update all breakpoint cols up to current breakpoint
		if (gridsCurrentBreakpoint > 0) {
			var breakpointCharacter;
			for (var prop in gridBreakpoints) {
				// set the breakpoint string character (xxl, xl, l, m, s, xs, xxs)
				breakpointCharacter = prop.toLowerCase();

				// for each matched breakpoint column set its inner markers
				$grid.find("[class*=col-" + breakpointCharacter + "-]").each(function() {
					var className = $(this).attr("class");
					var regExPattern = "col\\-" + breakpointCharacter + "\\-[0-9]{1,2}";
					if (className.match(regExPattern)) {
						regExPattern = "col\\-" + breakpointCharacter + "\\-([0-9]{1,2})";
						var size = className.match(regExPattern, '$1');
						setInnerMarkerOffsets(this, size[1]);
					}
				});

				// if we have looped down to the current breakpoint stop (we are at the smallest needed)
				if(gridBreakpoints[prop] == gridsCurrentBreakpoint) {
					break;
				}
			}
		}

		// update all col line styles
		for (var prop in gridBreakpoints) {
			// set the breakpoint string character (xxl, xl, l, m, s, xs, xxs)
			var breakpointCharacter = prop.toLowerCase();

			$grid.find("[class*=col-]").each(function(){
				var markIt = false;
				var allClasses = $(this).attr("class");
				// remove "margin" from class names to avoid false match on "m" breakpiont
				allClasses = allClasses.replace("-margin","");
				// if on stack breakpoint character, rename nostack to stack to ensure match
				if (breakpointCharacter == "stack") {
					allClasses = allClasses.replace("-nostack","-stack");
				}
				allClasses = allClasses.split(" ");
				
				for (var i in allClasses) {
					if (allClasses[i].indexOf("-" + breakpointCharacter) > -1) { 
						markIt = true; 
					}
				}

				if(markIt) {
					$(this).find(".innerMarker-" + breakpointCharacter).each(function(){
						var breakpointColor = $(this).css("border-right-color");
						$(this)
							.addClass("innerMarker--dotted")
							.css({ "border-right-width" : "3px", "border-right-style" : "dotted" })
							.attr({
								"data-bp-name" : breakpointCharacter,
								"data-bp-value" : gridBreakpoints[prop],
								"data-bp-color" : breakpointColor
							});
					});
				}
			});
		}
	}	
	// set the inner marker offsets per passed in col width (1-12)
	function setInnerMarkerOffsets(selector, size) {
		var borderWidth = "1px",
			borderStyle = "solid",
			borderStyleStack = "dashed",
			leftXXL, leftXL, leftL, leftM, leftS, leftXS, leftXXS;

		leftXXL = ((gridBreakpoints.XXL - gridGutterWidth - pageScrollbarWidth) * (size/12)) - gridGutterWidth;
		leftXL = ((gridBreakpoints.XL - gridGutterWidth - pageScrollbarWidth) * (size/12)) - gridGutterWidth;
		leftL = ((gridBreakpoints.L - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftM = ((gridBreakpoints.M - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftS = ((gridBreakpoints.S - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftXS = ((gridBreakpoints.XS - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftXXS = ((gridBreakpoints.XXS - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);
		leftStack = ((gridBreakpoints.Stack - gridGutterWidth - pageScrollbarWidth) * (size/12) - gridGutterWidth);

		var outlineWidth = $(selector).width(),
			outlineHeight = $(selector).height();
		var $innerMarkers = $(selector).find(".innerMarkers");
		
		$innerMarkers.find(".innerMarker-outline").css({ "width" : outlineWidth, "height" : outlineHeight });
		$innerMarkers.find(".innerMarker-xxl").css({ "margin-left" : leftXXL, "border-right-width" : borderWidth, "border-right-style" : borderStyle, "height" : outlineHeight });
		$innerMarkers.find(".innerMarker-xl").css({ "margin-left" : leftXL, "border-right-width" : borderWidth, "border-right-style" : borderStyle, "height" : outlineHeight });
		$innerMarkers.find(".innerMarker-l").css({ "margin-left" : leftL, "border-right-width" : borderWidth, "border-right-style" : borderStyle, "height" : outlineHeight });
		$innerMarkers.find(".innerMarker-m").css({ "margin-left" : leftM, "border-right-width" : borderWidth, "border-right-style" : borderStyle, "height" : outlineHeight });
		$innerMarkers.find(".innerMarker-s").css({ "margin-left" : leftS, "border-right-width" : borderWidth, "border-right-style" : borderStyle, "height" : outlineHeight });
		$innerMarkers.find(".innerMarker-xs").css({ "margin-left" : leftXS, "border-right-width" : borderWidth, "border-right-style" : borderStyle, "height" : outlineHeight });
		$innerMarkers.find(".innerMarker-xxs").css({ "margin-left" : leftXXS, "border-right-width" : borderWidth, "border-right-style" : borderStyle, "height" : outlineHeight });
		$innerMarkers.find(".innerMarker-stack").css({ "margin-left" : leftStack, "border-right-width" : borderWidth, "border-right-style" : borderStyleStack, "height" : outlineHeight });
	}
	// bind modifier notification
	$("body").on("mouseenter", ".innerMarker--dotted", function() {
		var className = $(this).parent().parent().attr("class");
		if ($(this).hasClass("innerMarker-s")) {
			// this is small breakpoint so we need to remove stack to avoid false positive
			className = className.replace("-nostack", "");
		}
		if ($(this).hasClass("innerMarker-stack")) {
			// this is stack breakpoint so we need to temp rename nostack to stack for nostack matches
			className = className.replace("-nostack", "-stack");
		}
		var allClasses = className.split(" ");
		var classes = "";
		var bpName = $(this).attr("data-bp-name");
		var bpValue = $(this).attr("data-bp-value");
		var bpColor = $(this).attr("data-bp-color");

		for(var prop in allClasses) {
			if(allClasses[prop].indexOf("-" + bpName) > -1) {
				classes = classes + "<div class=\"grids-notification--modifier\">" + allClasses[prop].replace("-stack", "-nostack") + "</div>";
			}
		}

		var message = "<div class=\"grids-notification--title\">Column Breakpoint Modifier(s)</div>" +
			"Breakpoint: <span class=\"grids-notification--keyword\">" + bpName.toUpperCase() + " (" + bpValue + "px)</span><br>" +
			"Breakpoint classes: " + classes;
		showGridsNotification(message, 7000, bpColor, "innerMarkerModifier");
	});
	// dismis modifier notification
	$("body").on("mouseleave", ".innerMarker--dotted", function() {
		var hook = $gridsNotification.attr("data-hook");
		if (hook) {
			$gridsNotification
				.removeClass("grids-notification--show grids-notification--slide-off-right")
				.attr("data-hook", "");
		}
	});
	// ****************************	



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
		showGridsNotification("The viewport helper in the top left corner displays the current \"viewport\" of your browser window.", 6000);
	});

	// bind browser resize to update viewport display value
	$(window).on("resize", function () {
		viewportDisplayValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		updateViewportDisplay("#viewportDisplay", "vp: " + viewportDisplayValue + "px");
	});	
	// ****************************	
});
