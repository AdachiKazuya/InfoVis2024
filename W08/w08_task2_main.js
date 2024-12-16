 
var width = 256;
var height = 128;
var margin = {top:10, right:10, bottom:20, left:60};
  
var svg = d3.select('#drawing_region')
      .attr('width', width)
      .attr('height', height);

var chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
  
// const line = d3.line()
//       .x( d => d.x )
//       .y( d => d.y );
      
d3.csv("https://adachikazuya.github.io/InfoVis2024/W08/w08_task2.csv").then(data => {
      data.forEach(d => {
            d.x = +d.x;  
            d.y = +d.y; 
      });

      const xscale = d3.scaleLinear()
            .domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
            .range([0, innerWidth]);

      const yscale = d3.scaleLinear()
            .domain([d3.max(data, d => d.y), 0])
            .range([0, innerHeight]);

      const line = d3.line()
            .x(d => xscale(d.x))
            .y(d => yscale(d.y));


      chart.append('path')
            .attr('d', line(data))
            .attr('stroke', 'black')
            .attr('fill', 'none');

      chart.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xscale(d.x))  
            .attr('cy', d => yscale(d.y))  
            .attr('r', 3)    
            
      const xAxis = d3.axisBottom(xscale).ticks(5); 
      const yAxis = d3.axisLeft(yscale).ticks(5);  

      chart.append('g')
            .attr('transform', `translate(0, ${innerHeight})`) 
            .call(xAxis);

      chart.append('g')
            .call(yAxis);
});


  