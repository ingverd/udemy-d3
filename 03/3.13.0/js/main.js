/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const margin = {
  left: 100,
  right: 10,
  top: 10,
  bottom: 50,
};
const width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const g = d3.select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left
    + ", " + margin.top + ")");

// X Label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", width / 2)
  .attr("y", height + 40)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text('Month');

// Y Label
g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (height / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text('Revenue');

d3.json("data/revenues.json").then((data) => {
  console.log(data);

  data.forEach((d) => {
    d.height = +d.revenue;
  });

  const x = d3.scaleBand()
    .domain(data.map(({ month }) => month))
    .range([0, width])
    .paddingInner(0.3)
    .paddingOuter(0.3);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, ({ height }) => height)])
    .range([height, 0]);

  const xAxisCall = d3.axisBottom(x);
  g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxisCall)
    .selectAll("text")
    .attr("text-anchor", "middle");

  const yAxisCall = d3.axisLeft(y)
    .ticks(10)
    .tickFormat((d) => `$ ${d}`);
  g.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  const rects = g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("y", ({ height }) => y(height))
    .attr("x", ({ month }) => x(month))
    .attr("width", x.bandwidth)
    .attr("height", (d) => height - y(d.height))
    .attr("fill", "grey");
})
