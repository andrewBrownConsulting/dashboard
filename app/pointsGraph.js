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
    if (dailyScores.length == 0)
      return
    const scores = dailyScores.map(val => val.score);
    const dates = dailyScores.map(val => val.date);

    let minScore = Math.min(...scores);
    let minDate = Math.min(...dates);
    let maxScore = Math.max(...scores);
    let maxDate = Math.max(...dates);

    const margin = 25;
    const xScale = d3.scaleLinear()
      .domain([minDate, maxDate])
      .range([margin, width - margin]);
    const yScale = d3.scaleLinear()
      .domain([0, maxScore])
      .range([height - margin, margin]);



    const xAxis = d3.axisBottom(xScale).ticks(10)
    const yAxis = d3.axisLeft(yScale).ticks(5)

    d3.select('#chart').append("g")
      .attr("transform", `translate(${margin}, 0)`) // move to bottom
      .call(yAxis);

    const svg = d3.select('#chart')
    d3.select('#chart').append("g")
      .attr("transform", `translate(0, ${height - margin})`) // move to bottom
      .call(xAxis);
    d3.select('#chart').attr('width', width);
    d3.select('#chart').attr('height', height);
    d3.select('#chart')
      .selectAll('circle')
      .data(dailyScores)
      .join('circle')
      .attr('r', 10)
      .attr('fill', 'blue')
      .attr('cx', d => xScale(d.date))
      .attr('cy', d => yScale(d.score))
      .on("mouseover", (event, d) => {
        svg.selectAll("text.info").remove();
        const [x, y] = [xScale(d.date), yScale(d.score)]
        svg.append("text")
          .attr("class", "info")
          .attr("x", x + 20)
          .attr("y", y - 10)
          .text(`Score: ${d.score}`)
          .attr("font-family", "sans-serif")
          .attr("font-size", "14px")
          .attr("fill", "white");
      })
      .on("mouseleave", (event, d) => {
        svg.selectAll("text.info").remove();
      })
    const line = d3.line()
      .curve(d3.curveBasis)
      .x(d => xScale(d.date))
      .y(d => yScale(d.score))
    const path = d3.select('#chart')
      .selectAll('path')      // Select existing path(s)
      .data([dailyScores]);   // Bind new data as an array
    path.join(
      enter => enter.append('path')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 4)
        .attr('d', line),   // initial path
      update => update.transition()   // animate changes
        .duration(500)
        .attr('d', line)
    );
  }, [dailyScores])

  return (
    <svg id="chart" />
  )
}
