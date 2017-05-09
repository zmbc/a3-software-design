function circlePack(){
    // nest all data in an obj
    var margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };
    var width = 800;
    var height = 800;
    var _drawWidth = width - margin.left - margin.right;
    var _drawHeight = height - margin.top - margin.bottom;
    var circlePadding = 2;
    var minColor = "#333";
    var maxColor = "#F0F";
    var leafColor = "#0FF";
    var strokeWidth = 2;
    var strokeColor = "#000";

    var _colorScale = d3.scaleLinear()
        .domain([-1, 10])
        .range([minColor, maxColor])
        .interpolate(d3.interpolateRgb);

    var _pack = d3.pack()
        .size([_drawWidth, _drawWidth])
        .padding(circlePadding);

    var vis = function(selection){
        this.width = width;
        _reset();
        selection.each(function(data, i){
            console.log("CALLED VIS")
            console.log(width);
            var svg = selection
                .append("svg")
                .attr("width", width)
                .attr("height", height);
            var g = svg.append("g")
                .attr("width", _drawWidth)
                .attr("height", _drawHeight);
            var root = d3.hierarchy(data)
                .sum(function(d){return d.size;})
                .sort(function(a,b){return b.value - a.value;})
            var focus = root;
            var allNodes = _pack(root).descendants();

            var circle = g.selectAll("circle").data(allNodes);
            circle.enter()
                .append("circle")
                .attr("class", function(d){ return d.children ? "circle-pack-node" : "circle-pack-leaf"; })
                .style("stroke", strokeWidth)
                .on("mouseover", function(d){
                    console.log("mouseover");
                    d3.select(this).style("stroke", strokeColor);
                })
                .on("mouseout", function(d){
                    console.log("mouseout");
                    d3.select(this).style("stroke", "");
                })
                .style("fill", function(d){ return d.children ? _colorScale(d.depth) : leafColor; })
                .attr("r", function(d){ return d.r; })
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
                ;
        });
    }

    vis.attr = function(attr, val){
        if(!arguments.length) {
            console.warn("No arguments provided to attr method");
            return this;
        }
        if(attr == undefined || attr == null || attr.length == 0 || this.hasOwnProperty(attr)){
            console.error("Improper attr: \"" + attr +"\" provided to circlePack.attr - Please use a string representing the attribute you'd like to modify");
            return this;
        }
        if(attr[0] === "_"){
            console.warn("Please do not modify private attributes");
            return this;
        }
        if(arguments.length < 2) { return this[attr]; }
        this[attr] = val;
        console.log("CALLED ATTR")
        console.log(this);
        console.log(this[attr]);
        console.log(width);
        return this;
    }

    // Reset any calculated variables, such as functions or values
    function _reset() {
        console.log("called reset");
        console.log(width);
        _drawWidth = width - margin.left - margin.right;
        _drawHeight = height - margin.top - margin.bottom;
        _colorScale = d3.scaleLinear()
            .domain([-1, 10])
            .range([minColor, maxColor])
            .interpolate(d3.interpolateRgb);

        _pack = d3.pack()
            .size([_drawWidth, _drawWidth])
            .padding(circlePadding);
    }

    return vis;
}