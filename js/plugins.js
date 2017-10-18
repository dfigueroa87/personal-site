/* global $, alert, console*/

(function($) {
	"use strict";

	/* ---------------------------------------------------
		Loading Page 
	----------------------------------------------------- */
	$(window).on("load", function() {
		$(".loading").delay(300).addClass("loaded");
	});

	/* ---------------------------------------------------
		Launching and adjusting NiceScroll plugin 
	----------------------------------------------------- */
	$("html, body").niceScroll({
		scrollspeed: 40,
		mousescrollstep: 30,
		zindex: 9999,
		cursorwidth: 10,
		cursorborder: false,
		cursorborderradius: 0,
		cursorcolor: "#111"
	});

	/* ---------------------------------------------------
		Move to About section on clicking mouse icon 
	----------------------------------------------------- */
	$("#mouse").on("click", function() {
		$("html, body").animate({
			scrollTop: $("#about-me").offset().top
		}, 1000);
	});

	/* ---------------------------------------------------
		Adjusting the top nav Visibility 
	----------------------------------------------------- */
	// the top nav get visible when scrolling >= 600
	$(window).on("scroll", function() {
		$("#top-nav, #menu").addClass("transition");
		if ($(this).scrollTop() >= 600) {
			$("#top-nav, #menu").addClass("shown");
		} else {
			$("#top-nav, #menu").removeClass("shown");
		}
	});

	/* ---------------------------------------------------
		Back To Top Button
	----------------------------------------------------- */
	// showing the button when scroll > 400 
	var backToTop = $(".back-to-top");
	$(window).on("scroll", function() {
		if ($(this).scrollTop() >= 400) {
			backToTop.addClass("show-button");
		} else {
			backToTop.removeClass("show-button");
		}
	});

	// back to top on clicking the button
	backToTop.on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		}, 1200);
	});

	/* ---------------------------------------------------
		Animating Numbers at Facts Section 
	----------------------------------------------------- */
	$("#facts").appear(function() {
		$("#number_1").animateNumber({
			number: 14938	// Lines of code
		}, 2000)
		.prop('number', 14938)
		.animateNumber({
			number: 14998,	// Lines of code
			numberStep: $.animateNumber.numberStepFactories.separator(',')
		}, 50000);
		$("#number_2").animateNumber({
			number: 10		// Projects
		}, 2000);
		$("#number_3").animateNumber({
			number: 6,  	// Years of xp
			numberStep: $.animateNumber.numberStepFactories.append('+')
		}, 2000);
		$("#number_4").animateNumber({
			number: 847937,		// Smiles
			numberStep: $.animateNumber.numberStepFactories.separator(',')
		}, 2000);
	}, {
		accX: 0,
		accY: -150
	});

	/* ---------------------------------------------------
		Easy Pie Chart in Skills Section
	----------------------------------------------------- */
	$("#skills").appear(function() {
		$(".chart").easyPieChart({
			barColor: "#eaeaea",
			trackColor: false,
			scaleColor: false,
			lineWidth: 10,
			lineCap: "round",
			size: 150,
			animate: 1500
		});

		// start numbers animate at skills section //
		$("#chart_num_1").animateNumber({
			number: 88		// JS
		}, 1500);
		$("#chart_num_2").animateNumber({
			number: 95		// Node
		}, 1500);
		$("#chart_num_3").animateNumber({
			number: 73		// Angular
		}, 1500);
		$("#chart_num_4").animateNumber({
			number: 55		// PHP
		}, 1500);
	}, {
		accX: 0,
		accY: -150
	});

})(jQuery);
