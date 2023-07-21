import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/data", {
        params: { page, limit: itemsPerPage },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    getUsers();

    const interval = setInterval(() => {
      getUsers();
    }, 3000);

    return () => clearInterval(interval);
  }, [getUsers]);

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

  return (
<div style={styles.container}>
      <div style={styles.titleContainer}>
        <h1 className="title is-4">Log Monitoring Dashboard</h1>
      </div>
      <div style={styles.tableContainer}>
        <table className="table is-striped is-fullwidth mt-2">
            <thead>
              <tr>
                <th>No</th>
                <th>Sumber</th>
                <th>Timestamp</th>
                <th>App_name</th>
                <th>Pengukuran</th>
                <th>Value</th>
                <th>Unit</th>
                <th>Satuan</th>
                <th>Status</th>
                <th>status_reading</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(startIdx, endIdx).map((user, index) => (
                <tr key={user._id}>
                  <td>{startIdx + index + 1}</td>
                  <td>{user.sumber}</td>
                  <td>{user.timestamp.replace("T", " ").replace("Z", "").slice(0, 19)}</td>
                  <td>{user.app_name}</td>
                  <td>{user.pengukuran}</td>
                  <td>{user.value}</td>
                  <td>{user.unit}</td>
                  <td>{user.satuan}</td>
                  <td>{user.status}</td>
                  <td>{user.status_reading}</td>
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
    height: "100vh", // Set the height of the container to 100% of the viewport
  },
  titleContainer: {
    flex: 1, // Set the title container to take 1/3 of the available height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#f1f1f1", // Optional: Add a background color for better visualization
  },
  tableContainer: {
    flex: 6, // Set the table container to take 2/3 of the available height
    display: "flex",
    flexDirection: "column",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default UserList;