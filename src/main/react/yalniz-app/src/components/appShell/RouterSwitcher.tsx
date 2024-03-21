import {Route, Routes} from "react-router-dom";
import React from "react";
import DashboardPage from "@/pages/Dashboard.page";
import AppointmentsPage from "@/pages/Appointments.page";
import ReportsPage from "@/pages/Reports.page";
import CustomersPage from "@/pages/Customers.page";
import VetsPage from "@/pages/Vets.page";
import NotFoundPage from "@/pages/NotFound.page";
import CustomerPage from "@/pages/Customer.page";
import VetPage from "@/pages/Vet.page";
import ReportPage from "@/pages/Report.page";

function RouterSwitcher() {
  return (
    <Routes>
      <Route path="/*" element={<NotFoundPage />} />

      <Route path={"/#/dashboard"} element={<DashboardPage />} />
      <Route path={"/#/appointments"} element={<AppointmentsPage />} />
      <Route path={"/#/reports"} element={<ReportsPage />} />
      <Route path={"/#/customers"} element={<CustomersPage />} />
      <Route path={"/#/vets"} element={<VetsPage />} />

      <Route path={"/#/customers/:id"} element={<CustomerPage />}/>
      <Route path={"/#/vets/:id"} element={<VetPage />}/>
      <Route path={"/#/reports/:id"} element={<ReportPage />}/>
    </Routes>
  )
}

export default RouterSwitcher;