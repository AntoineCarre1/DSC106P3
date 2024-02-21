<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let svg;
    let Data = [];
    const width = 1200;
    const height = 600;
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
            const valuemap = new Map(Data.map(d => [d.id, d.rate]));

            const zoom = d3.zoom()
                .scaleExtent([1, 8])
                .on("zoom", zoomed);

            svg = d3.select("#my_dataviz")
                .attr("viewBox", [0, 0, width, height])
                .attr("width", width)
                .attr("height", height)
                .attr("style", "max-width: 100%; height: auto;")
                .on("click", reset);

            svg.append("g")
                .attr("transform", "translate(610,20)")
                .append(() => d3.Legend(color, {title: "Unemployment rate (%)", width: 260}));

            svg.append("g")
                .selectAll("path")
                .data(world)
                .join("path")
                .attr("fill", d => color(valuemap.get(d.id)))
                .attr("d", path)
                .append("title")
                .text(d => `${d.properties.name}\n${valuemap.get(d.id)}%`);

            svg.append("path")
                .datum({type: "Sphere"})
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")
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
