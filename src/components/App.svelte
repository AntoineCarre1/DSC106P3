<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import Marks from "./Marks.svelte";

    let svg;
    let Data = [];
    const width = 1200;
    const height = 600;
    onMount(async () => {
        const res = await fetch('API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv');
        const csv = await res.text();
        Data = d3.csvParse(csv, d3.autoType);
        console.log("Data:", Data);

        let world = [];
        json(
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
        ).then((data) => {
            world = data.features;
         });

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        svg = d3.select("#my_dataviz")
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height)
            .attr("style", "max-width: 100%; height: auto;")
            .on("click", reset);

        

    const projection = d3.geoNaturalEarth1().fitSize([width, height], world);
    const path = d3.geoPath(projection);

    svg.append("path")
            .datum(d3.geoGraticule())
            .attr("class", "graticule")
            .attr("d", path);

    svg.call(zoom);

    function reset() {
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity,
            d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
    }

    function zoomed(event) {
        const { transform } = event;
        svg.selectAll("path")
            .attr("transform", transform)
            .attr("stroke-width", 1 / transform.k);
    }
});
</script>

<main>
    
    <svg {width} {height}>
        <Marks {world} />
      </svg>
    <svg id="my_dataviz" />
</main>
