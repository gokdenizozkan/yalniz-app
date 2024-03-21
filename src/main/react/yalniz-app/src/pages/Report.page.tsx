import {useParams} from "react-router-dom";
import {findById} from "@/components/report/ReportService";
import {ReportResponse} from "@/components/report/objects";
import React, {useEffect, useState} from "react";
import {WorkdaysTable} from "@/components/vet/workday/WorkdaysTable";
import {VaccinationsTable} from "@/components/vaccination/VaccinationsTable";
import {showModal} from "@/App";
import {Container} from "@mantine/core";

function VetPage() {
  const {id} = useParams();
  const [report, setReport] = useState<ReportResponse>(new ReportResponse());
  if (id === undefined || Number.isNaN(parseInt(id))) {
    throw new Error('id is undefined');
  }

  useEffect(() => {
    findById(+id)
      // @ts-ignore
      .then((result) => setReport(result.data.data))
      .catch(error => showModal('Error', error.response.data.message));
  }, [id]);

  return (
    <div>
      <h1>Report</h1>
      <p>Report id: {id}</p>
      <p>Title: {report.title}</p>
      <p>Diagnosis: {report.diagnosis}</p>
      <p>Cost: {report.cost}</p>
      <h2>Appointment details</h2>
      <p>Appointment id: {report.appointmentId}</p>
      <p>Appointment date: {report.appointmentDateTime}</p>
      <h2>Vaccinations</h2>
      <Container>
        <VaccinationsTable vaccinations={report.vaccinations}/>
      </Container>
    </div>
  );
}

export default VetPage;