import {Avatar, Table, Group, Text, ActionIcon, rem} from '@mantine/core';
import {
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import React, {useEffect, useRef, useState} from "react";
import {AppointmentResponse} from "@/components/appointment/objects";
import {deleteById, findAll} from "@/components/appointment/AppointmentService";
import {findById as findByIdVet} from "@/components/vet/VetService";
import {findById as findByIdPet} from "@/components/pet/PetService";
import {useNavigate} from "react-router-dom";
import {PetResponse} from "@/components/pet/objects";
import {VetResponse} from "@/components/vet/objects";
import UpdateAppointmentModalActionIcon from "@/components/appointment/modal/UpdateAppointmentModalActionIcon";
import SaveReportModalActionIcon from "@/components/report/modal/SaveReportModalActionIcon";

export function AppointmentsTable() {
  const navigate = useNavigate();
  const deleteRecord = (id: number) => {
    deleteById(id)
      .then(() => console.log('Appointment deleted successfully'))
      .catch((error) => console.error('Error deleting  Appointment', error));
  }
  const tableFormer = (item: AppointmentResponse) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text onClick={() => navigate(`/appointment/${item.id}`)} fz="sm" fw={500}>{item.id}</Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.start}</Text>
        <Text fz="xs" c="dimmed">Start Date</Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.end}</Text>
        <Text fz="xs" c="dimmed">End Date</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">

          <UpdateAppointmentModalActionIcon appointmentId={item.id} />

          <SaveReportModalActionIcon appointmentId={item.id} />

          <ActionIcon onClick={() => deleteRecord(+item.id)} variant="subtle" color="red">
            <IconTrash style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
          </ActionIcon>

        </Group>
      </Table.Td>
    </Table.Tr>
  );

  const [data, setData] = useState([] as AppointmentResponse[]);
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

function loadData(dataToLoad: any, setData: any) {
  setData(dataToLoad);
}

function loadAllData(setData: any) {
  findAll()
    .then(response => setData(response.data.data))
    .catch(error => console.error('Error loading Appointments', error));
}

function loadSurroudingData(vetId: number, petId: number, petData: any, vetData: any) {
  findByIdPet(petId)
    .then(response => petData = response.data.data)
    .catch(error => console.error('Error loading Pet', error));

  findByIdVet(vetId)
    .then(response => vetData = response.data.data)
    .catch(error => console.error('Error loading Vet', error));
}