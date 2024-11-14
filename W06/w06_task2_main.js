d3.csv("https://adachikazuya.github.io/InfoVis2024/W04/w04_task1.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:40, right:10, bottom:50, left:50},
            title: 'Plot value',
            xlabel: 'y value',
            ylabel: 'x value'
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:40, right:10, bottom:50, left:50},
            title: config.title || 'Plot value',
            xlabel: config.xlabel || 'y value',
            ylabel: config.ylabel || 'x value'
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [ self.inner_height, 0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(6)
            .tickPadding(5);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(6)
            .tickPadding(5);

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, ${self.inner_height})`)

        self.yaxis_group = self.chart.append('g')
            .attr('transform', `translate(0, 0)`)

        // X軸ラベル
        self.svg.append('text')
            .attr('class', 'x-axis-label')
            .attr('text-anchor', 'middle')
            .attr('x', self.config.margin.left + self.inner_width / 2)
            .attr('y', self.config.height - 10)
            .text(self.config.xlabel)
            .style('font-size',"15px");

        // Y軸ラベル
        self.svg.append('text')
            .attr('class', 'y-axis-label')
            .attr('text-anchor', 'middle')
            .attr('transform', `rotate(-90)`)
            .attr('x', -self.config.margin.top - self.inner_height / 2)
            .attr('y', 15)
            .text(self.config.ylabel)
            .style('font-size',"15px");

        self.svg.append('text')
            .attr('class','title')
            .attr('text-anchor','middle')
            .attr('x', self.config.width / 2 )
            .attr('y',self.config.margin.top/2)
            .text(self.config.title);
    }

    update() {
        let self = this;

        const xMargin = 20;
        const yMargin = 20;

        const xmin = d3.min( self.data, d => d.x - xMargin );
        const xmax = d3.max( self.data, d => d.x + xMargin);
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y - yMargin);
        const ymax = d3.max( self.data, d => d.y + yMargin);
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r )
            .style("fill", function(d){ return d.color; });

        self.xaxis_group
            .call( self.xaxis );
        self.yaxis_group
            .call( self.yaxis );
    }
}
