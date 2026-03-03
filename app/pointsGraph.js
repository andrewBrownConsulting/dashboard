'use client'
import * as d3 from 'd3'
import { useState, useEffect, useRef } from 'react'
export default function PointsGraph({ completed, last30Bool, sevenAvg }) {
  const [dailyScores, setDailyScores] = useState([]);
  const containerRef = useRef(null)
  function daysSinceJan1(date) {
    const d = new Date(date);
    const jan1 = new Date(d.getFullYear(), 0, 1);
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((d - jan1) / msPerDay);
  }
  function dateFromDays(days) {
    const d = new Date(2026, 0, 1);
    d.setDate(d.getDate() + days);
    return d;
  }
  function setScores() {
    const now = new Date();
    const thirtyDaysAgo = new Date().setDate(now.getDate() - 30);
    let filteredCompleted = completed;
    let dateScores = filteredCompleted.map((val) => ({ date: daysSinceJan1(val.date), score: Number(val.score) }))
    if (last30Bool) {
      filteredCompleted = completed.filter(item => (item.date >= thirtyDaysAgo))
      dateScores = filteredCompleted.map((val) => ({ date: daysSinceJan1(val.date), score: Number(val.score) }))
    }
    const dayScores = Object.values(dateScores.reduce((acc, { date, score }) => {
      if (!acc[date]) acc[date] = { date, score: 0 };
      acc[date].score += score;
      return acc;
    }, {}))
    setDailyScores(dayScores);
  }

  useEffect(() => {
    setScores();
  }, [completed, last30Bool]);

  const margin = 25;


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    d3.select(container).selectAll("*").remove();
    const svg = d3.select(container)
      .append("svg")
      .style("width", "100%")
      .style("height", "100%");

    function render() {
      const { width, height } = container.getBoundingClientRect();
      svg.selectAll('g').remove();
      svg.attr('width', width);
      svg.attr('height', height);
      if (dailyScores.length == 0)
        return
      const scores = dailyScores.map(val => val.score);
      const dates = dailyScores.map(val => val.date);

      let minScore = Math.min(...scores);
      let minDate = Math.min(...dates);
      let maxScore = Math.max(...scores);
      let maxDate = Math.max(...dates);

      const xScale = d3.scaleLinear()
        .domain([minDate, maxDate])
        .range([margin, width - margin]);
      const yScale = d3.scaleLinear()
        .domain([0, maxScore])
        .range([height - margin, margin]);


      const xAxis = d3.axisBottom(xScale).ticks(10)
      const yAxis = d3.axisLeft(yScale).ticks(5)

      const xAxisG = svg.append("g")
        .attr("transform", `translate(0, ${height - margin})`) // move to bottom
      const yAxisG = svg.append("g")
        .attr("transform", `translate(${margin}, 0)`) // move to bottom

      xAxisG.call(xAxis)
      yAxisG.call(yAxis)
      svg.selectAll('circle')
        .data(dailyScores)
        .join('circle')
        .attr('r', 10)
        .attr('fill', 'blue')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.score))
        .on("mouseover", (event, d) => {
          svg.selectAll("text.info").remove();
          svg.append("text")
            .attr("class", "info")
            .attr("x", ((xScale(d.date) - width < -200) ? (xScale(d.date) + 20) : (xScale(d.date) - 80)))
            .attr("y", yScale(d.score) - 15)
            .text(`Score: ${d.score.toFixed(1)}`)
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("fill", "white")
            .attr("background", "black");
          svg.append("text")
            .attr("class", "info")
            .attr("x", ((xScale(d.date) - width < -200) ? (xScale(d.date) + 20) : (xScale(d.date) - 80)))
            .attr("y", yScale(d.score))
            .text(`${dateFromDays(d.date).toLocaleDateString()}`)
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("fill", "white")
            .attr("background", "black")
        })
        .on("mouseleave", (event, d) => {
          svg.selectAll("text.info").remove();
        });
      const line = d3.line()
        .curve(d3.curveBasis)
        .x(d => xScale(d.date))
        .y(d => yScale(d.score))

      const path = svg.selectAll('.line')      // Select existing path(s)
        .data([dailyScores])
        .join('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-width', 4)
        .attr('d', line)  // initial path

      const sevenAvgPath = svg.selectAll('.straightLine')      // Select existing path(s)
        .data([dailyScores])
        .join('line')
        .attr('class', 'straightLine')
        .attr('x1', margin)
        .attr('x2', width - margin)
        .attr('y1', yScale(sevenAvg))
        .attr('y2', yScale(sevenAvg))
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr("stroke-dasharray", "10,4")
        .attr('d', line)  // initial path
    }
    render();
    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();

  }, [dailyScores])

  return (
    <div ref={containerRef} id='chartContainer' style={{ width: '100%', height: '100%' }}>
    </div>
  )
}
