// Load CSV and initialize
d3.csv("https://adachikazuya.github.io/InfoVis2024/W10/w10_task01.csv").then(data => {
    // Convert 'value' to number
    data.forEach(d => d.value = +d.value);

    let svg = d3.select('#drawing_region');
    update(data);

    // Reverse button functionality
    d3.select('#reverse')
        .on('click', () => {
            data.reverse();
            update(data);
        });
});

function update(data) {
    let padding = 10;
    let height = 20;

    let svg = d3.select('#drawing_region');

    // Bind data for rectangles
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .transition().duration(1000)
        .attr("x", padding)
        .attr("y", (d, i) => padding + i * (height + padding))
        .attr("width", d => d.value)
        .attr("height", height)
        .attr("fill", d => d.color);

    // Bind data for labels
    svg.selectAll("text")
        .data(data)
        .join("text")
        .transition().duration(1000)
        .attr("x", padding * 2)
        .attr("y", (d, i) => padding + i * (height + padding) + height / 1.5)
        .text(d => d.label)
        .attr("fill", "black")
        .attr("font-size", "12px");
}
