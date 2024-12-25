d3.csv("https://adachikazuya.github.io/InfoVis2024/W10/w10_task02.csv").then(data => {
    data.forEach(d => {
        d.x = +d.x;
        d.y = +d.y;
    });

    const svg = d3.select("#drawing_region");
    const tooltip = d3.select("#tooltip");
    const padding = 10;

    let circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 10)
        .attr("fill", "steelblue");

    circles
        .on("mouseover", (e, d) => {
            tooltip
                .style("opacity", 1)
                .html(`<div class="tooltip-label">Position</div>(${d.x}, ${d.y})`);
            d3.select(e.target).attr("fill", "orange");
        })
        .on("mousemove", (e) => {
            tooltip
                .style("left", (e.pageX + padding) + "px")
                .style("top", (e.pageY + padding) + "px");
        })
        .on("mouseleave", (e) => {
            tooltip.style("opacity", 0);
            d3.select(e.target).attr("fill", "steelblue");
        });

    d3.select("#sortX").on("click", () => {
        data.sort((a, b) => a.x - b.x);
        updateCircles();
    });

    d3.select("#sortY").on("click", () => {
        data.sort((a, b) => a.y - b.y);
        updateCircles();
    });

    d3.select("#reset").on("click", () => {
        data.sort((a, b) => a.x - b.x);
        updateCircles();
    });

    function updateCircles() {
        circles.data(data)
            .transition().duration(1000)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});
