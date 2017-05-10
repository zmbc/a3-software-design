function circlePack(){
    var attrs = {
        margin: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        },
        width: 800,
        height: 800,
        circlePadding: 2,
        minColor: "#333",
        maxColor: "#F0F",
        leafColor: "#0FF",
        strokeWidth: 2,
        strokeColor: "#000",
        animationDuration: 500
    }
    var _drawWidth = attrs.width - attrs.margin.left - attrs.margin.right;
    var _drawHeight = attrs.height - attrs.margin.top - attrs.margin.bottom;
    var nameAcc = "name";
    var sizeAcc = "size";
    var childAcc = "children";

    var _colorScale = d3.scaleLinear()
        .domain([-1, 10])
        .range([attrs.minColor, attrs.maxColor])
        .interpolate(d3.interpolateRgb);

    var _pack = d3.pack()
        .size([_drawWidth, _drawWidth])
        .padding(attrs.circlePadding);

    var vis = function(selection){
        _reset();
        selection.each(function(data, i){
            var svg = selection
                .append("svg")
                .attr("width", attrs.width)
                .attr("height", attrs.height);
            var g = svg.append("g")
                .attr("width", _drawWidth)
                .attr("height", _drawHeight);
            var root = d3.hierarchy(data, function(d) { return d[childAcc]; })
                .sum(function(d){return d[sizeAcc]; })
                .sort(function(a,b){return b.value - a.value;})
            var focus = root;
            var allNodes = _pack(root).descendants();

            var circle = g.selectAll("circle").data(allNodes);
            circle.enter()
                .append("circle")
                .attr("class", function(d){ return d.children ? "circle-pack-node" : "circle-pack-leaf"; })
                .style("stroke-width", attrs.strokeWidth)
                .on("mouseover", function(d){
                    d3.select(this).style("stroke", attrs.strokeColor);
                })
                .on("mouseout", function(d){
                    d3.select(this).style("stroke", "");
                })
                .style("fill", function(d){ return d.children ? _colorScale(d.depth) : attrs.leafColor; })
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
                .attr("r", 0)
                .transition()
                .duration(attrs.animationDuration)
                .attr("r", function(d){ return d.r; })
                ;
        });
    }

    vis.nameAccessor = function(accessor) {
        if(!arguments.length) {
            console.warn("No arguments provided to nameAccessor method");
            return this;
        }
        nameAcc = accessor;
        return this;
    }

    vis.sizeAccessor = function(accessor) {
        if(!arguments.length) {
            console.warn("No arguments provided to sizeAccessor method");
            return this;
        }
        sizeAcc = accessor;
        return this;
    }

    vis.childAccessor = function(accessor) {
        if(!arguments.length) {
            console.warn("No arguments provided to childAccessor method");
            return this;
        }
        childAcc = accessor;
        return this;
    }

    vis.attr = function(attr, val){
        if(!arguments.length) {
            console.warn("No arguments provided to attr method");
            return this;
        }
        if(attr == undefined || attr == null || attr.length == 0 || !attrs.hasOwnProperty(attr)){
            console.error("Improper attr: \"" + attr +"\" provided to circlePack.attr - Please use a string representing the attribute you'd like to modify");
            return this;
        }
        if(attr[0] === "_"){
            console.warn("Please do not modify private attributes");
            return this;
        }
        if(arguments.length < 2) { return attrs[attr]; }
        attrs[attr] = val;
        return this;
    }

    // Reset any calculated variables, such as functions or values
    function _reset() {
        _drawWidth = attrs.width - attrs.margin.left - attrs.margin.right;
        _drawHeight = attrs.height - attrs.margin.top - attrs.margin.bottom;
        _colorScale = d3.scaleLinear()
            .domain([-1, 10])
            .range([attrs.minColor, attrs.maxColor])
            .interpolate(d3.interpolateRgb);

        _pack = d3.pack()
            .size([_drawWidth, _drawWidth])
            .padding(attrs.circlePadding);
    }

    return vis;
}