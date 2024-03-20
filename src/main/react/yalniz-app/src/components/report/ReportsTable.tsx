import {Avatar, Table, Group, Text, ActionIcon, rem} from '@mantine/core';
import {
  IconTrash
} from '@tabler/icons-react';
import React, {useEffect, useRef, useState} from "react";
import {ReportResponse} from "@/components/report/objects";
import {deleteById, findAll} from "@/components/report/ReportService";
import {useNavigate} from "react-router-dom";
import UpdateReportModalActionIcon from "@/components/report/modal/UpdateReportModalActionIcon";
import SaveVaccinationModalButton from "@/components/vaccination/modal/SaveVaccinationModalButton";

export function ReportsTable() {
  const navigate = useNavigate();
  const deleteRecord = (id:number) => {
    deleteById(id)
      .then(() => console.log('Report deleted successfully'))
      .catch((error) => console.error('Error deleting Report with id', id, error));
  }
  const tableFormer = (item:ReportResponse) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text onClick={() => navigate(`/vets/${item.id}`)} fz="sm" fw={500}>{item.title}</Text>
            <Text c="dimmed" fz="xs">{item.cost}</Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.diagnosis}</Text>
        <Text fz="xs" c="dimmed">Diagnosis</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
          <UpdateReportModalActionIcon reportId={item.id}/>

          <SaveVaccinationModalButton reportId={item.id} appointmentId={item.appointmentId} />

          <ActionIcon onClick={() => deleteRecord(+item.id)} variant="subtle" color="red">
            <IconTrash style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
          </ActionIcon>

        </Group>
      </Table.Td>
    </Table.Tr>
  );

  const [data, setData] = useState([] as ReportResponse[]);
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
    .catch(error => console.error('Error loading Vets', error));
}