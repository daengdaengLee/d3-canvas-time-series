import * as d3 from 'd3';
import sample from './sample';

const csv = sample.data.split('\n').map(rowStr => rowStr.split(',').map(cell => cell.trim()));

const MIN_X = parseInt(csv[1][0], 10);
const MAX_X = parseInt(csv[csv.length - 1][0], 10);

const yList = csv
  .slice(1)
  .map(list => list.slice(1))
  .reduce((acc, cur) => [...acc, ...cur.map(str => parseFloat(str))], []);

const MIN_Y = d3.min(yList);
const MAX_Y = d3.max(yList);

const vizEl = document.querySelector('.viz');
const containerWidth = vizEl.clientWidth - 30;
const constainerHeight = vizEl.clientHeight - 30;

d3.select('.svg')
  .attr('width', containerWidth)
  .attr('height', constainerHeight);
d3.select('.canvas')
  .attr('width', containerWidth)
  .attr('height', constainerHeight);

const width = containerWidth - 40;
const height = constainerHeight - 40;

const xScale = d3
  .scaleLinear()
  .domain([MIN_X, MAX_X])
  .range([0, width]);
const yScale = d3
  .scaleLinear()
  .domain([MAX_Y, MIN_Y])
  .range([0, height]);

const xAxis = d3
  .axisBottom()
  .scale(xScale)
  .tickValues(sample.steps.map(step => step.value))
  .tickFormat((d) => {
    const step = sample.steps.find(obj => obj.value === d);
    return step.label;
  });
const yAxis = d3
  .axisLeft()
  .scale(yScale)
  .ticks(10);

d3.select('.svg')
  .append('g')
  .attr('transform', 'translate(20, 10)')
  .classed('chart-g', true);
d3.select('.canvas').style('padding', '10px 0 0 20px');

d3.select('.chart-g')
  .append('g')
  .classed('x-axis', true)
  .attr('transform', `translate(0, ${height})`)
  .call(xAxis);
d3.selectAll('.svg .chart-g .x-axis .tick line')
  .attr('y1', `-${height}`)
  .attr('stroke-dasharray', '10 4')
  .style('stroke', 'gray');

d3.select('.chart-g')
  .append('g')
  .classed('y-axis', true)
  .call(yAxis);

const ctx = document.querySelector('.canvas').getContext('2d');
const lineGenerator = d3
  .line()
  .x(d => xScale(d[0]))
  .y(d => yScale(d[1]))
  .context(ctx);
ctx.beginPath();
lineGenerator(csv);
ctx.stroke();
