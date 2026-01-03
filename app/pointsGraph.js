'use client'
import * as d3 from 'd3'
import { useState, useEffect } from 'react'
import { getDailyScores } from './dailyServerFuncs';
export default function PointsGraph() {
  const [dailyScores, setDailyScores] = useState([]);
  async function getData() {
    const data = await getDailyScores();
    setDailyScores(data);
  }
  const height = 400;
  const width = 1000;
  useEffect(() => {
    getData();
  }, [])
  useEffect(() => {
    const scores = dailyScores.map(val => val.score);
    const dates = dailyScores.map(val => val.date);
    let maxScore = Math.max(...scores);
    let maxDate = Math.max(...dates);

    const getY = (score) => (0.05 * height + score * (0.90 * height / maxScore))
    const getX = (day) => (0.05 * width + day * (0.90 * width / maxDate));
    const line = d3.line()
      .curve(d3.curveBasis)
      .x(d => getX(d.date))
      .y(d => getY(d.score))
    if (dailyScores.length == 0)
      return
    d3.select('svg')
      .selectAll('circle')
      .data(dailyScores)
      .join('circle')
      .attr('r', 10)
      .attr('c', 'blue')
      .attr('cx', d => getX(d.date))
      .attr('cy', d => getY(d.score))
    d3.select('svg')
      .datum(dailyScores)
      .append('path')
      .attr('d', line)
      .attr("fill", "none")
      .attr('stroke-width', 4)
      .attr("stroke", "black");
  }, [dailyScores])

  return <svg width={width} height={height} />
}
