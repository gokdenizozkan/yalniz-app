import {useParams} from "react-router-dom";
import {findById} from "@/components/report/ReportService";
import {ReportResponse} from "@/components/report/objects";
import {useEffect, useState} from "react";
import {WorkdaysTable} from "@/components/vet/workday/WorkdaysTable";
import {VaccinationsTable} from "@/components/vaccination/VaccinationsTable";
import {showModal} from "@/App";

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

  console.log('report', report);
  return (
    <div>
      <h1>Report</h1>
      <p>Report id: {id}</p>
      <p>{report.title}</p>
      <p>{report.diagnosis}</p>
      <p>{report.cost}</p>
      <h2>Appointment details</h2>
      <p>{report.appointmentId}</p>
      <p>{report.appointmentDateTime}</p>
      <h2>Vaccinations</h2>
      <VaccinationsTable vaccinations={report.vaccinations}/>
    </div>
  );
}

export default VetPage;