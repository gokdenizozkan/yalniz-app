import {useParams} from "react-router-dom";
import {findById} from "@/components/customer/CustomerService";
import {CustomerResponse} from "@/components/customer/objects";
import {useEffect, useState} from "react";
import PetsTable from "@/components/pet/PetsTable";
import {showModal} from "@/App";
import {Container} from "@mantine/core";

function CustomerPage() {
  const {id} = useParams();
  const [customer, setCustomer] = useState(new CustomerResponse());
  if (id === undefined || Number.isNaN(parseInt(id))) {
    throw new Error('id is undefined');
  }

  useEffect(() => {
    findById(+id)
      // @ts-ignore
      .then((result) => setCustomer(result.data.data))
      .catch(error => showModal("Error fetching customer", `Could not fetch customer with id ${id}`));
  }, [id]);

  console.log('customer', customer);
  return (
    <Container>
      <div>
        <h1>Customer</h1>
        <p>Id: {customer.id}</p>
        <p>Name: {customer.name}</p>
        <p>Email: {customer.email}</p>
        <p>Address: {customer.address}</p>
        <p>City: {customer.city}</p>
        <p>Phone: {customer.phone}</p>
        <h2>Pets</h2>

        <PetsTable pets={customer.pets}/>
      </div>
    </Container>
  );
}

export default CustomerPage;