d3.json("samples.json").then(function(data){
  console.log(data);
});
d3.json("samples.json").then(function(data){
  wfreq = data.metadata.map(person => person.wfreq);
  console.log(wfreq);
});
d3.json("samples.json").then(function(data){
  wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
  console.log(wfreq);
});
d3.json("samples.json").then(function(data){
  wfreq = data.metadata.map(person =>
person.wfreq).sort((a,b) => b - a);
  filteredWfreq = wfreq.filter(element => element !=
null);
  console.log(filteredWfreq);
});
d3.json("samples.json").then(function(data){
  firstPerson = data.metadata[0];
  Object.entries(firstPerson).forEach(([key, value]) =>
    {console.log(key + ': ' + value);});
});
// the code that creates a dropdown menu of ID numbers dynamically
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

/*function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text(result.location);
  });
}*/

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");
    var KV_String = '<h6>';
    Object.entries(result).forEach(([key, value]) =>
       {KV_String+= key + ': ' + value + '<br>';});
    PANEL.html(KV_String);
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var json_samples = data.samples;
    var result = json_samples.filter(sampleObj => sampleObj.id == sample);
    var big_array = [];
    for(var i = 0; i < result[0].sample_values.length; i++){
        big_array.push({
          otu_ids: result[0].otu_ids[i],
          sample_values: result[0].sample_values[i],
          otu_labels: result[0].otu_labels[i]
        });  
    };
    big_array.sort((a, b) => b.sample_values - a.sample_values);

    //console.log(result instanceof Array);  find out if a variable is an array
   
    // Slice the first 10 objects for plotting
    small_array = big_array.slice(0, 10).reverse();
    console.log(small_array);
    
    var trace = {
      x: small_array.map(row => row.sample_values),
      y: small_array.map(row => "OTU "+row.otu_ids),
      text: small_array.map(row => row.otu_labels),
      type: "bar",
      orientation: "h"
    };

    // Apply the group bar mode to the layout
    var layout = {
      title: "",
      margin: {
        l: 70,
        r: 70,
        t: 20,
        b: 30
      }
    };

    Plotly.newPlot("bar", [trace], layout);

    var traceb = {
      x: big_array.map(row => row.otu_ids),
      y: big_array.map(row => row.sample_values),
      text: big_array.map(row => row.otu_labels),
      mode: 'markers',
      marker: {
 //        color: big_array.map(row => 'rgb(255,144,14)'),
         color: big_array.map(row => 'rgb('+(row.otu_ids)%256+','+(row.otu_ids>>4)%256+','+(row.otu_ids>>8)%256+')'),
         size: big_array.map(row => row.sample_values*.7)
      }
      
      //type: "bubble"
     
    };
    console.log(traceb);
    // data
    //var result = [trace];

    // Apply the group bar mode to the layout
    var layoutb = {
      title: "",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bubble", [traceb], layoutb);
  });

  // Gauge
  d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      console.log("Gauge", result);
      var traceg = [ {      
        //domain: { 
        //  x: [0, 1], 
        //  y: [0, 1] },
        //value: result.wfreq,
        //title: { text: "Belly Button Washing Frequency<br>Scrubs per week" },
        type: "pie",
        showlegend: false,
        hole: 0.4,
        rotation: 90,
        mode: "gauge+number",
        values: [100/9,100/9,100/9,100/9,100/9,100/9,100/9,100/9,100/9,100],
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        direction: 'clockwise',
        textinfo: 'text',
        textposition: 'inside',
        marker: {
          colors: ['rgba(247,242,235,1)','rgba(243,240,228,1)','rgba(232,230,200,1)','rgba(228,232,175,1)',
                   'rgba(212,228,148,1)','rgba(182,204,138,1)','rgba(134,191,137,1)','rgba(132,187,138,1)',
                   'rgba(127,180,133,1)','white'],
          labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
          hoverinfo: 'label'
        }/*,
        gauge: {
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 4], color: "lightgreen" },
            { range: [4, 9], color: "green" }
          ],
        }*/
      } ];

    
  var degrees = 50, radius = .9;
  var radians = degrees * Math.PI / 180;
  var x1 = 1 * radius * Math.cos(radians) * result.wfreq;
  var y1 = radius * Math.sin(radians);
  console.log(x1,y1);

  var layoutg = {
    width: 500,
    height: 450,
    margin: { t: 50, b: 0 },
    title: "Belly Button Washing Frequency<br>Scrubs per week",
    shapes: [{
      type: 'line',
      x0: 0.5,
      y0: 0.5,
      x1: x1,
      y1: y1,
      line: {
        color: 'red',
        width: 5
      }
    }]
  };
  Plotly.newPlot('gauge', traceg, layoutg);
  });

}