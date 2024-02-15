<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>World Map Outline with D3.js</title>
    <style>
        /* CSS styling for the map */
        path {
            fill: none;
            stroke: #000;
            stroke-width: 1;
        }
    </style>
</head>
<script>
    import {onMount} from 'svelte';
    import * as d3 from 'd3';
    import 'd3/dist/d3.v7.min.js';
    import 'd3-scale-chromatic/dist/d3-scale-chromatic.v1.min.js';
    import 'd3-geo-projection/dist/d3-geo-projection.v2.min.js';

let Data = [];
onMount(async () => {
    const res = await fetch('API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv');
    const csv = await res.text();

    // Split the CSV data into rows using '\n' as the row delimiter
    Data = d3.csvParse(csv, d3.autoType);
    console.log("Data:", Data);
});


// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([20, 30, 40, 50, 60, 70 ,80, 90, 100])
  .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, 'API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv', function(d) { data.set(d.code, +d.pop); })
  .await(ready);

function ready(error, topo) {

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
    }

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>


<!-- Create an element where the map will take place -->
<svg id="my_dataviz" width="2000" height="1500"></svg>
