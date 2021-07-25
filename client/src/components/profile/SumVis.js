import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
//import { node } from "./d3file";
//const RD3Component = rd3.Component;

const SumVis = ({ viewUser }) => {
  //const [d3, setD3] = useState("");
  const ref = useRef();

  useEffect(() => {
    // setD3(node);

    const { cardioDays, hiitDays, strengthDays } = viewUser.summary;

    //drawBarChart({ cardioDays, hiitDays, strengthDays });
    makeDonut({ cardioDays, hiitDays, strengthDays });
  }, [viewUser]);

  const makeDonut = (data) => {
    const height = 200;
    const width = ref.current.clientWidth;
    const margin = 40;

    console.log(ref.current.clientHeight);

    let radius = Math.min(width, height) / 2 - margin;

    console.log(ref.current);

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height} `)
      .append("g")
      .attr("transform", `translate (${width / 2}, ${height / 2})`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("svg-content", true);

    const color = d3.scaleOrdinal().range(["red", "blue", "grey"]);

    let pie = d3.pie().value((d) => {
      console.log(d);
      return d[1];
    });

    let data_ready = pie(Object.entries(data));

    svg
      .selectAll()
      .data(data_ready)
      .join("path")
      .attr("d", d3.arc().innerRadius(100).outerRadius(radius))
      .attr("fill", (d) => color(d.data[0]))
      .attr("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", 0.7);
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
