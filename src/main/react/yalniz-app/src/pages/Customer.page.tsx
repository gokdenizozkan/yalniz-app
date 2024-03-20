import {useParams} from "react-router-dom";
import {findById} from "@/components/customer/CustomerService";
import {CustomerResponse} from "@/components/customer/objects";
import {useEffect, useState} from "react";
import PetsTable from "@/components/pet/PetsTable";

function CustomerPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(new CustomerResponse());
  if (id === undefined || Number.isNaN(parseInt(id))) {
    throw new Error('id is undefined');
  }

  useEffect(() => {
    findById(+id)
      // @ts-ignore
      .then((result) => setCustomer(result.data.data))
      .catch(error => console.error('Error fetching customer', error, '\n\tid:', id));
  }, [id]);

  console.log('customer', customer);
  return (
    <div>
      <h1>Customer</h1>
      <p>Customer page</p>
      <p>Customer id: {id}</p>
      <p>{customer.id}</p>
      <p>{customer.name}</p>
      <p>{customer.email}</p>
      <p>{customer.address}</p>
      <p>{customer.city}</p>
      <p>{customer.phone}</p>
      <PetsTable pets={customer.pets}/>
    </div>
  );
}

export default CustomerPage;