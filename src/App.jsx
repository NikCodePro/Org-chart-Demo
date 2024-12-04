import React, { useState, useEffect } from "react";
import Tree from "./mytree";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [clinks, setClinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9JZCI6IlJJMDUyNiIsIl9pZCI6IjY3MDNiMzU0MDE5MWUzODE0ZDE0ZWE0MCIsImlhdCI6MTczMjY4MzAyMCwiZXhwIjoxNzMyNzI2MjIwfQ.dTM-cfELJYJcXwT-uEIhGO4f_hhO6jXo6ENXDdBab1w"; // Replace with your token
        const response = await fetch("http://localhost:6060/api/v1/superadmin/employees", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();
        if (result.success) {
          const mappedNodes = [];
          const generatedClinks = [];

          result.data.forEach((employee) => {
            // Handle primary parent (pid) assignment
            const primaryParent = employee.assigned_to?.[0]?._id || null;

            mappedNodes.push({
              id: employee._id,
              pid: primaryParent,
              name: `${employee.first_Name || ""} ${employee.last_Name || ""}`.trim() || "No Name",
              title: employee.designation || employee.department || "No Title",
              img: employee.user_Avatar || "https://via.placeholder.com/100",
            });

            // Handle additional links (clinks) for non-primary parents
            if (employee.assigned_to && employee.assigned_to.length > 1) {
              employee.assigned_to.forEach((parent) => {
                if (parent._id !== primaryParent) {
                  generatedClinks.push({
                    from: parent._id,
                    to: employee._id,
                    template: "simple",
                  });
                }
              });
            }
          });

          setNodes(mappedNodes);
          setClinks(generatedClinks);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Tree nodes={nodes} clinks={clinks} />
    </div>
  );
};

export default App;
