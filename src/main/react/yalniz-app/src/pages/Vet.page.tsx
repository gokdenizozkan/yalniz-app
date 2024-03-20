import {useParams} from "react-router-dom";
import {findByIdWithWorkdays} from "@/components/vet/VetService";
import {VetResponseWithWorkdays} from "@/components/vet/objects";
import {useEffect, useState} from "react";
import {WorkdaysTable} from "@/components/vet/workday/WorkdaysTable";
import {showModal} from "@/App";

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

  console.log('vet', vet);
  return (
    <div>
      <h1>Vet</h1>
      <p>Vet page</p>
      <p>Vet id: {id}</p>
      <p>{vet.id}</p>
      <p>{vet.name}</p>
      <p>{vet.email}</p>
      <p>{vet.address}</p>
      <p>{vet.city}</p>
      <p>{vet.phone}</p>
      <WorkdaysTable workdays={vet.workdays}/>
    </div>
  );
}

export default VetPage;