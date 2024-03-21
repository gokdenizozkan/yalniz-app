import {useParams} from "react-router-dom";
import {findByIdWithWorkdays} from "@/components/vet/VetService";
import {VetResponseWithWorkdays} from "@/components/vet/objects";
import {useEffect, useState} from "react";
import {WorkdaysTable} from "@/components/vet/workday/WorkdaysTable";
import {showModal} from "@/App";
import {Container} from "@mantine/core";

function VetPage() {
  const {id} = useParams();
  const [vet, setVet] = useState<VetResponseWithWorkdays>(new VetResponseWithWorkdays());
  if (id === undefined || Number.isNaN(parseInt(id))) {
    throw new Error('id is undefined');
  }

  useEffect(() => {
    findByIdWithWorkdays(+id)
      // @ts-ignore
      .then((result) => setVet(result.data.data))
      .catch(error => showModal('Error', error.response.data.message));
  }, [id]);

  return (
    <div>
      <h1>Vet</h1>
      <p>Id: {vet.id}</p>
      <p>Name: {vet.name}</p>
      <p>Email: {vet.email}</p>
      <p>Address: {vet.address}</p>
      <p>City: {vet.city}</p>
      <p>Phone: {vet.phone}</p>
      <h2>Workdays</h2>
      <Container>
        <WorkdaysTable workdays={vet.workdays}/>
      </Container>
    </div>
  );
}

export default VetPage;