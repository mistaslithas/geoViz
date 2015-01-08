"use strict";angular.module("zipsApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("zipsApp").controller("MainCtrl",["$scope",function(){function a(a){f.append("g").attr("id","zipdots"),d3.select("#zipdots").selectAll("rect").data(a).enter().append("rect").attr("x",function(a){var b=g([a.lon,a.lat]);return b?b[0]:null}).attr("y",function(a){var b=g([a.lon,a.lat]);return b?b[1]:null}).attr("class","unselected").attr("width",1).attr("height",1)}function b(a){a.stopPropagation(),a.preventDefault(),a.dataTransfer.dropEffect="copy"}function c(b){b.stopPropagation(),b.preventDefault();var c=b.dataTransfer.files[0],d=c.name.split(".").pop(),e=c.webkitRelativePath+c.name;switch(d){case"csv":d3.csv(e,a);break;case"tsv":d3.tsv(e,a)}}var d=window.screen.width,e=d/2,f=d3.select("#map").append("svg").attr({width:d,height:e}),g=d3.geo.albersUsa().scale(d).translate([d/2,e/2]),h=d3.geo.path().projection(g);d3.json("us-states.geojson",function(a){f.append("g").attr("id","states"),d3.select("#states").selectAll("path").data(a.features).enter().append("path").attr("d",h)});var i=document.getElementById("map");i.addEventListener("dragover",b,!1),i.addEventListener("drop",c,!1)}]),angular.module("zipsApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]);