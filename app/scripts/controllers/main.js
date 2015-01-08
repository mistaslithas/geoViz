'use strict';

/**
* @ngdoc function
* @name zipsApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the zipsApp
*/
angular.module('zipsApp')
.controller('MainCtrl', function ($scope) {
  var w = window.screen.width;
  var h = w/2;

  var svg = d3.select('#map').append('svg')
  .attr({
    width: w,
    height: h
  });

  // Display: geographic projection
  var proj = d3.geo.albersUsa().scale(w)
  .translate([w / 2, h / 2]);
  var path = d3.geo.path().projection(proj);

    // Display: state borders
    d3.json('scripts/us-states.geojson', function(states) {
       // Display: state outlines
       svg.append("g").attr("id", "states");
       d3.select("#states").selectAll("path")
       .data(states.features)
       .enter().append("path")
       .attr("d", path);
     })

    // Display: zipcodes
    function plotVizData(vizData) {
     svg.append("g").attr("id", "zipdots");
     d3.select("#zipdots").selectAll("rect")
     .data(vizData)
     .enter().append("rect")
     .attr("x", function(d) { var p = proj([d.lon, d.lat]); return p ? p[0] : null; })
     .attr("y", function(d) { var p = proj([d.lon, d.lat]); return p ? p[1] : null; })
     .attr("class", "unselected")
     .attr("width", 1).attr("height", 1);
   }

   function prepData(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  }

  function loadData(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.dataTransfer.files[0];
    var fileExtension = file.name.split('.').pop();
    var path = file.webkitRelativePath + file.name;

    switch(fileExtension) {
      case 'csv':
      d3.csv(path, plotVizData)
      break;
      case 'tsv':
      d3.tsv(path, plotVizData)
      break;
    }
  }

    // DragNDrop
    var map = document.getElementById('map');
    map.addEventListener('dragover', prepData, false);
    map.addEventListener('drop', loadData, false);

  });