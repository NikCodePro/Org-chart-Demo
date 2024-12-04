import React, { useEffect, useRef } from "react";
import OrgChart from "@balkangraph/orgchart.js";

const Tree = ({ nodes, clinks }) => {
  const chartRef = useRef();

  useEffect(() => {
    // Define custom template with adjusted layout
    OrgChart.templates.green = {
      ...OrgChart.templates.ana,
      size: [250, 120], // Adjust size of the node
      node: '<rect x="0" y="0" height="{h}" width="{w}" fill="#e0ecdb" stroke-width="2" stroke="#bbb" rx="10" ry="10"></rect>',
      img_0:
        '<clipPath id="{randId}"><circle cx="50" cy="50" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="5" y="5" width="90" height="90"></image>',
      field_0:
        '<text data-width="150" style="font-size: 16px;" fill="#4c4c4c" x="110" y="40" text-anchor="start">{val}</text>',
      field_1:
        '<text data-width="150" style="font-size: 14px;" fill="#4c4c4c" x="110" y="70" text-anchor="start">{val}</text>',
      link: '<path stroke="#ccc" stroke-width="2" fill="none" d="{rounded}" />',
    };

    OrgChart.clinkTemplates.simple = {
      ...OrgChart.clinkTemplates.orange,
      link: '<path stroke="#0073e6" stroke-dasharray="4" stroke-width="2" fill="none" d="{d}" />',
    };

    // Initialize chart
    const chart = new OrgChart(chartRef.current, {
      template: "green",
      enableSearch: false,
      nodeBinding: {
        field_0: "name", // Field for name
        field_1: "title", // Field for title
        img_0: "img", // Field for image
      },
      clinks: clinks,
      nodeSpacing: 60, // Adjust horizontal spacing
      levelSpacing: 50, // Adjust vertical spacing
    });

    chart.load(nodes);

    return () => {
      chart.destroy();
    };
  }, [nodes, clinks]);

  return <div id="tree" ref={chartRef} style={{ height: "100%" }}></div>;
};

export default Tree;
