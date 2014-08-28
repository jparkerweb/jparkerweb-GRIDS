$(document).ready(function(){function i(i,r,e){e="undefined"!=typeof e?e:"#2980b9";for(var s=0;s<l.length;s++)clearTimeout(l[s]);l=[],d.html(i).css("background",e).removeClass("grids-notification--slide-off-right").addClass("grids-notification--show"),l.push(setTimeout(function(){d.addClass("grids-notification--slide-off-right"),l.push(setTimeout(function(){d.removeClass("grids-notification--show grids-notification--slide-off-right")},300))},r))}function r(){var i=$(document).height()>$(window).height();if(i){var r=jQuery('<div style="width: 100%; height:200px;">test</div>'),e=jQuery('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append(r),s=r[0],t=e[0];jQuery("body").append(t);var a=s.offsetWidth;e.css("overflow","scroll");var n=t.clientWidth;return e.remove(),a-n}return 0}function e(){var i=parseInt($(".grid").last().css("padding-left"));return i}function s(){var i={XL:parseInt($(".marker.marker--xl").css("margin-left")),L:parseInt($(".marker.marker--l").css("margin-left")),M:parseInt($(".marker.marker--m").css("margin-left")),S:parseInt($(".marker.marker--s").css("margin-left")),XS:parseInt($(".marker.marker--xs").css("margin-left")),XXS:parseInt($(".marker.marker--xxs").css("margin-left"))};return i}function t(){var i=$(".grid"),r=$("#gridsCurrentBreakpoint").width();if(f=Math.max(document.documentElement.clientWidth,window.innerWidth||0),i.find("[class*=col-]").each(function(){var i=$(this).attr("class");if(i.match(/col\-[0-9]{1,2}/)){var r=i.match(/col\-([0-9]{1,2})/,"$1");a(this,r[1])}}),r>0){var e;for(var s in m)if(e=s.toLowerCase(),i.find("[class*=col-"+e+"-]").each(function(){var i=$(this).attr("class"),r="col\\-"+e+"\\-[0-9]{1,2}";if(i.match(r)){r="col\\-"+e+"\\-([0-9]{1,2})","$1";var s=i.match(r);a(this,s[1])}}),m[s]==r)break}for(var s in m){var e=s.toLowerCase();i.find("[class*=col-"+e+"-] .innerMarker-"+e).each(function(){$(this).css({"border-right-width":"3px","border-right-style":"dotted"})})}}function a(i,r){var e,s,t,a,n,o,d="1px",l="solid";e=(m.XL-h-g)*(r/12)-h,s=(m.L-h-g)*(r/12)-h,t=(m.M-h-g)*(r/12)-h,a=(m.S-h-g)*(r/12)-h,n=(m.XS-h-g)*(r/12)-h,o=(m.XXS-h-g)*(r/12)-h;var c=$(i).find(".innerMarkers");c.find(".innerMarker-xl").css({"margin-left":e,"border-right-width":d,"border-right-style":l}),c.find(".innerMarker-l").css({"margin-left":s,"border-right-width":d,"border-right-style":l}),c.find(".innerMarker-m").css({"margin-left":t,"border-right-width":d,"border-right-style":l}),c.find(".innerMarker-s").css({"margin-left":a,"border-right-width":d,"border-right-style":l}),c.find(".innerMarker-xs").css({"margin-left":n,"border-right-width":d,"border-right-style":l}),c.find(".innerMarker-xxs").css({"margin-left":o,"border-right-width":d,"border-right-style":l})}function n(i,r){$(i).html(r)}jQuery.expr[":"].regex=function(i,r,e){var s=e[3].split(","),t=/^(data|css):/,a={method:s[0].match(t)?s[0].split(":")[0]:"attr",property:s.shift().replace(t,"")},n="ig",o=new RegExp(s.join("").replace(/^\s+|\s+$/g,""),n);return o.test(jQuery(i)[a.method](a.property))};var o='<div id="gridsNotification" class="grids-notification"></div>';$("body").append(o);var d=$("#gridsNotification"),l=[];$("#gridsNotification").on("click",function(){d.removeClass("grids-notification--show grids-notification--slide-off-right")});var c=' <!-- 	******************************************************************* 	** Helper Markup - Gridline/Breakpoint Marker Overlay & Controls ** 	******************************************************************* --> <!-- gridlines --> <div class="gridlines"> 	<div class="grid"> 		<div class="col-1 col-no-stack"><div class="gridlines--col">1</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">2</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">3</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">4</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">5</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">6</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">7</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">8</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">9</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">10</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">11</div></div> 		<div class="col-1 col-no-stack"><div class="gridlines--col">12</div></div> 	</div> </div> <!-- markers for grid --> <div class="markers"> 	<div class="grid"> 		<div class="marker marker--xl"></div> 		<div class="marker marker--l"></div> 		<div class="marker marker--m"></div> 		<div class="marker marker--s"></div> 		<div class="marker marker--xs"></div> 		<div class="marker marker--xxs"></div> 		<div class="marker marker--stack"></div> 	</div> </div> <!-- current grid position --> <div id="gridsCurrentGridPosition" class="grid" style="visibility:hidden;"></div> <!-- current breakpoint --> <div id="gridsCurrentBreakpoint"></div> <!-- marker indicator --> <div class="marker-indicator"></div> <!-- gridlines toggle --> <div class="gridlines-toggle">gridlines</div> <!-- markers toggle --> <div class="markers-toggle">markers</div>	<!-- col markers toggle --> <div class="col-markers-toggle">col-markers</div>	<!-- ******************************************************************* -->  ';$("body").append(c),$(".gridlines-toggle").on("click",function(){$(".gridlines").toggle(),$(".gridlines-toggle").toggleClass("toggle-button--active")}),$(".gridlines").toggle(),$(".markers-toggle").on("click",function(){var r=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e=parseInt($(".marker.marker--stack").css("margin-left"));r>e?($(".markers").toggle(),$(".markers-toggle").toggleClass("toggle-button--active"),$("body").toggleClass("show-marker-outlines")):i('Breakpoint "marker" overlays are only available for browser widths greater than the "stack" breakpoint ('+e+"px).  Increase the size of your browser to enable this.",4e3)}),$(".markers .marker").on("click",function(){i('Markers overlay a visual line showing each "breapoint" value defined in your GRIDS configuration.',4e3)}),$(".marker-indicator").on("click",function(){i('The breakpoint indicator bar on the bottom of the page displays the current "breakpoint" that is trigged in the GRIDS framework.',4e3)}),$(".markers").toggle();var v=' <div class="innerMarkers"> 	<div class="innerMarker-outline"></div> 	<div class="innerMarker-xxs"></div> 	<div class="innerMarker-xs"></div> 	<div class="innerMarker-s"></div> 	<div class="innerMarker-m"></div> 	<div class="innerMarker-l"></div> 	<div class="innerMarker-xl"></div> </div> ';$(".col-markers-toggle").on("click",function(){var r=Math.max(document.documentElement.clientWidth,window.innerWidth||0),e=parseInt($(".marker.marker--stack").css("margin-left"));r>e?($(".innerMarkers").toggle(),$(".col-markers-toggle").toggleClass("toggle-button--active")):i('"Column Markers" are only available for browser widths greater than the "stack" breakpoint ('+e+"px).  Increase the size of your browser to enable this.",4e3)}),$(":regex(class,col\\-[0-9])").on("click",function(){var r=$(this).parents(".gridlines").length>0;if(r)i('The gridlines overlay is active, to toggle them off click the "gridlines" button in the bottom left corner.',5500);else{var e=$(".col-markers-toggle.toggle-button--active").length>0,s=$("#gridsCurrentGridPosition").position().left,a=$(this).parent(".grid").position().left,n=a===s;if(e){var o=$(this).parents(".grid").length>1;if(!o)if(n){var d=$(this).find(".innerMarkers").length>0;d?$(this).find(".innerMarkers").remove():($(this).prepend(v),t())}else i('Can not show column markers for this element because its "grid" row width is not the same as your configured GRIDS width.  This is usual due to nesing a grid inside of an element that has left or right padding/margin.  If extra padding or margin is needed it is advised to do this within the colum where your content resides and not outside of the grid row itself.',4e4,"#c0392b")}}});var g=r(),h=e(),m=s();$(window).resize(function(){clearTimeout(this.id),this.id=setTimeout(t,300)});var k='<div id="viewportDisplay" class="viewportDisplay"></div>';$("body").append(k);var f=Math.max(document.documentElement.clientWidth,window.innerWidth||0);n("#viewportDisplay","vp: "+f+"px"),$("#viewportDisplay").on("click",function(){i('The viewport helper in the top left corner displays the current "viewport" of your browser window.',4e3)}),$(window).on("resize",function(){f=Math.max(document.documentElement.clientWidth,window.innerWidth||0),n("#viewportDisplay","vp: "+f+"px")})});