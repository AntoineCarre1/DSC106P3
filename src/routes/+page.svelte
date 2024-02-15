<script>
    import {onMount} from 'svelte';
    import * as d3 from 'd3';

let Data = [];
let svgRef;
onMount(async () => {
    const res = await fetch('API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv');
    const csv = await res.text();

    // Split the CSV data into rows using '\n' as the row delimiter
    Data = d3.csvParse(csv, d3.autoType);
    console.log("Data:", Data);
});

 // D3.js code to draw the outline of the world map
const svg = d3.select(svgRef);

</script>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>World Map Outline with D3.js</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        /* CSS styling for the map */
        path {
            fill: none;
            stroke: #000;
            stroke-width: 1;
        }
    </style>
</head>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
