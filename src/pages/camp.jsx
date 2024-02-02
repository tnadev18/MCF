import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useNavigate } from "react-router-dom";

function Camp() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 15;
  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/")
    }
  }, [])

  useEffect(() => {
    // Fetch data from the API endpoint
    axios
      .get("https://mcfapis.bnbdevelopers.in/getAllCamps")
      .then((response) => {
        // Update the state with the fetched data
        setData(response.data.camps); // Assuming response.data is an array of camp objects
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = async (camp_id) => {
    try {
      const response = await axios.delete(
        `https://mcfapis.bnbdevelopers.in/deleteCamp?camp_id=${camp_id}`
      );

      if (response.status === 200) {
        console.log("Batch deleted successfully!");
        alert("Batch deleted successfully!");

        // Update the state to remove the deleted item
        setData((prevData) =>
          prevData.filter((item) => item.camp_id !== camp_id)
        );
      } else {
        console.error("Failed to delete batch. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting batch:", error.message);
      console.error(error.response?.data); // Log the response data if available
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-screen-xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
                <header
                  className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    Active Camps
                  </h2>
                  <Link
                    end
                    to="/add-camp"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                  >
                    Add Camp
                  </Link>
                </header>
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table
                      className="dark:text-slate-300"
                      style={{ width: "100%" }}
                    >
                      <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                        <tr>
                          <th className="p-2">
                            <div className="font-semibold text-left">Sr.</div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Name
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Venue
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Status
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Fees
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Action
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {currentEntries.map((item, index) => (
                          <tr style={{ padding: "2px" }} key={item.camp_id}>
                            <td>
                              <div
                                className="text-left"
                                style={{ fontWeight: "bold" }}
                              >
                                {indexOfFirstEntry + index + 1}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-right">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.camp_name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-left">{item.camp_place}</div>
                            </td>
                            <td className="p-2">
                              <div
                                className={`text-center ${
                                  item.status === "inactive"
                                    ? "text-red-500"
                                    : "text-emerald-500"
                                }`}
                              >
                                {item.camp_status}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-right">{item.final_fee}</div>
                            </td>
                            <td className="p-3">
                              <div className="text-center">
                                <Link
                                  to={`/edit-fee-details?id=${item.camp_id}`}
                                  className="text-sm text-white px-2 bg-yellow-500"
                                  style={{
                                    padding: "3px",
                                    fontSize: "13px",
                                    marginLeft: "1px",
                                    marginRight: "2px",
                                  }}
                                >
                                  View & Edit
                                </Link>
                                <Link
                                  to={`/batch-details?id=${item.camp_id}`}
                                  className="text-sm text-white px-2 bg-indigo-500 "
                                  style={{
                                    padding: "3px",
                                    fontSize: "13px",
                                    marginLeft: "2px",
                                    marginRight: "1px",
                                  }}
                                >
                                  Batch Details
                                </Link>
                                <Link
                                  className="text-sm text-white px-2 bg-red-500 rounded"
                                  style={{
                                    padding: "3px",
                                    fontSize: "13px",
                                    marginLeft: "2px",
                                    marginRight: "1px",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault(); // Prevent the default link click action
                                    handleDelete(item.camp_id);
                                  }}
                                >
                                  Delete
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-center mt-4">
                    {Array.from(
                      { length: Math.ceil(data.length / entriesPerPage) },
                      (_, i) => i + 1
                    ).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`mx-1 px-3 py-1 bg-blue-500 text-white rounded-full ${
                          currentPage === pageNumber && "bg-indigo-700"
                        }`}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Camp;
