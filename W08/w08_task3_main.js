var data = [
      {label:'Apple', value:100},
      {label:'Banana', value:200},
      {label:'Cookie', value:50},
      {label:'Doughnut', value:120},
      {label:'Egg', value:80}
  ];
  
  var width = 256;
  var height = 256;
  var radius = Math.min( width, height ) / 2;
  
  var svg = d3.select('#drawing_region')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2}, ${height/2})`);
  
d3.csv("https://adachikazuya.github.io/InfoVis2024/W08/w08_task1.csv").then( data => {
      data.forEach(d => {
            d.value = +d.value; 
      });

      const pie = d3.pie()
            .value( d => d.value );

      const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

      svg.selectAll('pie')
            .data( pie(data) )
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', d => d.data.color)
            .attr('stroke', 'white')
            .style('stroke-width', '2px');

      svg.selectAll('text')
            .data(pie(data))
            .enter()
            .append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`) 
            .attr('text-anchor', 'middle')
            .attr('font-size', '15px')
            .attr('font-weight', 'bold')
            .text(d => d.data.label);
});  