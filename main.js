d3.tsv("data.tsv", function(data) {
  var nestedData = d3.nest()
    .key(function(d) { return d.Conference; })
    .key(function(d) { return d.Division; })
    .entries(data.map(function(d) {
      d.key = d.Team;
      return d;
    }));
  
  for (var i = 0; i < nestedData.length; i++) {
    var elem = nestedData[i];
    elem.data = elem.values;
    for (var key2 in elem) {
      var insideElem = elem[key2];
      insideElem.data = insideElem.values;
    }
  }
  
  var sizeAccessor = "Wins";
  var strokeWidth = 2;
  
  var cPack = circlePack().childAccessor("values").nameAccessor("key");
  
  function draw() {
    cPack.sizeAccessor(sizeAccessor);
    cPack.attr("strokeWidth", strokeWidth);
    d3.select('#chart')
      .data([{key: "NBA", values: nestedData}])
      .call(cPack);
  }
  
  draw();
  
  $('.data-button').click(function(e) {
    sizeAccessor = $(this).text();
    draw();
  });
  
  $('#stroke-width').on('change', function(e) {
    strokeWidth = $(this).val();
    draw();
  });
});
