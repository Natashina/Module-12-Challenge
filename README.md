## Module-12-Challenge

The belly button dashboard provides visualisation the bacterial data for each volunteer and includes the following:
  1) a panel for demographic information,
  2) a bar chart of the top ten bacterial species (OTUs) in a volunteer’s navel, 
  3) a bubble chart to visualize the relative frequency of all the bacterial species,
  4) a gauge chart to plot the weekly washing frequency of the individual

The Demographics Info panel shows all the key-value pairs of the selected individual. Object.entries() JavaScript method is used to iterate through the keys and values of an object.

BuildCharts function is used to build three charts. Some features were discovered, such as "result" variable is not an Array.
Therefore a new variables has been created 

var big_array = [];
    for(var i = 0; i < result[0].sample_values.length; i++){
        big_array.push({
          otu_ids: result[0].otu_ids[i],
          sample_values: result[0].sample_values[i],
          otu_labels: result[0].otu_labels[i]
        }); 

