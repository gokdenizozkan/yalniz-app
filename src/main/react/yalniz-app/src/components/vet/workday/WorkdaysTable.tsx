import {Avatar, Table, Group, Text, ActionIcon, rem} from '@mantine/core';
import {
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import React from "react";
import {deleteById} from "@/components/vet/workday/WorkdayService";
import UpdateWorkdayModalActionIcon from "@/components/vet/workday/modal/UpdateWorkdayModalActionIcon";
import {useNavigate} from "react-router-dom";
import {WorkdayResponse} from "@/components/vet/workday/objects";
import {showModal} from "@/App";

export function WorkdaysTable({workdays = [new WorkdayResponse()]}) {
  const navigate = useNavigate();
  const deleteRecord = (id: number) => {
    deleteById(id)
      .then(() => console.log('Workday deleted successfully'))
      .catch((error) => showModal('Error', error.response.data.message));
  }
  const tableFormer = (item: WorkdayResponse) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} src={IconUser.toString()} radius={40}/>
          <div>
            <Text onClick={() => navigate(`/workdays/${item.id}`)} fz="sm" fw={500}>{item.id}</Text>
            <Text c="dimmed" fz="xs">{item.vetId}</Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.date}</Text>
        <Text fz="xs" c="dimmed">Date</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
          <UpdateWorkdayModalActionIcon workdayId={item.id} vetId={item.vetId} />

          <ActionIcon onClick={() => deleteRecord(+item.id)} variant="subtle" color="red">
            <IconTrash style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
          </ActionIcon>

        </Group>
      </Table.Td>
    </Table.Tr>
  );

  const rows = workdays.map(item => tableFormer(item));

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