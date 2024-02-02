import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link, useNavigate } from "react-router-dom";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/")
    }
  }, [])

  return (
    <ul className="pagination">
      {pageNumbers.map((page) => (
        <li
          key={page}
          className={`pagination-item ${currentPage === page ? "active" : ""}`}
        >
          <button onClick={() => onPageChange(page)}>{page}</button>
        </li>
      ))}
    </ul>
  );
}

function ReportCard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [data, setData] = useState([]); // Store fetched data
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://mcfapis.bnbdevelopers.in/getAllStudents"
      );
      setData(response.data.students); // Update the state with the fetched data
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = data.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get('https://mcfapis.bnbdevelopers.in/getAllCamps');
        setCamps(response.data.camps);
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };

    fetchCamps();
  }, []);

  const getCampName = (campId) => {
    const camp = camps.find(camp => camp.camp_id === campId);
    return camp ? camp.camp_name : 'Camp not assigned';
  };

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get(`https://mcfapis.bnbdevelopers.in/getAllBatches`);
        setBatches(response.data.camps);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    };

    fetchBatches();
  }, []);

  const getBatchName = (batchId) => {
    const batch = batches.find(batch => batch.batch_id === batchId);
    return batch ? batch.batch_name : 'Batch not assigned';
  };

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
                    Report Cards
                  </h2>
                  <Link
                    to="/generate-report"
                    className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                  >
                    Generate Report Card
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
                              Reg. Id
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Name
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Camp
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Batch
                            </div>
                          </th>
                          <th className="p-2">
                            <div className="font-semibold text-center">
                              Status
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
                        {itemsToDisplay.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div
                                className="text-left"
                                style={{ fontWeight: "bold" }}
                              >
                                {index + 1}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.sid}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="text-slate-800 dark:text-slate-100">
                                  {item.first_name + " " + item.last_name}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">
                                {getCampName(item.camp_id)}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="text-center">{getBatchName(item.batch_id)}</div>
                            </td>
                            <td className="p-2">
                              <div
                                className={`text-center ${
                                  item.status === "Inactive"
                                    ? "text-red-500"
                                    : "text-emerald-500"
                                  }`}
                              >
                                {item.status}
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="text-center grid gap-2 h-full">
                                <button
                                  className="text-sm text-white px-2 bg-blue-400"
                                  style={{ padding: "1px", fontSize: "13px" }}
                                >
                                  <Link
                                    to={`/view-report?id=${item.sid}`}
                                    className="block w-full h-full"
                                    >
                                    Download
                                  </Link>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Previous and Next Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
              >
              <button
                style={{
                  padding: "5px 10px",
                  background: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                  cursor: currentPage > 1 ? "pointer" : "not-allowed",
                }}
                onClick={() => {
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
              >
                &lt;
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  background: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: currentPage < totalPages ? "pointer" : "not-allowed",
                }}
                onClick={() => {
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                >
                &gt;
              </button>
            </div>
          </div>
        </main>
      </div> 
    </div>
  );
}

export default ReportCard;
