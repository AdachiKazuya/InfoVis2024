d3.csv("https://adachikazuya.github.io/InfoVis2024/FinalTask/data.csv").then(data => {
    data.forEach(d => {
        d.GDP = +d.GDP;   // GDPを数値に変換
        d.GNI = +d.GNI;   // GNIを数値に変換
        d.population = +d.population;  // 人口を数値に変換
    });

    const scatterWidth = 600, scatterHeight = 400;
    const xScale = d3.scaleLinear().domain([d3.min(data, d => d.GDP), d3.max(data, d => d.GDP)]).range([50, scatterWidth - 50]);
    const yScale = d3.scaleLinear().domain([d3.min(data, d => d.GNI), d3.max(data, d => d.GNI)]).range([scatterHeight - 50, 50]);

    const scatterSvg = d3.select("#scatterPlot");
    scatterSvg.append("g").attr("transform", `translate(0, ${scatterHeight - 50})`).call(d3.axisBottom(xScale));
    scatterSvg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(yScale));

    scatterSvg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "scatter-point")
        .attr("cx", d => xScale(d.GDP))
        .attr("cy", d => yScale(d.GNI))
        .attr("r", 5)
        .attr("fill", d => d.population === 1 ? "red" : "blue");  // populationが1なら赤、0なら青

    scatterSvg.selectAll("text.label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.GDP) + 5)
        .attr("y", d => yScale(d.GNI) - 5)
        .text(d => d.country);

    const popGroup = d3.group(data, d => d.populationChange);
    const barData = [
        {category: "増加", count: popGroup.get("increase") ? popGroup.get("increase").length : 0},
        {category: "減少", count: popGroup.get("decrease") ? popGroup.get("decrease").length : 0}
    ];

    const barWidth = 400, barHeight = 300;
    const xBarScale = d3.scaleBand().domain(barData.map(d => d.category)).range([50, barWidth - 50]).padding(0.3);
    const yBarScale = d3.scaleLinear().domain([0, d3.max(barData, d => d.count)]).range([barHeight - 50, 50]);

    const barSvg = d3.select("#barChart");
    barSvg.append("g").attr("transform", `translate(0, ${barHeight - 50})`).call(d3.axisBottom(xBarScale));
    barSvg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(yBarScale));

    barSvg.selectAll("rect")
        .data(barData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xBarScale(d.category))
        .attr("y", d => yBarScale(d.count))
        .attr("width", xBarScale.bandwidth())
        .attr("height", d => barHeight - 50 - yBarScale(d.count));
});
