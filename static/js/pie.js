
// Adapted from:
// Holtz, Y. (n.d.). Basic pie chart in d3.js. [online] www.d3-graph-gallery.com. Available at: https://www.d3-graph-gallery.com/graph/pie_basic.html [Accessed 12 Feb. 2022].

//distinct colors when taken from beginning
staticColors = ["#1b70fc", "#faff16", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437", "#c281fe", "#f92b75", "#07c99d", "#a946aa", "#bfd544", "#16977e", "#ff6ac8", "#a88178", "#5776a9", "#678007", "#fa9316", "#85c070", "#6aa2a9", "#989e5d", "#fe9169", "#cd714a", "#6ed014", "#c5639c", "#c23271", "#698ffc", "#678275", "#c5a121", "#a978ba", "#ee534e", "#d24506", "#59c3fa", "#ca7b0a", "#6f7385", "#9a634a", "#48aa6f", "#ad9ad0", "#d7908c", "#6a8a53", "#8c46fc", "#8f5ab8", "#fd1105", "#7ea7cf", "#d77cd1", "#a9804b", "#0688b4", "#6a9f3e", "#ee8fba", "#a67389", "#9e8cfe", "#bd443c", "#6d63ff", "#d110d5", "#798cc3", "#df5f83", "#b1b853", "#bb59d8", "#1d960c", "#867ba8", "#18acc9", "#25b3a7", "#f3db1d", "#938c6d", "#936a24", "#a964fb", "#92e460", "#a05787", "#9c87a0", "#20c773", "#8b696d", "#78762d", "#e154c6", "#40835f", "#d73656", "#1afd5c", "#c4f546", "#3d88d8", "#bd3896", "#1397a3", "#f940a5", "#66aeff", "#d097e7", "#fe6ef9", "#d86507", "#8b900a", "#d47270", "#e8ac48", "#cf7c97", "#cebb11", "#718a90", "#e78139", "#ff7463", "#bea1fd"]


// set the dimensions and margins of the graph
var width = 760
    height = 560
    margin = 170


// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = width / 2 - margin

var outerArc = d3.arc()
  .innerRadius(radius * 1.09)
  .outerRadius(radius * 1.09)


// Create pieChart Function
function createPieChart(data){

    // delete any existing pie chart
    pieChartElem = document.getElementById("pieChart")
    if (pieChartElem) {
        pieChartElem.remove()
    }
    // append the svg 
    var svg = d3.select("#page-wrap")
        .append("svg")
          .attr("id", "pieChart")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(staticColors.slice(0, Object.keys(data).length))

    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(data))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('slices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        )
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

    svg
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
          .text( function(d) { console.log(d.data.key) ; return d.data.key } )
          .attr('transform', function(d) {
              console.log("d")
              console.log(d)
              var pos = outerArc.centroid(d);
              //var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
              //pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
              console.log(pos)
              console.log("pos")
              return 'translate(' + pos + ')';
          })
          .style('text-anchor', function(d) {
              var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
              return (midangle < Math.PI ? 'start' : 'end')
          })
}

// Create data
document.getElementById("pie-select").addEventListener("click", function(select){
    d3.csv('/static/data/Kaggle_TwitterUSAirlineSentiment.csv', function(error, data){
        if (error) {
            throw error
        }

        var option = document.getElementById("pie-select").value;

        data_prepped = data.reduce(function(acc, elem){
            if (option === "neg-reason") {
            
                if (elem["airline_sentiment"] === "negative") {
                    if (acc[elem["negative_reason"]]) {
                        acc[elem["negative_reason"]]++
                    } else {
                        acc[elem["negative_reason"]] = 1
                    }
                }
            }
            if (option === "neg-airline") {
                if (elem["airline_sentiment"] === "negative") {
                    if (acc[elem["airline"]]) {
                        acc[elem["airline"]]++
                    } else {
                        acc[elem["airline"]] = 1
                    }
                }
            }
            if (option === "neut-airline") {
                if (elem["airline_sentiment"] === "neutral") {
                    if (acc[elem["airline"]]) {
                        acc[elem["airline"]]++
                    } else {
                        acc[elem["airline"]] = 1
                    }
                }
            }
            if (option === "pos-airline") {
                if (elem["airline_sentiment"] === "positive") {
                    if (acc[elem["airline"]]) {
                        acc[elem["airline"]]++
                    } else {
                        acc[elem["airline"]] = 1
                    }
                }
            }
            return acc
        },{})
        console.log(data_prepped)
        createPieChart(data_prepped)
    })
})

document.getElementById("pie-select").click()

  