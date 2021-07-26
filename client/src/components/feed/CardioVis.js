import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { server } from "../../api";
import * as d3 from "d3";

const getHistory = async (func, username) => {
  const res = await server.get("/workout/cardio_history", {
    headers: {
      username,
    },
  });

  func(res.data);
};

const CardioVis = ({ username }) => {
  const [paces, setPaces] = useState(null);
  const ref = useRef();

  useEffect(() => {
    getHistory(setPaces, username).then(() => makePlot(paces));
  }, [username, paces]);

  const makePlot = (data) => {
    const margin = 20;
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", width + margin * 2)
      .attr("height", height + margin * 2)
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    const x = d3
      .scaleTime()
      .domain([0, d3.extent(data, (d) => d.date)])
      .range([0, width]);

    svg.append("g").call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => +d.pace)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d.date))
          .y((d) => y(d.pace))
      );
  };

  console.log(paces);

  return <div ref={ref} className="svg-container"></div>;
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(CardioVis);
