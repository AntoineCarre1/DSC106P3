<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let usData;
    let svg;

    onMount(async () => {
        const response = await fetch("https://d3js.org/d3.v4.js");
        const text = await response.text();
        eval(text);

        const response2 = await fetch("https://d3js.org/d3-scale-chromatic.v1.min.js");
        const text2 = await response2.text();
        eval(text2);

        const response3 = await fetch("https://d3js.org/d3-geo-projection.v2.min.js");
        const text3 = await response3.text();
        eval(text3);

        const response4 = await fetch("https://d3js.org/us-10m.v1.json");
        usData = await response4.json();

        svg = d3.select("#my_dataviz")
            .attr("viewBox", [0, 0, 975, 610])
            .attr("width", 975)
            .attr("height", 610)
            .attr("style", "max-width: 100%; height: auto;")
            .on("click", reset);

        const path = d3.geoPath();

        const g = svg.append("g");

        const states = g.append("g")
            .attr("fill", "#444")
            .attr("cursor", "pointer")
            .selectAll("path")
            .data(topojson.feature(usData, usData.objects.states).features)
            .join("path")
            .on("click", clicked)
            .attr("d", path);

        states.append("title")
            .text(d => d.properties.name);

        g.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path(topojson.mesh(usData, usData.objects.states, (a, b) => a !== b)));

        svg.call(zoom);

        function reset() {
            states.transition().style("fill", null);
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity,
                d3.zoomTransform(svg.node()).invert([975 / 2, 610 / 2])
            );
        }

        function clicked(event, d) {
            const [[x0, y0], [x1, y1]] = path.bounds(d);
            event.stopPropagation();
            states.transition().style("fill", null);
            d3.select(this).transition().style("fill", "red");
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(975 / 2, 610 / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / 975, (y1 - y0) / 610)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
                d3.pointer(event, svg.node())
            );
        }

        function zoomed(event) {
            const { transform } = event;
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
        }
    });
</script>

<main>
    <svg id="my_dataviz" />
</main>
