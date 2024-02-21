<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let svg;
    let Data = [];
    const width = 2400;
    const height = 1800;
    let world = [];
    onMount(async () => {
        const res = await fetch('API_SP.DYN.LE00.IN_DS2_en_csv_v2_46.csv');
        const csv = await res.text();
        Data = d3.csvParse(csv, d3.autoType);
        console.log("Data:", Data);

        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(data => {
            world = data.features;
        
            const color = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);
            const path = d3.geoPath();
            const format = d => `${d}%`;
            const valuemap = new Map(Data.map(d => [d.Country_Code, d.y1960]));

            const zoom = d3.zoom()
                .scaleExtent([1, 8])
                .on("zoom", zoomed);

            svg = d3.select("#my_dataviz")
                .attr("viewBox", [0, 0, width, height])
                .attr("width", width)
                .attr("height", height)
                .attr("style", "max-width: 100%; height: auto;")
                .on("click", reset);

            //svg.append("g")
                //.attr("transform", "translate(610,20)");
                //.call(d3.legendColor().title("Unemployment rate (%)").scale(color));

            svg.append("g")
                .selectAll("path")
                .data(world)
                .join("path")
                .attr("fill", d => color(valuemap.get(d.Country_Code)))
                .attr("d", path)
                .append("title")
                .text(d => `${d.properties.name}\n${valuemap.get(d.Country_Code)}%`);

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
    });
</script>

<main>
    <svg id="my_dataviz" />
</main>
