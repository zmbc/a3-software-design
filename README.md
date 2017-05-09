# a3-software-design: Circle Pack
A D3 library that allows the drawing of a circle pack visualization in an easy and simplified way!

## What kind of data can you use with this library?
The best kind of data to showcase with this type of visualization is nested data. This lets you visualize data that is within a hierarchy more easily than other visualization methods.The nested data can have varying sizes or be the same size. However, this library takes in any generic nested data, or even a single level of data if you'd like to visualize a simple circle pack visualization without any nesting.

## How do you use this library?
The basic function of this library boils down to the following code:
```
var cPack = circlePack();
d3.select("#your-div-here")
    .data([yourDataVariable])
    .call(cPack);
```
This lets you construct a simple circle pack within a given div. `yourDataVariable` should be a javascript object that contains the nested data you'd like to visualize.

### Can I update the chart after I make it?
You sure can! Just call `cPack.func1(param1)` then repeat your `d3.select("#your-div-here").data([yourDataVariable]).call(cPack);` again in order to update the chart. Replace `cPack`, `func1`, and `param1` with the appropriate variables and API calls listed below.

## What type of things can I customize?
Check the API list below for more details.

# API List
All of the following functions should be called on the chart instance, that is the `cPack` variable in the above example. You can simply chain the following API calls after that.

### `.attr(attrName)`
Gets the value of a given attribute, such as width or height. For a full list please see the [list of attributes that can be modified](#Attr list).
* attrName: A string representing the attribute value you'd like to get
* **returns** the value of the attribute

### `.attr(attrName, val)`
Sets the value of a given attribute with the given value, such as width or height. For a full list please see the [list of attributes that can be modified](#Attr list).
* attrName: A string representing the attribute value you'd like to get
* val: The value to replace the attribute with
* **returns** the chart object (for chaining)

# Attr list
### `width`
The width of the full vis (including margins)
### `height`
The height of the full vis (including margins)
### `circlePadding`
The padding between each of the circles within the vis
### `minColor`
The color to begin the color scale for the circles that enclose other circles (non-leaf nodes in the hierarchy)
### `maxColor`
The color to end the color scale for the circles that enclose other circles (non-leaf nodes in the hierarchy)
### `leafColor`
The color to fill the leaf nodes with (the circles that are the data points themselves, not the groups)