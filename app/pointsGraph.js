'use client'
import * as d3 from 'd3'
import { useState, useEffect } from 'react'
let height = 200;
let width = 1000;
export default function PointsGraph({ completed }) {
  const [dailyScores, setDailyScores] = useState([]);
  function daysSinceJan1(date) {
    const d = new Date(date);
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((d - jan1) / msPerDay);
  }
  useEffect(() => {
    width = Math.min(1000, window.innerWidth);
    console.log(width)
    const dateScores = completed.map((val) => ({ date: daysSinceJan1(val.date), score: Number(val.score) }))
    const dayScores = Object.values(dateScores.reduce((acc, { date, score }) => {
      if (!acc[date]) acc[date] = { date, score: 0 };
      acc[date].score += score;
      return acc;
    }, {}))
    setDailyScores(dayScores);
  }, [completed]);
  useEffect(() => {
    const scores = dailyScores.map(val => val.score);
    const dates = dailyScores.map(val => val.date);

    let minScore = Math.min(...scores);
    let minDate = Math.min(...dates);
    let maxScore = Math.max(...scores);
    let maxDate = Math.max(...dates);

    const getY = (day) => 0.05 * height + 0.9 * ((day - minScore) * (height / (maxScore - minScore)));
    const getX = (day) => 0.05 * width + 0.9 * ((day - minDate) * (width / (maxDate - minDate)));

    const line = d3.line()
      .curve(d3.curveBasis)
      .x(d => getX(d.date))
      .y(d => getY(d.score))
    if (dailyScores.length == 0)
      return

    d3.select('#chart').attr('width', width);
    d3.select('#chart').attr('height', height);
    d3.select('#chart')
      .selectAll('circle')
      .data(dailyScores)
      .join('circle')
      .attr('r', 10)
      .attr('fill', 'blue')
      .attr('cx', d => getX(d.date))
      .attr('cy', d => getY(d.score))
    d3.select('#chart')
      .datum(dailyScores)
      .append('path')
      .attr('d', line)
      .attr("fill", "none")
      .attr('stroke-width', 4)
      .attr("stroke", "white");
  }, [dailyScores])

  return (
    <svg id="chart" />
  )
}
