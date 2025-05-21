function init() {
    var w = 500;
    var h = 200;
    var padding = 1;

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    d3.csv("./Lab2_4_data.csv").then( data => {
        console.log(data);
        wombatSightings = data

        barChart(wombatSightings)
    })

    function barChart(dataset) {
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return i * (w / dataset.length)
            })
            .attr("y", (d) => {
                return h - (d.wombats * 4)
            })
            .attr("width", w / dataset.length - padding)
            .attr("height", (d) => d.wombats * 4)
            .attr("fill", (d) => `rgb(0, 0, ${Math.round(d.wombats * 10)})`)
    }
}

window.onload = init;