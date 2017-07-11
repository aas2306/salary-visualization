var bubbleChart = function() {
  var width = 1500,
      height = 1000,
      maxRadius = 30,
      columnForColors = "sex",
      columnForRadius = "salary";

    function chart(selection) {
      var data = selection.enter().data();
      var div = selection,
                svg = div.selectAll('svg');
      svg.attr('width', width).attr('height', height);


      var tooltip = selection
                .append("div")
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("color", "white")
                .style("padding", "8px")
                .style("background-color", "#626D71")
                .style("border-radius", "6px")
                .style("text-align", "center")
                .style("font-family", "monospace")
                .style("width", "400px")
                .text("");

      var simulation = d3.forceSimulation(data)
                .force("charge", d3.forceManyBody().strength([-50]))
                .force("x", d3.forceX())
                .force("y", d3.forceY())
                .on("tick", ticked);

      function ticked(e) {
        node.attr('cx', function(d) {
          return d.x;
        })
        .attr('cy', function(d) {
          return d.y;
        });
      }

      var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
      var scaleRadius = d3.scaleLinear().domain([d3.min(data, function(d) {
            return +d[columnForRadius];
        }), d3.max(data, function(d) {
            return +d[columnForRadius];
        })]).range([5, 20]);

        var node = svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr('r', function(d) {
                  return scaleRadius(d.salary);
                })
                .style("fill", function(d) {
                    return colorCircles(d.sex);
                })
                .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
                .on("mouseover", function(d) {
                    tooltip.html(d[columnForColors] + "<br>" + d.title + "<br> $" + d[columnForRadius] + " Per Annum");
                    return tooltip.style("visibility", "visible");
                })
                .on("mousemove", function() {
                    return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                .on("mouseout", function() {
                    return tooltip.style("visibility", "hidden");
                });
    }

    chart.width = function(value) {
      if (!arguments.length) { return width; }
      width = value;
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) { return height; }
      height = value;
      return chart;
    };

    chart.columnForColors = function(value) {
      if (!arguments.columnForColors) {
        return columnForColors;
      }
        columnForColors = value;
        return chart;
      };

      chart.columnForRadius = function(value) {
        if (!arguments.columnForRadius) {
          return columnForRadius;
        }
        columnForRadius = value;
        return chart;
      };

    return chart;
};



// var div = d3.select('body')
//           .selectAll('div')
//           .data(our_data)
//           .enter()
//           .append('div');




// d3.json('data.json', function(d) {
//
// // var radii = [];
// // var sex = [];
// var data = [];
// var counter = 50;
//
// for (var i = 0; i < d.alldata.length; i++) {
//   var object = {};
//   // var divided = (d.alldata[i].salary)/2000;
//   object.radius = (d.alldata[i].salary)/2000;
//   object.xPos = counter;
//   counter = counter + 100;
//   if (d.alldata[i].sex == "female") {
//     object.color = "red";
//   } else {
//     object.color = "blue";
//   }
//   data.push(object);
// }
// //
// // for (var i = 0; i < d.alldata.length; i++) {
// //   sex.push(d.alldata[i].sex);
// // }
//
// var xPos = [50, 150, 250, 350, 450, 550, 650, 750, 850, 950, 1050];
//
// console.log("data", data);
//
// var svgContainer = d3.select('#viz')
//                     .append('svg')
//                     .attr('width', 1500)
//                     .attr('height', 1000)
//                     .style('background', '#d5d9e0');
//
// var circles = svgContainer.selectAll("circle")
//               .data(data)
//               .enter()
//               .append('circle');
//
// var circleAtt = circles
//                 .attr('cx', function (d) {
//                   return d.xPos;
//                 })
//                 .attr('cy', 100)
//                 .attr('r', function (d){ return d.radius;})
//                 // .style('fill', 'green')
//                 .style('fill', function (d) { return d.color;});
//
// });
