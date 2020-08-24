## Module-12-Challenge

The belly button dashboard provides visualisation of the bacterial data for each volunteer and includes the following:
  1) a panel for demographic information,
  2) a bar chart of the top ten bacterial species (OTUs) in a volunteer’s navel, 
  3) a bubble chart to visualize the relative frequency of all the bacterial species,
  4) a gauge chart to plot the weekly washing frequency of the individual

The Demographics Info panel shows all the key-value pairs of the selected individual. Object.entries() JavaScript method is used to iterate through the keys and values of an object.

BuildCharts function is used to build three charts. Some features were discovered, such as "result" variable is not an Array, it is an object.
Therefore a new variable "big-array" has been created. Push() has been applied to reorganize the data from an object into an array of key: value pairs. 
Sort() method allowed all three key: values to be sorted at once. "Small_array" is a top 10 slice of "big_array".

Map() method is used to build the parameters for Bubble Chart.
The algorithm for colors was a challenging part.

There were two challenges in buiding the gauge.
- Plotly documentation refered to in the Module Challenge instructions describes an "indicator" type, while the correct type for this gauge is "pie".
- Plotly does not offer documentation on how to create a gauge needle. That is why the only source of information was online examples.
Gauge needle has been drown manually using circle geometry formulas.



