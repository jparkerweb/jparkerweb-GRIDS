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
			.addClass("grids-notification--slide-off-right")
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
		"<div class=\"markersFlow\">" +
		"	<div class=\"markersFlow--stack\"></div>" +
		"	<div class=\"markersFlow--xxs\"></div>" +
		"	<div class=\"markersFlow--xs\"></div>" +
		"	<div class=\"markersFlow--s\"></div>" +
		"	<div class=\"markersFlow--m\"></div>" +
		"	<div class=\"markersFlow--l\"></div>" +
		"	<div class=\"markersFlow--xl\"></div>" +
		"	<div class=\"markersFlow--xxl\"></div>" +
		"</div>" +
		"<div class=\"markers\"> " +
		"	<div class=\"grid\"> " +
		"		<div class=\"marker marker--xxl\" data-flow=\"markersFlow--xxl\" data-name=\"XXL\"></div> " +
		"		<div class=\"marker marker--xl\" data-flow=\"markersFlow--xl\" data-name=\"XL\" ></div> " +
		"		<div class=\"marker marker--l\" data-flow=\"markersFlow--l\" data-name=\"L\" ></div> " +
		"		<div class=\"marker marker--m\" data-flow=\"markersFlow--m\" data-name=\"M\" ></div> " +
		"		<div class=\"marker marker--s\" data-flow=\"markersFlow--s\" data-name=\"S\" ></div> " +
		"		<div class=\"marker marker--xs\" data-flow=\"markersFlow--xs\" data-name=\"XS\" ></div> " +
		"		<div class=\"marker marker--xxs\" data-flow=\"markersFlow--xxs\" data-name=\"XXS\" ></div> " +
		"		<div class=\"marker marker--stack\" data-flow=\"markersFlow--stack\" data-name=\"STACK\" ></div> " +
		"	</div> " +
		"</div> " +
		"<!-- current grid position --> " +
		"<div id=\"gridsCurrentGridPosition\" class=\"grid\" style=\"visibility:hidden;\"></div> " +
		"<!-- current breakpoint --> " +
		"<div id=\"gridsCurrentBreakpoint\"></div> " +
		"<!-- gridlines toggle --> " +
		"<div class=\"gridlines-toggle\">gridlines</div> " +
		"<!-- markers toggle --> " +
		"<div class=\"markers-toggle\">markers</div>	" +
		"<!-- col markers toggle --> " +
		"<div class=\"col-markers-toggle\">col-markers</div>	" +
		"<!-- marker indicator --> " +
		"<div class=\"marker-indicator\"></div> " +
		"<!-- ******************************************************************* --> " +
	" ";

	// insert Gridline and Marker elements
	$("body").append(gridlinesAndMarkers);


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
		var XXL, XL, L, M, S, XS, XXS, Stack;
		XXL = $(".marker.marker--xxl").css("display") !== "none" ? parseInt($(".marker.marker--xxl").css("margin-left")) : 0;
		XL = $(".marker.marker--xl").css("display") !== "none" ? parseInt($(".marker.marker--xl").css("margin-left")) : 0;
		L = $(".marker.marker--l").css("display") !== "none" ? parseInt($(".marker.marker--l").css("margin-left")) : 0;
		M = $(".marker.marker--m").css("display") !== "none" ? parseInt($(".marker.marker--m").css("margin-left")) : 0;
		S = $(".marker.marker--s").css("display") !== "none" ? parseInt($(".marker.marker--s").css("margin-left")) : 0;
		XS = $(".marker.marker--xs").css("display") !== "none" ? parseInt($(".marker.marker--xs").css("margin-left")) : 0;
		XXS = $(".marker.marker--xxs").css("display") !== "none" ? parseInt($(".marker.marker--xxs").css("margin-left")) : 0;
		Stack = $(".marker.marker--stack").css("display") !== "none" ? parseInt($(".marker.marker--stack").css("margin-left")) : 0;

		var gridBreakpoints = {
			XXL: XXL,
			XL: XL,
			L: L,
			M: M,
			S: S,
			XS: XS,
			XXS: XXS,
			Stack: Stack
		};
		return gridBreakpoints;
	}

	var pageScrollbarWidth = getScrollbarWidth();
	var gridGutterWidth = getGutterWidth();
	var gridBreakpoints = getGridBreakpoints();

	// remove unneeded toolbox html elements (if any breakpoints are disabled)
	for (var prop in gridBreakpoints) {
		if(gridBreakpoints[prop] === 0){
			$(".markersFlow--" + prop.toLowerCase()).remove();
			$(".marker.marker--" + prop.toLowerCase()).remove();
			delete gridBreakpoints[prop];
		}
	}


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

		if (viewportValue > stackBreakpoint || isNaN(stackBreakpoint)) {
			$(".markers").toggle();
			$(".markers-toggle").toggleClass("toggle-button--active");
			$("body").toggleClass("show-marker-outlines");
		}
		else {
			showGridsNotification("Breakpoint \"marker\" tabs are only available for browser widths greater than the \"stack\" breakpoint (" + stackBreakpoint + "px).  Increase the size of your browser to enable this.", 8000);
		}
	});

	// bind notification for markers
	$(".markers .marker").on("click", function() {
		var breapointValue = $(this).css("margin-left");
		var breakpointColor = $(this).css("background-color");
		var breakpointName = $(this).attr("data-name");
		showGridsNotification("<span class=\"grids-notification--keyword\">" + breakpointName + "</span> breakpoint is at: <span class=\"grids-notification--keyword\">" + breapointValue + "</span><br><br>Breakpoint \"markers\" afix color-coded tabs along the top of the page, showing each \"breapoint\" value defined in your GRIDS configuration.  Clicking a tab will show its defined value here.<br><br>To trigger this viewport in your GRIDS framework simply resize your browser window to be smaller than this breakpoint.", 12000, breakpointColor);
	});
	// bind markers mouseenter for breakpoint shading
	$(".markers .marker").on("mouseenter", function(event){
		// on show marker flow if mouse is near our :before & :after elements (not the line itself)
		//if (event.screenY <= 140) {
			var offsetWidth = $(this).offset().left;
			var bgColor = $(this).css("background-color");
			var markersFlow = "." + $(this).attr("data-flow");
			$(markersFlow).css({ "width" : offsetWidth, "height" : "100%" });
		//}
	});
	// bink markers mouseleave to hide breakpoint shading
	$(".markers .marker").on("mouseleave", function(){
		var markersFlow = "." + $(this).attr("data-flow");
		$(markersFlow).css({ "width" : "0px", "height" : "0px" });
	});
	// bind notification for marker indicator
	$(".marker-indicator").on("click", function() {
		var bpColor = $(this).css("background-color");
		showGridsNotification("The breakpoint indicator bar on the bottom of the page displays the current \"breakpoint\" name and value that is trigged in the GRIDS framework.", 8000, bpColor);
	});

	// toggle off markers on page load
	$(".markers").toggle();
	// *********************************



	// *****************************
	// ***** Inner Col Markers *****
	// *****************************
	// inner col markers
	function getInnerColMarksHTML() {
		var innerColMarkers;
		innerColMarkers = "<div class=\"innerMarkers\">" +
			"	<div class=\"innerMarker-outline\"></div>" +
			"	<div class=\"innerMarker-default\"></div>";
		for (var prop in gridBreakpoints) {
			innerColMarkers = innerColMarkers + "	<div class=\"innerMarker-" + prop.toLowerCase() + "\"></div>";
		}
		innerColMarkers = innerColMarkers + "</div>";
		return innerColMarkers;
	}
	var innerColMarkers = getInnerColMarksHTML();

	// bind toggle button
	$(".col-markers-toggle").on("click", function() {
		var viewportValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		var stackBreakpoint = parseInt($(".marker.marker--stack").css("margin-left"));

		if (viewportValue > stackBreakpoint || isNaN(stackBreakpoint)) {
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
			var isInnerColMarkersEnabled = ($(".col-markers-toggle.toggle-button--active").length > 0);

			if (isInnerColMarkersEnabled) {
				var gridlinesLeftPosition = $("#gridsCurrentGridPosition").position().left,
					thisGridLeftPosition = $(this).parent(".grid").position().left,
					isGridPositionValid = (thisGridLeftPosition === gridlinesLeftPosition),
					thisGridPaddingLeft = parseInt($(this).parent(".grid").css("padding-left")),
					thisGridPaddingRight = parseInt($(this).parent(".grid").css("padding-right")),
					isGridRowPaddingValid = ( thisGridPaddingRight === 0 && thisGridPaddingLeft === gridGutterWidth ),
					isNestedGrid = ($(this).parents(".grid").length > 1);

				if(!isNestedGrid) {
					if(isGridPositionValid && isGridRowPaddingValid) {
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
						var errorMessage;
						errorMessage = "Can not show column markers for this element because its \"grid\" row width is not the same as your configured GRIDS width.  This is usual due to nesing a grid inside of an element that has left or right padding/margin OR changing the grid row's padding using an external style.  If extra padding or margin is needed it is advised to do this within the colum where your content resides and not outside of the grid row itself.<br><br>Grid rows should only contain the <span class=\"grids-notification--keyword\">.grid</span> class or one of the other .grid- utility classes.";
						showGridsNotification(errorMessage, 40000, "#c0392b");
					}
				}
			}
		}
	});

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
					var regExPattern = "col\\-" + breakpointCharacter + "\\-[0-9]{1,2}(?!-)";
					if (className.match(regExPattern)) {
						regExPattern = "col\\-" + breakpointCharacter + "\\-([0-9]{1,2})(?!-)";
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
				// if on "m" breakpoint remove "margin" from class names to avoid false match
				if (breakpointCharacter == "m") {
					allClasses = allClasses.replace("-margin","");
				}
				// if on stack breakpoint character, rename nostack to stack to ensure match
				if (breakpointCharacter == "stack") {
					allClasses = allClasses.replace("-nostack","-stack");
				}
				// if on "s" breakpoint character, rename to stack to Xstack to no false positives are found
				if (breakpointCharacter == "s") {
					allClasses = allClasses.replace("-stack","-Xstack");
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
							.css({ 
								"border-right-width" : "3px", 
								"border-right-style" : "dotted" 
							})
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
		$innerMarkers.find(".innerMarker-default").css({ "margin-left" : "0px", "border-right-width" : "2px", "border-right-style" : "solid", "height" : outlineHeight });
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
	$("body").on("mouseenter", ".innerMarker--dotted, .innerMarker-default", function() {
		var className = $(this).parent().parent().attr("class");
		var allClasses, classes, bpName, bpValue, bpColor, message; 

		// if default marker, filter out all breakpoint classes
		if ($(this).hasClass("innerMarker-default")) {
			var regExPattern = /col-[0-9]{1,2}|col-push-[0-9]{1,2}|col-(newline|Xnewline|throwright|Xthrowright)(?!-)|col-(margin|padding)-(top|bottom)-(0x|1x|2x|3x)(?!-)/g;
			allClasses = className.match(regExPattern);
			classes = "";
			bpName = "Default";
			bpColor = $(this).css("border-right-color");

			// collect default class names
			for(var prop in allClasses) {
				classes = classes + "<div class=\"grids-notification--modifier\">" + allClasses[prop] + "</div>";
			}

			message = "<div class=\"grids-notification--title\">Default Column Properties</div>" +
				"Breakpoint: <span class=\"grids-notification--keyword\">None</span><br>" +
				"Default classes: " + classes;			
		}
		// breakpoint marker
		else {
			if ($(this).hasClass("innerMarker-s")) {
				// this is small breakpoint so we need to remove stack to avoid false positive
				className = className.replace("-nostack", "");
				className = className.replace("-stack", "");
			}
			if ($(this).hasClass("innerMarker-stack")) {
				// this is stack breakpoint so we need to temp rename nostack to stack for nostack matches
				className = className.replace("-nostack", "-stackXno");
			}
			allClasses = className.split(" ");
			classes = "";
			bpName = $(this).attr("data-bp-name");
			bpValue = $(this).attr("data-bp-value");
			bpColor = $(this).attr("data-bp-color");

			// collect breakpoint class names
			for(var prop in allClasses) {
				if(allClasses[prop].indexOf("col-" + bpName) > -1) {
					classes = classes + "<div class=\"grids-notification--modifier\">" + allClasses[prop].replace("-stackXno", "-nostack") + "</div>";
				}
			}

			message = "<div class=\"grids-notification--title\">Column Breakpoint Modifier</div>" +
				"Breakpoint: <span class=\"grids-notification--keyword\">" + bpName.toUpperCase() + " (" + bpValue + "px)</span><br>" +
				"Breakpoint classes: " + classes;
		}

		showGridsNotification(message, 8000, bpColor, "innerMarkerModifier");
	});
	// dismiss modifier notification
	$("body").on("mouseleave", ".innerMarker--dotted, .innerMarker-default", function() {
		var hook = $gridsNotification.attr("data-hook");
		if (hook) {
			$gridsNotification
				.addClass("grids-notification--slide-off-right")
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
	function updateViewportDisplay(html) {
		$("#viewportDisplay").html(html);
	}
	// set initial viewport display value
	updateViewportDisplay("vp: " + viewportDisplayValue + "px");

	// bind notification message
	$("#viewportDisplay").on("click", function() {
		var bpColor = $(this).css("background-color");
		showGridsNotification("The viewport indicator in the top left corner of the page displays the current <span class=\"grids-notification--keyword\">viewport</span> of your browser window.", 6000, bpColor);
	});

	// bind browser resize to update viewport display value and dismiss
	// any open notifications
	$(window).on("resize", function () {
		// update viewport display value
		viewportDisplayValue = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		updateViewportDisplay("vp: " + viewportDisplayValue + "px");
		
		// dismiss any open notifications
		$("#gridsNotification")
			.addClass("grids-notification--slide-off-right")
			.attr("data-hook", "");
	});	
	// ****************************	


	
	// ***********************	
	// ***** cheat sheet *****
	// ***********************
	var cheatSheetContent = "" +
		"<!-- grid row -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Grid Row:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.grid</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;<span class=\"cheat-sheet--attention\">grid</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- column -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-[0-12]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;<span class=\"cheat-sheet--attention\">col-6</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- push column -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Push Column:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-push-[0-12]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;<span class=\"cheat-sheet--attention\">col-push-3</span> col-6&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Breakpoint Column Modifiers -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Breakpoint Column Modifiers:</span></div>" +
		"	<div class=\"col-9 col-m-12\">" +
		"     <span class=\"cheat-sheet--keyword\">.col-[breakpoint]-[0-12]</span>" +
		"     <div class=\"cheat-sheet--caption\"><span class=\"cheat-sheet--keyword\">[<span class=\"cheat-sheet--attention2\">breakpoint</span>]</span> = <span class=\"cheat-sheet--attention2\">xxl</span>, <span class=\"cheat-sheet--attention2\">xxl</span>, <span class=\"cheat-sheet--attention2\">l</span>, <span class=\"cheat-sheet--attention2\">m</span>, <span class=\"cheat-sheet--attention2\">s</span>, <span class=\"cheat-sheet--attention2\">xs</span>, <span class=\"cheat-sheet--attention2\">xxs</span></div>" +
		"   </div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-12 <span class=\"cheat-sheet--attention\">col-xl-6</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Breakpoint Push Column -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Breakpoint Push Column:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-[breakpoint]-push-[0-12]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-6 <span class=\"cheat-sheet--attention\">col-xl-push-3</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Grid No Stack Modifier -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Grid No Stack Modifier:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.grid-nostack</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid <span class=\"cheat-sheet--attention\">grid-nostack</span>&quot;&gt;&hellip;&lt;/div&gt;			" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Column No Stack Modifier -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column No Stack Modifier:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-nostack</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-4 <span class=\"cheat-sheet--attention\">col-nostack</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"  &lt;div class=&quot;col-8 <span class=\"cheat-sheet--attention\">col-nostack</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;		" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Grid Margin/Padding Modifiers -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Grid Margin/Padding Modifiers:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.grid-[margin/padding]-[top/bottom]-[0x/1x/2x/3x]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid <span class=\"cheat-sheet--attention\">grid-padding-top-2x</span> <span class=\"cheat-sheet--attention\">grid-margin-bottom-1x</span>&quot;&gt;&hellip;&lt;/div&gt;		" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Column Margin/Padding Modifiers -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column Margin/Padding Modifiers:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-[margin/padding]-[top/bottom]-[0x/1x/2x/3x]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-12 <span class=\"cheat-sheet--attention\">col-padding-top-2x</span> <span class=\"cheat-sheet--attention\">col-padding-bottom-2x</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;		" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Grid Breakpoint Margin/Padding Modifiers -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Grid Breakpoint Margin/Padding Modifiers:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.grid-[margin/padding]-[top/bottom]-[0x/1x/2x/3x]-[breakpoint]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid <span class=\"cheat-sheet--attention\">grid-margin-top-3x-xxs</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Column Breakpoint Margin/Padding Modifiers -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column Breakpoint Margin/Padding Modifiers:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-[margin/padding]-[top/bottom]-[0x/1x/2x/3x]-[breakpoint]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-11 <span class=\"cheat-sheet--attention\">col-padding-bottom-1x-xxs</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Grid Nostack Modifier -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Grid Nostack Modifier:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.grid-nostack</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid <span class=\"cheat-sheet--attention\">grid-nostack</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Column Nostack Modifer -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column Nostack Modifer:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-nostack</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-6 <span class=\"cheat-sheet--attention\">col-nostack</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Grid Reverse Column Order -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Grid Reverse Column Order:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.grid-reverse</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid <span class=\"cheat-sheet--attention\">grid-reverse</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Grid Breakpoint Reverse / Unreverse -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Grid Breakpoint Reverse / Unreverse:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.grid-[reverse/Xreverse]-[breakpoint]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid grid-reverse <span class=\"cheat-sheet--attention\">grid-Xreverse-m</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Grid Nostack AND Reverse / Unreverse -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Grid Nostack AND Reverse / Unreverse:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.grid-[reverse/Xreverse]-nostack</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid <span class=\"cheat-sheet--attention\">grid-reverse-nostack</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Column Throw Right Modifier -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column Throw Right Modifier:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-[throwright/Xthrowright]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-3 <span class=\"cheat-sheet--attention\">col-throwright</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"  &lt;div class=&quot;col-9&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Column Breakpoint Throw Right Modifier -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column Breakpoint Throw Right Modifier:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-[throwright/Xthrowright]-[breakpoint]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-3 col-throwright <span class=\"cheat-sheet--attention\">col-Xthrowright-s</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"  &lt;div class=&quot;col-9&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Column Newline Modifier -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column Newline Modifier:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-[newline/Xnewline]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-3&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"  &lt;div class=&quot;col-9 <span class=\"cheat-sheet--attention\">col-newline</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	" +
		"<!-- Column Breakpoint Newline Modifier -->" +
		"<div class=\"grid\">" +
		"	<div class=\"col-3 col-m-12\"><span class=\"cheat-sheet--label\">Column Breakpoint Newline Modifier:</span></div>" +
		"	<div class=\"col-9 col-m-12\"><span class=\"cheat-sheet--keyword\">.col-[newline/Xnewline]-[breakpoint]</span></div>" +
		"</div>" +
		"<div class=\"grid\">" +
		"	<div class=\"col-push-3 col-9 col-m-push-0 col-m-12\">" +
		"		<pre class=\"cheat-sheet--codeblock\">" +
		"&lt;div class=&quot;grid&quot;&gt;\n" +
		"  &lt;div class=&quot;col-3&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"  &lt;div class=&quot;col-9 col-newline <span class=\"cheat-sheet--attention\">col-Xnewline-xl</span>&quot;&gt;&hellip;&lt;/div&gt;\n" +
		"&lt;/div&gt;\n" +
		"</pre>" +
		"	</div>" +
		"</div>	";

	var cheatSheetHTML = "" +
		"<!-- cheat sheet toggle --> " +
		"<div class=\"cheat-sheet-toggle\">cheat sheet</div> " +
		"<!-- cheat sheet markup -->" +
		"<div class=\"cheat-sheet--canvas cheat-sheet--canvas--hidden\"> " +
		"	<div class=\"cheat-sheet--wrapper\"> " +
		"	<div class=\"cheat-sheet--title\">GRIDS Cheat Sheet</div>" +
		"		<span class=\"cheat-sheet--dismiss\">X</span>" +
		"		<div class=\"cheat-sheet--content\">" +
		cheatSheetContent +
		"		</div>" +
		"	</div> " +
		"</div> ";

	$("body").append(cheatSheetHTML);

	// bind cheet sheet button
	$("body").on("click", ".cheat-sheet-toggle", function(){
		var wrapperHeight = parseInt($(".cheat-sheet--wrapper").height()),
			wrapperBottomPadding = parseInt($(".cheat-sheet--wrapper").css("padding-bottom")),
			cheetSheetTitleHeight = parseInt($(".cheat-sheet--title").height()),
			contentHeight = wrapperHeight - wrapperBottomPadding - cheetSheetTitleHeight; 
		$(".cheat-sheet--content").height(contentHeight);

		// show cheat sheet
		$(".cheat-sheet--canvas").removeClass("cheat-sheet--canvas--hidden");
		// remove scrollbar from main html doc to prevent scrolling it while viewing cheat sheet
		$("body").css("overflow-y", "hidden");
	});
	// bind cheat sheet dismiss
	$("body").on("click", ".cheat-sheet--dismiss, .cheat-sheet--canvas", function(event) {
		var targetDismissButton = $(event.target).hasClass("cheat-sheet--dismiss"); 
		var targetCanvas = $(event.target).hasClass("cheat-sheet--canvas"); 
		if (targetDismissButton || targetCanvas) {
			// hide cheat sheet
			$(".cheat-sheet--canvas").addClass("cheat-sheet--canvas--hidden");
			// restore scrollbar to main html doc
			$("body").css("overflow-y", "auto");
		}
	});	
});
