import {Avatar, Table, Group, Text, ActionIcon, rem} from '@mantine/core';
import {
  IconMessages,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import React, {useEffect, useRef, useState} from "react";
import {CustomerResponse} from "@/components/customer/objects";
import {deleteById, findAll, search} from "@/components/customer/CustomerService";
import UpdateCustomerModalActionIcon from "@/components/customer/modal/UpdateCustomerModalActionIcon";
import {InputWithButton} from "@/components/firstParty/InputWithButton";
import {useNavigate} from "react-router-dom";
import SavePetModalMenuItem from "@/components/pet/modal/SavePetModalMenuItem";
import AddAppointmentModalActionIcon from "@/components/customer/modal/AddAppointmentModalActionIcon";

export function CustomersTable() {
  const navigate = useNavigate();
  const searchCustomer = (name:string) => {
    search(name)
      .then(response => loadData(response.data, setData))
      .catch(error => console.error('Error searching customer', error, '\n\tsearched for:', name));
  };
  const deleteRecord = (id:number) => {
    deleteById(id)
      .then(() => console.log('Customer deleted successfully'))
      .catch((error) => console.error('Error deleting customer', error));
  }
  const tableFormer = (item:any) => (
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

          <SavePetModalMenuItem />

          <AddAppointmentModalActionIcon ownerId={item.id}/>

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
      mockDataLoader(setData);
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
  setData(findAll()
    .then(response => response.data)
    .catch(error => console.error('Error loading customers', error)));
}

function mockDataLoader(setData: any) {
  setData([
    {
      id: 1,
      name: 'Abdullah',
      phone: '+9012345678',
      email: 'abd@gmail.com',
      address: 'Giresun Mah.',
      city: 'Ankara',
      pets: [],
    },
  ]);
}