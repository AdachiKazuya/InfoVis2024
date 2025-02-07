d3.csv("https://adachikazuya.github.io/InfoVis2024/FinalTask/data.csv").then(data => {
    data.forEach(d => {
        d.GDP = +d.GDP;   // GDPを数値に変換
        d.GNI = +d.GNI;   // GNIを数値に変換
        d.population = +d.population;  // 人口を数値に変換
        d.GDPChange = d.GDP; // GDP変化量 (仮のデータとして使用)
        d.GNIChange = d.GNI; // GNI変化量 (仮のデータとして使用)
    });

    const scatterWidth = 600, scatterHeight = 400;
    const xScale = d3.scaleLinear().domain([d3.min(data, d => d.GDPChange), d3.max(data, d => d.GDPChange)]).range([50, scatterWidth - 50]);
    const yScale = d3.scaleLinear().domain([d3.min(data, d => d.GNIChange), d3.max(data, d => d.GNIChange)]).range([scatterHeight - 50, 50]);

    const scatterSvg = d3.select("#scatterPlot");
    
    // タイトルの追加
    scatterSvg.append("text")
        .attr("x", scatterWidth / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .text("GDPとGNIの関係");

    // X軸ラベル
    scatterSvg.append("text")
        .attr("x", scatterWidth / 2)
        .attr("y", scatterHeight - 10)
        .attr("text-anchor", "middle")
        .text("GDPの変化量");

    // Y軸ラベル
    scatterSvg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -scatterHeight / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("GNIの変化量");

    scatterSvg.append("g").attr("transform", `translate(0, ${scatterHeight - 50})`).call(d3.axisBottom(xScale));
    scatterSvg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(yScale));

    scatterSvg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("class", "scatter-point")
        .attr("cx", d => xScale(d.GDPChange))
        .attr("cy", d => yScale(d.GNIChange))
        .attr("r", 5)
        .attr("fill", d => d.population === 1 ? "red" : "blue");  // populationが1なら赤、0なら青

    scatterSvg.selectAll("text.label")
        .data(data)
        .enter().append("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.GDPChange) + 5)
        .attr("y", d => yScale(d.GNIChange) - 5)
        .text(d => d.country);

    // populationChangeに基づいて棒グラフの色を設定
    const popGroup = d3.group(data, d => d.populationChange);
    const barData = [
        {category: "増加", count: popGroup.get("increase") ? popGroup.get("increase").length : 0, color: "red"},
        {category: "減少", count: popGroup.get("decrease") ? popGroup.get("decrease").length : 0, color: "blue"}
    ];

    const barWidth = 400, barHeight = 300;
    const xBarScale = d3.scaleBand().domain(barData.map(d => d.category)).range([50, barWidth - 50]).padding(0.3);
    const yBarScale = d3.scaleLinear().domain([0, d3.max(barData, d => d.count)]).range([barHeight - 50, 50]);

    const barSvg = d3.select("#barChart");

    // タイトルの追加
    barSvg.append("text")
        .attr("x", barWidth / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .text("先進国の人口変異傾向");

    // X軸ラベル
    barSvg.append("text")
        .attr("x", barWidth / 2)
        .attr("y", barHeight - 10)
        .attr("text-anchor", "middle")
        .text("人口変異");

    // Y軸ラベル
    barSvg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -barHeight / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("国数");

    barSvg.append("g").attr("transform", `translate(0, ${barHeight - 50})`).call(d3.axisBottom(xBarScale));
    barSvg.append("g").attr("transform", "translate(50,0)").call(d3.axisLeft(yBarScale));

    barSvg.selectAll("rect")
        .data(barData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xBarScale(d.category))
        .attr("y", d => yBarScale(d.count))
        .attr("width", xBarScale.bandwidth())
        .attr("height", d => barHeight - 50 - yBarScale(d.count))
        .attr("fill", d => d.color);  // 増加は赤、減少は青
});
