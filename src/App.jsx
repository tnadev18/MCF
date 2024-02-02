import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Table from './pages/camp';
import RegStudent from './pages/registered-students';
import CanStudent from './pages/cancelled-students';
import Settings from './pages/settings';
import ReportCard from './pages/ReportCard';
import Filter from './pages/Filter';
import AddStudent from './forms/add_students_form/add_students';
import AddCamp from './forms/add_camp';
import FeeDetails from './pages/Button/fee_details';
import FeeDiscount from './pages/Button/fee_discount';
import Batchdetails from './pages/Button/batch_details';
import AddBatch from './forms/add_batch';
import GenerateReport from './forms/generate_report';
import VeiwReportCard from './pages/Button/veiw_reportcard';
import EditFeeDetails from './forms/edit_fee_details';
import UpdateStudentDetails from './pages/update_student_form';
import AdmitCard from './pages/Button/veiw_entrance_card';
import AuthPage from './pages/auth';
import Receipt from './pages/Button/veiw-receipt';
import AdmissionForm from './pages/admissionform';
import PositionedSnackbar from './components/Toast';
import EditBatch from './pages/edit_batch';
import Discount from './pages/discount';
import View_medical_certificate from './pages/Button/View_medical_certificate';
import RegisterAdmin from './pages/register';
import ExtStudent from './pages/extended-students';
import RefStudent from './pages/refunded-students';
import Reciptlist from './pages/receipt_list';
import Medicallist from './pages/medical_certificate';
import Reportlist from './pages/reportlist';
import Enterancecard from './pages/enterancecard_list';
import Pickuplist from './pages/pick-ip_pointlist';
import Actstudent from './pages/active-students';
import VisitingCard from './pages/visiting_card_list';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  

  return (
    <>
      <Routes>
        <Route exact path="/" element={<AuthPage />} />
        <Route exact path="/dash" element={<Dashboard/>}/>
        <Route exact path="/camp" element={<Table/>}/>
        <Route exact path="/regStudent" element={<RegStudent/>}/>
        <Route exact path='/CanStudent' element={<CanStudent/>}/>
        <Route exact path="/settings" element={<Settings/>}/>
        <Route exact path="/Reportcard" element={<ReportCard/>}/>
        <Route exact path="/Filter" element={<Filter/>}/>
        <Route exact path="/add-student" element={<AddStudent/>}/>
        <Route exact path="/add-camp" element={<AddCamp/>}/>
        <Route exact path="/fee-details" element={<FeeDetails/>}/>
        <Route exact path="/fee-discounts" element={<FeeDiscount/>}/>
        <Route exact path="/batch-details" element={<Batchdetails />} />
        <Route exact path="/add-batch" element={<AddBatch/>} />
        <Route exact path="/generate-report" element={<GenerateReport/>}/>
        <Route exact path="/view-report" element={<VeiwReportCard />} />
        <Route exact path="/view_medical_report/:id" element={<View_medical_certificate />} />
        <Route exact path="/edit-fee-details" element={<EditFeeDetails />} />
        <Route exact path="/update-student-details" element={<UpdateStudentDetails />} />
        <Route exact path="/veiw-entrance" element={<AdmitCard />} />
        <Route exact path="/receipt" element={<Receipt />} />
        <Route exact path="/toast" element={<PositionedSnackbar />} />
        <Route exact path="/admission-form" element={<AdmissionForm />} />
        <Route exact path="/edit-batch" element={<EditBatch />} />
        <Route exact path="/discount" element={<Discount />} />
        <Route exact path="/register" element={<RegisterAdmin />} />
        <Route exact path="/extStudent" element={<ExtStudent />} />
        <Route exact path="/refStudent" element={<RefStudent />} />
        <Route exact path="/Receiptlist" element={<Reciptlist />}/>
        <Route exact path="/Medicallist" element={<Medicallist/>}/>
        <Route exact path="/Reportlist" element={<Reportlist/>}/>
        <Route exact path="/Enterancecard" element={<Enterancecard/>}/>
        <Route exact path="/Pickuplist" element={<Pickuplist/>}/>
        <Route exact path="/Actstudent" element={<Actstudent/>}/>
        <Route exact path='/VisitingCard' element={<VisitingCard/>}/>
      </Routes>
    </>
  );  
}

export default App;