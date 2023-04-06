
window.onload = function () {
    var data = [
        { year: 2010, variable1: 10, variable2: 20, variable3: 30 },
        { year: 2011, variable1: 15, variable2: 25, variable3: 35 },
        { year: 2012, variable1: 20, variable2: 30, variable3: 40 },
        // ... more data points
    ];


    var margin = { top: 30, right: 30, bottom: 30, left: 30 };
    var width = 600 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function (d) { return d.variable1 + d.variable2 + d.variable3; })])
        .range([height, 0]);

    var xScale = d3.scale.linear()
        .domain([d3.min(data, function (d) { return d.year; }), d3.max(data, function (d) { return d.year; })])
        .range([0, width]);


    var area = d3.svg.area()
        .x(function (d) { return xScale(d.year); })
        .y0(function (d) { return yScale(d.y0); })
        .y1(function (d) { return yScale(d.y0 + d.y); });


    // Append the chart to an HTML element by its ID
    d3.select("#stacked-area-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);
};