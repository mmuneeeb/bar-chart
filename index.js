let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let req = new XMLHttpRequest();

let data
let parsed_data

let width = 800;
let height = 600;
let padding = 40;

let heightScale
let xScale 
let xAxisScale
let yAxisScale

let svg = d3.select('svg')

let drawCanvas = () => {
    svg.attr("width", width)
       .attr("height", height)
}

let generateScales = () => {
    heightScale = d3.scaleLinear()
                  .domain([0, d3.max(parsed_data, (d) => {return d[1]})])
                  .range([0, height - 2*padding])

    xScale = d3.scaleLinear()
                  .domain([0, parsed_data.length - 1])
                  .range([padding, width - padding])

    let datesArray = parsed_data.map(d => {return new Date(d[0])})
    xAxisScale = d3.scaleTime()
                  .domain([d3.min(datesArray), d3.max(datesArray)])
                  .range([padding, width - padding])

    yAxisScale = d3.scaleLinear()
                  .domain([0, d3.max(parsed_data, (d) => {return d[1]})])
                  .range([height - padding, padding])
}

let drawBars = () => {
   svg.selectAll('rect')
      .data(parsed_data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('width', ((width-(2*padding))/parsed_data.length))
      .attr("height",(d => {return heightScale(d[1])}))
      .attr('x', ((d, i) => {return xScale(i)}))
      .attr('y', ((d) => {return height - padding - heightScale(d[1])}))
      .attr('data-date', (d => {return d[0]}))
      .attr('data-gdp', (d => {return d[1]}))
      .append("title")
      .text(d => { return "Year: " + d[0] + "\n" + "GDP: " + d[1] + " million"})
      .attr('id', 'tooltip')
      
}

let generateAxis = () => {
    let xAxis = d3.axisBottom(xAxisScale)
    svg.append('g')
       .call(xAxis)
       .attr('id', 'x-axis')
       .attr('transform', 'translate(0,' + (height - padding) + ')')

   let yAxis = d3.axisLeft(yAxisScale)
   svg.append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', 'translate(' + padding + ', 0)')

    
}

req.open('GET', url, true)
req.onload = () => {
   data = JSON.parse(req.responseText)
   parsed_data = data.data
   drawCanvas()
   generateScales()
   drawBars()
   generateAxis()
}
req.send()