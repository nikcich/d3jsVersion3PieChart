let dataArray = [
    {
        label: 'Element One',
        value: 10
    },
    {
        label: 'Element Two',
        value: 20
    },
    {
        label: 'Element Three',
        value: 30
    },
    {
        label: 'Element Four',
        value: 40
    },
    {
        label: 'Element Five',
        value: 50
    },
    {
        label: 'Element Six',
        value: 60
    },
    {
        label: 'Element Seven',
        value: 70
    },
    {
        label: 'Element Eight',
        value: 80
    },
    {
        label: 'Element Nine',
        value: 90
    },
    {
        label: 'Element Ten',
        value: 100
    },
    {
        label: 'Element Eleven',
        value: 10
    },
    {
        label: 'Element Twelve',
        value: 20
    },
    {
        label: 'Element 13',
        value: 30
    },
    {
        label: 'Element 14',
        value: 40
    },
    {
        label: 'Element 15',
        value: 50
    },
    {
        label: 'Element 16',
        value: 60
    },
    {
        label: 'Element 17',
        value: 70
    },
    {
        label: 'Element 18',
        value: 80
    },
    {
        label: 'Element 19',
        value: 90
    },
    {
        label: 'Element 20',
        value: 100
    },
];

let margin = { top: 20, right: 70, bottom: 70, left: 50 };
let width = d3.select("#main").node().getBoundingClientRect().width - margin.left - margin.right;
let height = d3.select("#main").node().getBoundingClientRect().height - margin.top - margin.bottom;

let maxVal = 100;

let x = d3.scale.linear()
    .range([0, width])
    .domain([0, maxVal]);

let y = d3.scale.ordinal()
    .rangeRoundBands([height, 0], 0.1)
    .domain(dataArray.map(function (d) { return d.label; }));

let colorScale = d3.scale.ordinal()
    .domain(dataArray.map(obj => obj.label))
    .range(["#003f5c", "#2f4b7c", "#665191", "#a05195", "#d45087", "#f95d6a", "#ff7c43", "#ffa600"]);

let xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

let yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

let svg = d3.select("#main")
    .append("svg")
    .style("width", "100%")
    .style("height", "100%")
    .append("g")
    .attr("transform", "translate(0, 250), scale(0)");

// Create a tooltip div
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute");

svg.transition()
    .duration(1000) // animation duration in milliseconds
    .attr("transform", "translate(" + margin.left + "," + margin.top + "), scale(1)");

svg.selectAll(".bar")
    .data(dataArray)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("y", function (d) { return y(d.label); })
    .attr("height", y.rangeBand())
    .attr("x", function (d) { return 0; })
    .attr("width", function (d) { return x(d.value); })
    .style("fill", function (d) {
        return colorScale(d.label);
    })
    .style("filter", "drop-shadow(0px 5px 10px rgba(0,0,0, 0.6) )")
    .on("mouseover", function (d) {
        tooltip.transition()
            .duration(100)
            .style("opacity", 0.9);
        tooltip.html(d.label + ": " + d.value)
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
        tooltip.transition()
            .duration(100)
            .style("opacity", 0);
    })
    .on("mousemove", function (d) {
        tooltip.html(d.label + ": " + d.value)
            .style("left", (d3.event.pageX + 20) + "px")
            .style("top", (d3.event.pageY - 10) + "px");
    })
    ;

// Set initial width of bars to 0
svg.selectAll(".bar")
    .attr("width", 0)
    .transition()
    .duration(function (d) { return (d.value / 100) * 500 }) // Set duration of animation
    .delay(function (d, i) { return i * 150; }) // Delay animation for each bar
    .attr("x", function (d) { return 0; })
    .attr("width", function (d) { return x(d.value); });


// Update existing bars
svg.selectAll(".bar")
    .data(dataArray)
    .attr("transform", "translate(" + 50 + "," + 0 + ")")
    .transition()
    .delay(function (d, i) { return i * 150; }) // Delay animation for each bar
    .duration(function (d) { return (d.value / 100.0) * 500 })
    .attr("y", function (d) { return y(d.label); })
    .attr("height", y.rangeBand())
    .attr("width", function (d) { return x(d.value); });

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(44," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + 50 + "," + 0 + ")")
    .attr("class", "y axis")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "4em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
        return "translate(-50, 40), rotate(-45)"
    });