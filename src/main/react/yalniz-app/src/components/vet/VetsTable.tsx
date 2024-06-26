import {ActionIcon, Avatar, Group, rem, Table, Text} from '@mantine/core';
import {IconTrash, IconUser,} from '@tabler/icons-react';
import React, {useEffect, useRef, useState} from "react";
import {VetResponse} from "@/components/vet/objects";
import {deleteById, findAll} from "@/components/vet/VetService";
import UpdateVetModalActionIcon from "@/components/vet/modal/UpdateVetModalActionIcon";
import {useNavigate} from "react-router-dom";
import AddWorkdayModalActionIcon from "@/components/vet/workday/modal/AddWorkdayModalActionIcon";
import {showModal} from "@/App";

export function VetsTable() {
  const navigate = useNavigate();
  const deleteRecord = (id:number) => {
    deleteById(id)
      .then(() => {
        console.log('Vet deleted successfully');
        window.location.reload();
      })
      .catch((error) => showModal('Error deleting Vet', error));
  }

  const tableFormer = (item:VetResponse) => (
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
    .catch(error => showModal('Error loading Vets', error));
}