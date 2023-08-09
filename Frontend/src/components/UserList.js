import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const intervalRef = useRef(null);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/data", {
        params: { page, limit: itemsPerPage, startDate, endDate },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [page, startDate, endDate]);

  useEffect(() => {
    getUsers();
    intervalRef.current = setInterval(getUsers, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [getUsers]);

  useEffect(() => {
    if (users.length <= 10 && page !== 1) {
      setPage(1);
    }
  }, [users, page]);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/data/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

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
        Log Monitoring Dashboard
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
        <Link to="/summary" className="button is-primary is-small goToLogButton">
          Go to Summary Page
        </Link>
        <div style={styles.filterInfo}></div>
        <label> Page :{page}</label>
        <div style={styles.filterInfo}></div>
        <label> Total Data :{users.length}</label>
      </div>
      <div style={styles.tableContainer}>
        <table className="table is-striped is-fullwidth mt-2">
          <thead>
            <tr>
              {/* <th>Sumber</th> */}
              <th>Timestamp</th>
              <th>App_name</th>
              <th>Parameter</th>
              <th>Value</th>
              <th>Unit</th>
              {/* <th>Satuan</th> */}
              <th>Status</th>
              {/* <th>status_reading</th> */}
            </tr>
          </thead>
          <tbody>
            {users.slice(startIdx, endIdx).map((user, index) => (
              <tr key={user._id}>
                {/* <td>{user.sumber}</td> */}
                <td>{user.time.replace("T", " ").replace("Z", "").slice(0, 19)}</td>
                <td>{user.name}</td>
                <td>{user.attribute}</td>
                <td>{user.value_avg}</td>
                <td>{user.unit}</td>
                {/* <td>{user.satuan}</td> */}
                <td>{user.status}</td>
                {/* <td>{user.status_reading}</td> */}
                <td>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="button is-danger is-small"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length > itemsPerPage && (
          <div style={styles.paginationContainer} className="mt-4">
            <button
              onClick={handlePreviousPage}
              className="button is-primary is-small"
              disabled={page === 1}
            >
              Previous
            </button>{" "}
            <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>{" "}
            <button
              onClick={handleNextPage}
              className="button is-primary is-small"
              disabled={endIdx >= users.length}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    // height: "100vh",
    padding: "20px"
  },
  titleContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "50px",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
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
  paginationContainer: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default UserList;
