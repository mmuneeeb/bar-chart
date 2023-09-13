let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let req = new XMLHttpRequest();

let data
let parsed_data

let width = 800;
let height = 600;
let padding = 40;

let barHeight
let x 
let xAxis
let yaxis

let svg = d3.select('svg')

let drawCanvas = () => {
    svg.attr("width", width)
       .attr("height", height)
}

let generateScales = () => {
    barHeight = d3.scaleLinear()
                  .domain([0, d3.max(parsed_data, (d) => {return d[1]})])
                  .range([0, height - 2*padding])

    x = d3.scaleLinear()
          .domain([0, parsed_data.length - 1])
          .range([padding, width - padding])

    let datesArray = parsed_data.map(d => {return new Date(d[0])})
    xAxis = d3.scaleTime()
              .domain([d3.min(datesArray), d3.max(datesArray)])
              .range([padding, width - padding])

    yaxis = d3.scaleLinear()
              .domain([0, d3.max(parsed_data, (d) => {return d[1]})])
              .range([height - padding, padding])
}

let drawBars = () => {

}

let generateAxis = () => {
    let cisca = d3.axisBottom(xAxis)
    svg.append('g')
       .call(x)
       .attr('id', 'x-axis')
    
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