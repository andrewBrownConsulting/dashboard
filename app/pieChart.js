import * as d3 from 'd3'
import { useEffect } from 'react'
export default function PieChart({ title, percent, score, target }) {
  const width = 100;
  const height = 100;
  const radius = 50;
  useEffect(() => {
    d3.select("#pie" + title).select('g').remove();
    const svg = d3.select("#pie" + title)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arc = d3.arc()
      .innerRadius(0.8 * radius)        // 0 = full pie, >0 = donut
      .outerRadius(radius);

    svg.selectAll("path")
      .data([{ startAngle: 0, endAngle: Math.PI * percent / 50 }])
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", 'red');
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr('y', -10)
      .attr("font-size", 24)
      .attr("fill", 'white')
      .attr("font-weight", "bold")
      .text(title);
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr('y', 10)
      .attr("dominant-baseline", "middle")
      .attr("font-size", 24)
      .attr("fill", 'white')
      .attr("font-weight", "bold")
      .text(score + "/" + target);
  }, [percent]
  )
  return (
    <svg id={"pie" + title} />
  )
}
