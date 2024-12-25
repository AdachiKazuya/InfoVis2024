d3.csv("w10_task01.csv").then(data => {
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

    let rects = svg.selectAll("rect")
        .data(data, d => d.label); 

    rects.join(
        enter => enter.append("rect")
            .attr("x", padding)
            .attr("y", (d, i) => padding + i * (height + padding))
            .attr("width", 0) 
            .attr("height", height)
            .attr("fill", d => d.color)
            .call(enter => enter.transition().duration(1000)
                .attr("width", d => d.value) 
                .attr("y", (d, i) => padding + i * (height + padding))),
        update => update.call(update => update.transition().duration(1000)
            .attr("y", (d, i) => padding + i * (height + padding)) 
            .attr("width", d => d.value)), 
        exit => exit.call(exit => exit.transition().duration(500)
            .attr("width", 0) 
            .remove())
    );

    let labels = svg.selectAll("text")
        .data(data, d => d.label); 

    labels.join(
        enter => enter.append("text")
            .attr("x", padding * 2)
            .attr("y", (d, i) => padding + i * (height + padding) + height / 1.5) 
            .attr("fill", "black")
            .attr("font-size", "12px")
            .text(d => d.label)
            .call(enter => enter.transition().duration(1000)
                .attr("y", (d, i) => padding + i * (height + padding) + height / 1.5)),
        update => update.call(update => update.transition().duration(1000)
            .attr("y", (d, i) => padding + i * (height + padding) + height / 1.5)), 
        exit => exit.call(exit => exit.transition().duration(500)
            .attr("opacity", 0) 
            .remove())
    );
}
