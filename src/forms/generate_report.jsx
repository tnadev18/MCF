import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import axios from "axios";

const baseurl = 'https://mcfapis.bnbdevelopers.in'

const StudentGradingForm = ({ formData, handleChange, handleSubmit, handleChangeOnAddingRegID }) => {
  const [SID, setSID] = useState(null)
  const getStudent = async() => {
    console.log(SID);
    const res = await axios({
      method : "get",
      url : `${baseurl}/getStudent?sid=${SID}`
    })
    console.log(res);
    const { first_name, middle_name, last_name, company } = res.data.student
    const { batch_name } = res.data.batch_details
    const { camp_name } = res.data.camp_details
    // console.log(res.data.camp_details.camp_name);
    handleChangeOnAddingRegID(first_name+middle_name+last_name, camp_name, company, batch_name )
  }
const handleChangeRegID = async(e) => {
  setSID(e.target.value)
  handleChange(e)
}

useEffect(()=>{
  if (SID !== null) {
    getStudent()
  }
}, [SID])

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">Registration ID:</label>
          <input
            type="text"
            name="sid"
            value={formData.sid}
            onChange={(e)=>handleChangeRegID(e)}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">Rank:</label>
          <input
            type="text"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">Camp Name:</label>
          <input
            type="text"
            name="report_camp_name"
            value={formData.report_camp_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">In Charge:</label>
          <input
            type="text"
            name="in_charge"
            value={formData.in_charge}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">CQY:</label>
          <input
            type="text"
            name="cqy"
            value={formData.cqy}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <label className="block text-gray-700">Batch</label>
          <input
            type="text"
            name="batch_name"
            value={formData.batch_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>
      <hr></hr>
      <h3 className="text-center font-bold text-xl pb-6">Grading Parameters</h3>
      <div className="grid grid-cols-2 gap-4">
  {Object.keys(formData).map(
    (key) =>
      key !== "name" &&
      key !== "sid" &&
      key !== "rank" &&
      key !== "date" &&
      key !== "report_camp_name" &&
      key !== "in_charge" &&
      key !== "cqy" && (
        <div key={key} className="flex flex-col">
          <span className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
          <div className="grid grid-cols-6 gap-2 mb-2">
            {["1", "2", "3", "4", "5"].map((rating) => (
              <label key={rating} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name={`${key}_${rating}`}
                  checked={formData[key] === rating.toString()}
                  onChange={() =>
                    handleChange({
                      target: { name: key, value: rating.toString() },
                    })
                  }
                  className="form-checkbox text-blue-500"
                />
                <span className="ml-2 text-gray-700">
                  {(() => {
                    switch (rating) {
                      case "1":
                        return "Bad";
                      case "2":
                        return "Average";
                      case "3":
                        return "OK";
                      case "4":
                        return "Good";
                      case "5":
                        return "Excellent";
                      default:
                        return "";
                    }
                  })()}
                </span>
              </label>
            ))}
          </div>
        </div>
      )
  )}
</div>

      <button
        type="submit"
        className="w-32 p-3 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
      >
        Submit
      </button>
    </form>
  );
};

const GenerateReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sid: "",
    rank: "",
    date: "",
    report_camp_name: "",
    in_charge: "",
    cqy: "",
    company: "",
    batch_name: "",
    discipline: "average",
    physical_fitness: "average",
    courage: "average",
    leadership: "average",
    initiative: "average",
    interpersonal_relations: "average",
    team_Building: "average",
    training: "average",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChangeOnAddingRegID = (name, camp_name, company, batch_name) => {
    setFormData({ ...formData, name, report_camp_name: camp_name, company, batch_name});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://mcfapis.bnbdevelopers.in/generateReport?sid=${formData.sid}`,
        {
          ...formData,
          sid: formData.sid, // Ensure sid is included in the request body
        }
      );
      alert("Report generated successfully");
      console.log(response.data); // Handle success response
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data); // Handle error response from the server
      } else if (error.request) {
        console.error("Request Error:", error.request); // Handle error related to the request itself
      } else {
        console.error("Error:", error.message); // Handle other errors
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-screen-xl mx-auto">
            <div className="col-span-full xl:col-span-12 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
              <header
                className="px-5 py-4 border-b border-slate-100 dark:border-slate-700"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                  Generate Report
                </h2>
                <Link
                  end
                  to="/ReportCard"
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Back to Report Cards
                </Link>
              </header>
              <div className="p-3 shadow-lg border border-gray-300 rounded-lg">
                <StudentGradingForm
                  formData={formData}
                  handleChange={handleChange}
                  handleChangeOnAddingRegID={handleChangeOnAddingRegID}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GenerateReport;
