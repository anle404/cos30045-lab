function init() {
    var w = 500
    var h = 200
    var padding = 1

    d3.csv("./pet_ownership.csv").then(data => {
        console.log(data);
        pet_ownership = data
        barChart(pet_ownership, "pets2019")
        barChart(pet_ownership, "pets2021")
    })

    function barChart(dataset, column) {
        var svg = d3.select(`#${column}`)
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("overflow", "visible")

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", (d, i) => {
                return i * (w / dataset.length)
            })
            .attr("y", (d) => {
                return h - d[column] * 4
            })
            .attr("width", () => {
                return w / dataset.length - padding
            })
            .attr("height", (d) => {
                return d[column] * 4
            })
            .attr("fill", (d) => `rgb(0, 0, ${Math.round(d[column] * 10)})`)
        
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(d => d.animal)
            .attr("x", (d, i) => {
                return i * (w / dataset.length) + (w / dataset.length)/2;
            })
            .attr("y", h + 15)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
    }
}

window.onload = init;