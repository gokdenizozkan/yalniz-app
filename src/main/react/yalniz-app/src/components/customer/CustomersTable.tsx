import {ActionIcon, Avatar, Group, rem, Table, Text} from '@mantine/core';
import {IconTrash, IconUser,} from '@tabler/icons-react';
import React, {useEffect, useRef, useState} from "react";
import {CustomerResponse} from "@/components/customer/objects";
import {deleteById, findAll, search} from "@/components/customer/CustomerService";
import UpdateCustomerModalActionIcon from "@/components/customer/modal/UpdateCustomerModalActionIcon";
import {InputWithButton} from "@/components/firstParty/InputWithButton";
import {useNavigate} from "react-router-dom";
import SavePetModalMenuItem from "@/components/pet/modal/SavePetModalMenuItem";
import AddAppointmentModalActionIcon from "@/components/appointment/modal/AddAppointmentModalActionIcon";
import {showModal} from "@/App";

export function CustomersTable() {
  const navigate = useNavigate();
  const searchCustomer = (name:string) => {
    search(name)
      .then(response => loadData(response.data.data, setData))
      .catch(error => showModal("Error", "Error searching customers"));
  };
  const deleteRecord = (id:number) => {
    deleteById(id)
      .then(() => {
        console.log('Customer deleted successfully')
        loadAllData(setData);
      })
      .catch((error) => showModal("Error", "Error deleting customer"));
  }
  const tableFormer = (item:CustomerResponse) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={IconUser.toString()} radius={40}/>
          <div>
            <Text onClick={() => navigate(`/customers/${item.id}`)} fz="sm" fw={500}>{item.name}</Text>
            <Text c="dimmed" fz="xs">{item.phone}</Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.email}</Text>
        <Text fz="xs" c="dimmed">Email</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
          <UpdateCustomerModalActionIcon customerId={item.id}/>

          <SavePetModalMenuItem customerId={item.id} />

          <AddAppointmentModalActionIcon customerId={item.id}/>

          <ActionIcon onClick={() => deleteRecord(+item.id)} variant="subtle" color="red">
            <IconTrash style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
          </ActionIcon>

        </Group>
      </Table.Td>
    </Table.Tr>
  );

  const [data, setData] = useState([] as CustomerResponse[]);
  const rows = data.map(item => tableFormer(item));

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      loadAllData(setData);
    }
  }, [data]);

  return (
    <>
      <InputWithButton placeholder="Search customers" runnableOnSubmit={searchCustomer}/>
      <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="md">
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
    </>
  );
}

function loadData(dataToLoad:any, setData:any) {
  setData(dataToLoad);
}

function loadAllData(setData:any) {
  findAll()
    .then(response => setData(response.data.data))
    .catch(error => showModal("Error", "Error loading customers"));
}