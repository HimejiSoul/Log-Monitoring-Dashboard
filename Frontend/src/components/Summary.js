import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Summary = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const intervalRef = useRef(null);
  const [summaryData, setSummaryData] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/dataSummary");
      setSummaryData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
    intervalRef.current = setInterval(getUsers, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [getUsers]);

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  const handleResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div style={styles.container}>
      <div className="title is-4" style={styles.titleContainer}>
        Summary Dashboard
      </div>
      <div style={styles.filterContainer}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate ? startDate.toISOString().slice(0, 10) : ""}
          onChange={handleStartDateChange}
        />
        <span style={styles.filterSeparator}> </span>
        <label>End Date: </label>
        <input
          type="date"
          value={endDate ? endDate.toISOString().slice(0, 10) : ""}
          onChange={handleEndDateChange}
        />
        <span style={styles.filterSeparator}> </span>
        <button onClick={handleResetFilter} className="button is-primary is-small filterButton">
          Reset Filter
        </button>
        <div style={styles.filterInfo}></div>
        <Link to="/" className="button is-primary is-small goToLogButton">
          Go to Log Page
        </Link>
      </div>
      <div style={styles.tableContainer}>
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              <th>No</th>
              {/* <th>Sumber</th> */}
              <th>App_name</th>
              <th>Parameter</th>
              <th>Average Value</th>
              <th>Unit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.attribute}</td>
                <td>Average Value Data</td>
                <td>{data.unit}</td>
                <td>{data.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    padding: "20px"
  },
  titleContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  filterSeparator: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  filterButton: {
    marginLeft: "10px",
  },
  filterInfo: {
    marginLeft: "20px",
  },
  tableContainer: {
    flex: 8,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
};

export default Summary; 