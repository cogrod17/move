import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
//import { node } from "./d3file";
//const RD3Component = rd3.Component;

const SumVis = ({ viewUser }) => {
  const { cardioDays, hiitDays, strengthDays, moveDays } = viewUser.summary;
  const ref = useRef();

  useEffect(() => {
    makeDonut({ cardioDays, hiitDays, strengthDays });
    // eslint-disable-next-line
  }, []);

  const makeDonut = (data) => {
    const height = 220;
    const width = 380;
    const margin = 45;

    let radius = Math.min(width, height) / 2 - margin;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate (${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal().range(["red", "blue", "green"]);

    let pie = d3.pie().value((d) => d[1]);

    let data_ready = pie(Object.entries(data));

    const arc = d3
      .arc()
      .innerRadius(110)
      .outerRadius(radius * 0.9);

    svg
      .selectAll()
      .data(data_ready)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data[0]));

    svg
      .selectAll()
      .data(data_ready)
      .join("text")
      .text((d) => ((d.data[1] / moveDays) * 100).toFixed(1) + "%")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .style("fill", "white");

    svg
      .selectAll()
      .data(data_ready)
      .join("text")
      .text((d) => {
        let i = d.data[0].indexOf("D");
        return d.data[0].slice(0, i).toUpperCase();
      })
      .attr("transform", (d) => {
        let y = arc.centroid(d).map((x) => x * 1.6);
        return `translate(${y})`;
      });

    // .style("fill", "white");

    // (d) => (d.data[0] / viewUser.summary.moveDays).toFixed(2) * 100 + "%"
  };

  return <div className="svg-container" ref={ref}></div>;
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SumVis);

// const drawBarChart = (data) => {
//   // const height = 200px

//   console.log(data);

//   const numbers = Object.values(data);
//   const labels = Object.keys(data);

//   const canvas = d3
//     .select(ref.current)
//     .append("svg")
//     .attr("height", 200)
//     .attr("width", "80%")
//     .style("border", "grey solid 1px")
//     .style("margin", "20px")
//     .style("padding-left", "20px");

//   canvas
//     .selectAll("rect")
//     .data(numbers)
//     .enter()
//     .append("rect")
//     .attr("width", 40)
//     .attr("height", (datapoint) => datapoint * 40)
//     .attr("fill", "orange")
//     .attr("x", (_, i) => i * 45)
//     .attr("y", (datapoint) => 200 - datapoint * 40);

//   canvas
//     .selectAll("text")
//     .data(labels)
//     .enter()
//     .append("text")
//     .attr("x", (datapoint, i) => i * 45 + 10)
//     .attr("y", (datapoint, i) => 200 - numbers[i] * 50)
//     .text((datapoint) => datapoint)
//     .attr("transform", "rotate(-25)");
// };
