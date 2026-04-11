// https://observablehq.com/@rlesser/automatic-getbbox@344
import define1 from "./@mootari.toolbox.js";

function _1(md) {
  return (
    md`# Automatic getBBox`
  )
}

function _2(md) {
  return (
    md`I don't like that an svg element has to be rendered in the page before you can get the bounding box from \`getBBox()\`. I understand why it is the case, but I still don't like it. This is my attempt to make a function that abstracts that issue away.`
  )
}

function _3(md, PINNED) {
  return (
    md`Introducing \`autoBBox()\` - here's how to use it:

0. Import
~~~js
import {autoBBox} from '${PINNED}'
~~~

1. Create the text node (or any other type of node) that you want to place a bounding box around.
~~~js
  const text = svg
    .append('text')
    .text('I have a background now 😎')
    .attr('x', 20)
    .attr('y', 50);
~~~

2. Create the rect node, and call autoBBox, with the text node as the first argument
~~~js
const box = svg
    .append('rect')
    .attr('fill', 'lightblue')
    .call(autoBBox, text);
~~~

3. Call \`.lower()\` so that it appears below the preceding element.
~~~js
box.lower();
~~~

Here's that exact example:`
  )
}

function _4(d3, width, autoBBox) {
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', 100);

  const text = svg
    .append('text')
    .text('I have a background now 😎')
    .attr('x', 20)
    .attr('y', 50);

  const box = svg
    .append('rect')
    .attr('fill', 'lightblue')
    .call(autoBBox, text);

  box.lower();

  return svg.node();
}


function _5(md) {
  return (
    md`This function does not currently work on nodes that have been directly transformed. It's best to either wrap the node in a group node that does the transform, apply the same transform to the rect, or modify the position of the node itself. Here are some examples:`
  )
}

function _6(d3, width, autoBBox) {
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', 440);

  const text1 = svg
    .append('text')
    .text('A text node with an x and y, colored blue.')
    .attr('x', 20)
    .attr('y', 50);

  const box1 = svg
    .append('rect')
    .attr('fill', 'lightblue')
    .call(autoBBox, text1)
    .lower();

  const text2 = svg
    .append('text')
    .text('A transformed text node, colored pink')
    .attr('transform', 'translate(150, 100)');

  const box2 = svg
    .append('rect')
    .attr('fill', 'pink')
    .call(autoBBox, text2)
    .lower();

  const g1 = svg.append('g').attr('transform', 'translate(250, 180)');

  const text3 = g1
    .append('text')
    .text('A text node in a transformed group, colored green');

  const box3 = g1
    .append('rect')
    .attr('fill', 'lightgreen')
    .call(autoBBox, text3)
    .lower();

  const g2 = svg.append('g').attr('transform', 'translate(50, 220)');

  const text4 = g2
    .append('text')
    .text('A rotated text node in a transformed group, colored yellow')
    .attr('transform', 'rotate(10)');

  const box4 = g2
    .append('rect')
    .attr('fill', 'yellow')
    .call(autoBBox, text4)
    .lower();

  const g3 = svg
    .append('g')
    .attr('transform', 'translate(240, 380), rotate(-10)');

  const text5 = g3
    .append('text')
    .text('A text node in a rotated, transformed group, colored violet');

  const box5 = g3
    .append('rect')
    .attr('fill', 'violet')
    .call(autoBBox, text5)
    .lower();

  return svg.node();
}


function _7(md) {
  return (
    md`It works on more than just text too! Shapes, symbols, and grouped nodes can all be used in the function.`
  )
}

function _8(d3, width, autoBBox) {
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', 300);

  const circle = svg
    .append('circle')
    .attr('fill', 'green')
    .attr('r', 40)
    .attr('cx', 50)
    .attr('cy', 80);

  const box1 = svg
    .append('rect')
    .attr('fill', 'lightblue')
    .call(autoBBox, circle)
    .lower();

  const g = svg.append('g').attr('transform', 'translate(100, 200)');

  const symbol = g
    .append('path')
    .attr('fill', 'royalblue')
    .attr('d', d3.symbol(d3.symbolWye, 1000)());

  const box2 = g
    .append('rect')
    .attr('fill', 'lightblue')
    .call(autoBBox, symbol)
    .lower();

  const sentenceData = [
    ['This', 0, 0],
    ['is', 80, 20],
    ['grouped', -30, 50],
    ['text!', 50, 70]
  ];

  const textG = svg.append('g').attr('transform', 'translate(300, 30)');

  const texts = textG
    .selectAll('text')
    .data(sentenceData)
    .join('text')
    .text(d => d[0])
    .attr('x', d => d[1])
    .attr('y', d => d[2]);

  const box3 = textG
    .append('rect')
    .attr('fill', 'lightblue')
    .call(autoBBox, textG)
    .lower();

  return svg.node();
}


function _9(md) {
  return (
    md`If you want to place the box behind each element joined from a dataset, it's a bit different. You'll want the data join to happen at a group level, with the target nodes and boxes as children. The actual function usage isn't as pretty, especially how I'm finding the right text element for each box: 
~~~js
const textG = g
    .selectAll('g')
    .data(sentenceData)
    .join('g');

const texts = textG
    .append('text')
    .text(d => d[0])
    .attr('x', d => d[1])
    .attr('y', d => d[2]);

const box = textG
    .append('rect')
    .attr('fill', 'lightblue')
    .each(function(_, i) {
        autoBBox(d3.select(this), texts.filter((_, i2) => i == i2));
    })
    .lower();
~~~
The following example shows that exact code in action. *Any feedback on this area in particular is very welcome! I think this API could definitely be improved.*
`
  )
}

function _10(d3, width, autoBBox) {
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', 300);

  const sentenceData = [
    ['This', 0, 0],
    ['is', 80, 20],
    ['grouped', -30, 50],
    ['text!', 50, 70]
  ];

  const g = svg.append('g').attr('transform', 'translate(300, 30)');

  const textG = g
    .selectAll('g')
    .data(sentenceData)
    .join('g');

  const texts = textG
    .append('text')
    .text(d => d[0])
    .attr('x', d => d[1])
    .attr('y', d => d[2]);

  const box = textG
    .append('rect')
    .attr('fill', 'lightblue')
    .each(function (_, i) {
      autoBBox(d3.select(this), texts.filter((_, i2) => i == i2));
    })
    .lower();

  return svg.node();
}


function _11(md) {
  return (
    md`The \`autoBBox\` function is composed of two helper functions, \`getBBox\` and \`setRect\`. 
- \`getBBox\` takes in a d3 selection, and returns a bounding box dimensions object for the selection.
- \`setRect\` takes in a d3 selection for the rectangle, and a bounding box dimensions object. It sets the x, y, width, and height attributes of the rect to the values for the bounding box.

Both of these might be useful to you individually, especially if you want to pre-compute (or cache) your bounding box dimensions, to be used later.`
  )
}

function _12(md) {
  return (
    md`### Examples
This is a non-exaustive list of notebooks that use these functions. If you use any of the functions in your notebook, please let me know and I'll add it to the list!
- [The D3 Github Network, 2013 - 2021](https://observablehq.com/d/ed105413736b6a57), Robert Lesser`
  )
}

function _13(md) {
  return (
    md`__*If you have any feedback for ways this notebook could be improved, please let me know!*__`
  )
}

function _autoBBox(getBBox, setRect) {
  return (
    function autoBBox(rect, elt) {
      const dims = getBBox(elt);
      setRect(rect, dims);
    }
  )
}

function _getBBox(d3) {
  return (
    function getBBox(elt) {
      const clonedElt = elt.clone(true);
      const svg = d3.create('svg');
      svg.node().appendChild(clonedElt.node());
      document.body.appendChild(svg.node());
      const { x, y, width, height } = clonedElt.node().getBBox();
      document.body.removeChild(svg.node());
      return { x, y, width, height };
    }
  )
}

function _setRect() {
  return (
    function setRect(rect, dims) {
      rect
        .attr('x', dims.x)
        .attr('y', dims.y)
        .attr('width', dims.width)
        .attr('height', dims.height);
    }
  )
}

function _d3(require) {
  return (
    require('d3')
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md", "PINNED"], _3);
  main.variable(observer()).define(["d3", "width", "autoBBox"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["d3", "width", "autoBBox"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["d3", "width", "autoBBox"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["d3", "width", "autoBBox"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("autoBBox")).define("autoBBox", ["getBBox", "setRect"], _autoBBox);
  main.variable(observer("getBBox")).define("getBBox", ["d3"], _getBBox);
  main.variable(observer("setRect")).define("setRect", _setRect);
  const child1 = runtime.module(define1);
  main.import("PINNED", child1);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
