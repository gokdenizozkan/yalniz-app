import {Avatar, Table, Group, Text, ActionIcon, rem} from '@mantine/core';
import {
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import React, {useEffect, useRef, useState} from "react";
import {VaccinationResponse} from "@/components/vaccination/objects";
import {deleteById, findAll, search} from "@/components/vaccination/VaccinationService";
import UpdateVetModalActionIcon from "@/components/vaccination/modal/UpdateVaccinationModalActionIcon";
import {InputWithButton} from "@/components/firstParty/InputWithButton";
import {useNavigate} from "react-router-dom";
import AddWorkdayModalActionIcon from "@/components/vaccination/workday/modal/AddWorkdayModalActionIcon";

export function ReportsTable() {
  const navigate = useNavigate();
  const searchVet = (name:string) => {
    search(name)
      .then(response => loadData(response.data, setData))
      .catch(error => console.error('Error searching Vet', error, '\n\tsearched for:', name));
  };
  const deleteRecord = (id:number) => {
    deleteById(id)
      .then(() => console.log('Vet deleted successfully'))
      .catch((error) => console.error('Error deleting  Vet', error));
  }
  const tableFormer = (item:any) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={IconUser.toString()} radius={40}/>
          <div>
            <Text onClick={() => navigate(`/vets/${item.id}`)} fz="sm" fw={500}>{item.name}</Text>
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
          <UpdateVetModalActionIcon vetId={item.id}/>

          <AddWorkdayModalActionIcon vetId={item.id} />

          <ActionIcon onClick={() => deleteRecord(+item.id)} variant="subtle" color="red">
            <IconTrash style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
          </ActionIcon>

        </Group>
      </Table.Td>
    </Table.Tr>
  );

  const [data, setData] = useState([] as VetResponse[]);
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
      <InputWithButton placeholder="Search Vets" runnableOnSubmit={searchVet}/>
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
    .catch(error => console.error('Error loading Vets', error));
}