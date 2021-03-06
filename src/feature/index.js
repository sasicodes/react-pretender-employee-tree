import { useEffect, useState } from "react";

import { constructHierarchyObject } from "../helpers";
import EmployeeCard from "./EmployeeCard";
import "./index.css";
import DragDropChart from "./Tree";

function Feature() {
  const [employees, setEmployees] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [teams, setTeams] = useState([]);
  const [hierarchy, setHierarchy] = useState({});
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    /** Fetch employees and teams */
    fetchEmployees();
    fetchTeams();
  }, []);

  const fetchEmployees = () => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((json) => {
        setEmployees(json.employees);
        setHierarchy(
          constructHierarchyObject(JSON.parse(JSON.stringify(json.employees)))
        );
      });
  };

  const fetchTeams = () => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((json) => {
        setTeams(json.teams);
      });
  };

  const onSearch = (event) => {
    setSearchText(event.target.value);
    let list = employees;
    let filteredArray =
      list.length &&
      list.filter(
        (data) =>
          JSON.stringify(data)
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) !== -1
      );
    setFilteredArray(filteredArray.length > 0 ? filteredArray : employees);
  };

  const onFilter = (event) => {
    if (event.target.value !== "") {
      let filteredArray = employees.filter(
        (data) => data.team === event.target.value
      );
      setFilteredArray(filteredArray);
      const hierarchyObject = constructHierarchyObject(
        JSON.parse(JSON.stringify(filteredArray))
      );
      setHierarchy(hierarchyObject);
    } else {
      setFilteredArray([]);
      setHierarchy(
        constructHierarchyObject(JSON.parse(JSON.stringify(employees)))
      );
    }
    setSelectedFilter(event.target.value);
  };

  const getRenderArray = () => {
    if (filteredArray.length > 0) {
      return filteredArray;
    } else {
      return employees;
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="filter">
          <input
            onChange={(e) => onSearch(e)}
            value={searchText}
            type="text"
            placeholder="Search employees from all teams"
          />
          <select onChange={(e) => onFilter(e)} value={selectedFilter}>
            <option value="">All Teams</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div className="list mb-30">
          {getRenderArray().map((employee, index) => (
            <EmployeeCard key={index} className="mt-10" {...employee} />
          ))}
        </div>
      </div>
      <div className="main">
        <header className="header"></header>
        <div className="tree">
          <DragDropChart hierarchy={hierarchy} />
        </div>
      </div>
    </div>
  );
}

export default Feature;
