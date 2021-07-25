export const node = document.createElement("div");

const dimensions = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

const height = 200;
const width = 100;

const svg = d3
  .select(node)
  .append("svg")
  .attr("height", height + dimensions.top + dimensions.bottom)
  .attr("width", width + dimensions.right + dimensions.left)
  .append("g")
  .attr("transform", `translate(${dimensions.left},${dimensions.top})`);
