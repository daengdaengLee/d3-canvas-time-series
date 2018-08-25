import * as d3 from 'd3';

window.onload = () => {
  d3.select('svg')
    .selectAll('text.sample')
    .data(['Hello', 'World'])
    .enter()
    .append('text')
    .attr('class', 'sample')
    .attr('x', (d, i) => i * 100 + 20)
    .attr('y', 100)
    .text(d => d);
};
