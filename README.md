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

## What kind of data should I provide?
You can use whatever data you'd like to, but it has to have some requirements:
1. Each object must contain the property `name`, which is a string representing the name of the group or leaf. If not you **must** call `.nameAccessor` (See the [api listing below](#nameaccessor) for more information)
2. Each leaf node must contain the property `size`, which is a number representing the size. If not you **must** call `.sizeAccessor` (See the [api listing below](#sizeaccessor) for more information)
3. Each group object must contain the property `children`, with an array of objects inside of it. If not you **must** call `.childAccessor` (See the [api listing below](#childaccessor) for more information)

An example data object is shown below:
```
{
    name: "parent1",
    children: [
        {
            name: "sub-parent1",
            children: [
                { name: "leafNode1", size: 150 },
                { name: "leafNode2", size: 1000 },
                { name: "leafNode3", size: 10 }
            ]
        },
        {
            name: "sub-parent2",
            children: [
                { name: "leafNode4", size: 150 }
            ]
        },
        { name: "leafNode5", size: 750 }
    ]
}
```
Your data may contain more information, but it won't be used in this visualization.

### Can I update the chart after I make it?
You sure can! Just call `cPack.func1(param1)` then repeat your
```
d3.select("#your-div-here").data([yourDataVariable]).call(cPack);
```
again in order to update the chart. Replace `cPack`, `func1`, and `param1` with the appropriate variables and API calls listed below.

## What type of things can I customize?
Check the [API list](#api-list) below for a complete list of functions that can customize your chart.
### What about CSS?
You can style the chart by using the following classes:

| CSS Class | Description |
| --- | --- |
| circle-pack-node | A node representing a group of data points, 1+ nodes below this node |
| circle-pack-leaf | A node representing a single data point, no groups below this node |
| circle-pack-text | The text that goes on top of a node or group of nodes |

# API List
All of the following functions should be called on the chart instance, that is the `cPack` variable in the above example. You can simply chain the following API calls after that.

## `circlePack()`
Returns a function that allows rendering circle pack diagrams. Assumes that data is in the format described in detail [here](#what-kind-of-data-should-i-provide):
```
{
    name: "parent1",
    children: [
        {
            name: "sub-parent1",
            children: [
                { name: "leafNode1", size: 150 },
                { name: "leafNode2", size: 1000 },
                { name: "leafNode3", size: 10 }
            ]
        },
        { name: "leafNode5", size: 750 }
    ]
}
```
If not, accessor methods must be defined.
* **returns** the chart object (for chaining)

### `.nameAccessor(accessor)`
Specifies the property to be used as the name for the nodes. For example, if your data looked like `{ title: "parent1", ... }` and "title" should act as the name, you'd call `circlePack().nameAccessor("title");`
* accessor: a string representing the property that should be accessed
* **returns** the chart object (for chaining)

### `.sizeAccessor(accessor)`
Specifies the property to be used as the name for the nodes. For example, if your data looked like `{ title: "parent1", radius: 100, ... }` and "radius" should act as the size, you'd call `circlePack().sizeAccessor("radius");`
* accessor: a string representing the property that should be accessed
* **returns** the chart object (for chaining)

### `.childAccessor(accessor)`
Specifies the property to be used as the name for the nodes. For example, if your data looked like `{ title: "parent1", nodes: [ ... ], ... }` and "nodes" should act as the children, you'd call `circlePack().childAccessor("nodes");`
* accessor: a string representing the property that should be accessed
* **returns** the chart object (for chaining)

### `.attr(attrName)`
Gets the value of a given attribute, such as width or height. For a full list please see the [list of attributes that can be modified](#attr-list).
* attrName: A string representing the attribute value you'd like to get
* **returns** the value of the attribute

### `.attr(attrName, val)`
Sets the value of a given attribute with the given value, such as width or height. For a full list please see the [list of attributes that can be modified](#attr-list).
* attrName: A string representing the attribute value you'd like to get
* val: The value to replace the attribute with
* **returns** the chart object (for chaining)

# Attr list
For all the following, you can modify them by calling:
```
circlePack().attr("name", value).attr("otherName", value);
```
chaining as many as you need to.
## Chart Sizing related
### `width`
The width of the full vis (including margins) (`default 800`)
### `height`
The height of the full vis (including margins) (`default 800`)
### `circlePadding`
The padding between each of the circles within the vis (`default 2`)
### `margin`
The margin between the visualization itself and the wrapper div. Access individual sides using `margin.left`, `margin.top`, `margin.bottom`, and `margin.right` (`default: 10, 10, 10, 10`)
## Color related
### `minColor`
The color to begin the color scale for the circles that enclose other circles (non-leaf nodes in the hierarchy). **Must be in hexcode format** (`default: #333`)
### `maxColor`
The color to end the color scale for the circles that enclose other circles (non-leaf nodes in the hierarchy) **Must be in hexcode format** (`default: #F0F`)
### `leafColor`
The color to fill the leaf nodes with (the circles that are the data points themselves, not the groups) **Must be in hexcode format** (`default: #0FF`)
## Circle related
### `strokeWidth`
The width of the outline when hovering over a circle (`default: 2`)
### `strokeColor`
The color of the outline when hovering over a circle (`default #000`)
## Animation related
### animationDuration
The base time for every animation, in milliseconds (`default: 500`)
