d3.csv("https://adachikazuya.github.io/InfoVis2024/W10/w10_task01.csv").then(data => {
    data.forEach(d => d.value = +d.value);

    let svg = d3.select('#drawing_region');

    update(data);

    d3.select('#reverse').on('click', () => {
        data.reverse();
        update(data);
    });

    d3.select('#descend').on('click', () => {
        data.sort((a, b) => b.value - a.value);
        update(data);
    });

    d3.select('#ascend').on('click', () => {
        data.sort((a, b) => a.value - b.value);
        update(data);
    });
}).catch(error => {
    console.error("Error loading CSV file:", error);
});

function update(data) {
    let padding = 10;
    let height = 20;

    let svg = d3.select('#drawing_region');

    // Clear SVG before re-drawing
    svg.selectAll("*").remove();

    // Bind data for rectangles
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", padding)
        .attr("y", (d, i) => padding + i * (height + padding))
        .attr("width", d => d.value)
        .attr("height", height)
        .attr("fill", d => d.color);

    // Bind data for labels
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", padding * 2)
        .attr("y", (d, i) => padding + i * (height + padding) + height / 1.5)
        .text(d => d.label)
        .attr("fill", "black")
        .attr("font-size", "12px");
}
