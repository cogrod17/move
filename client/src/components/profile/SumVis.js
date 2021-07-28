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

    const color = d3.scaleOrdinal().range(["#05445e", "#189ab4", "#75e6da"]);

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
      .attr("fill", (d) => color(d.data[0]))
      .style("stroke", "white");

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
        let r;
        d.data[0] === "cardioDays" ? (r = 1.7) : (r = 1.55);
        let y = arc.centroid(d).map((x) => x * r);
        return `translate(${y})`;
      });
  };

  return <div className="svg-container" ref={ref}></div>;
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(SumVis);
