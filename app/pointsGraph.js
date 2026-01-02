'use client'
import * as d3 from 'd3'
import { useEffect, useState } from 'react';
export default function PointsGraph() {
  const [data, setData] = useState([]);
  async function getData() {
    const res = await fetch('/data.json');
    const data = await res.json();
    setData(data.dayScores);
  }
  const height = 400;
  const width = 1000;
  useEffect(() => {
    getData();
  }, [])
  useEffect(() => {
    const maxScore = 20;
    const maxDay = 20;

    const getY = (score) => (score * (0.9 * height / maxScore))
    const getX = (day) => (day * (0.9 * width / maxDay));
    const line = d3.line()
      .curve(d3.curveBasis)
      .x(d => getX(d.day))
      .y(d => getY(d.score))
    if (data.length == 0)
      return
    d3.select('svg')
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('r', 10)
      .attr('c', 'blue')
      .attr('cx', d => getX(d.day))
      .attr('cy', d => getY(d.score))
    d3.select('svg')
      .datum(data)
      .append('path')
      .attr('d', line)
      .attr("fill", "none")
      .attr('stroke-width', 4)
      .attr("stroke", "black");
  }, [data])

  return <svg width={width} height={height} />
}
