import {Table, Group, Text, ActionIcon, rem} from '@mantine/core';
import {IconTrash} from '@tabler/icons-react';
import React from "react";
import {PetResponse} from "@/components/vaccination/objects";
import {deleteById, findAll, search} from "@/components/vaccination/VaccinationService";
import {useNavigate} from "react-router-dom";
import UpdateVaccinationModalActionIcon from "@/components/vaccination/modal/UpdateVaccinationModalActionIcon";
import {showModal} from "@/App";

export function VaccinationsTable({vaccinations = [new PetResponse()]}) {
  const navigate = useNavigate();
  const deleteRecord = (id: number) => {
    deleteById(id)
      .then(() => console.log('Vaccination deleted successfully'))
      .catch((error) => showModal('Error', error.response.data.message));
  }
  const tableFormer = (item: PetResponse) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text onClick={() => navigate(`/vaccinations/${item.id}`)} fz="sm" fw={500}>{item.name}</Text>
            <Text c="dimmed" fz="xs">{item.name}</Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.code}</Text>
        <Text fz="xs" c="dimmed">Code</Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.administrationDate}</Text>
        <Text fz="xs" c="dimmed">Administration Date</Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.expirationDate}</Text>
        <Text fz="xs" c="dimmed">Expiration Date</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
          <UpdateVaccinationModalActionIcon vaccination={item}/>

          <ActionIcon onClick={() => deleteRecord(+item.id)} variant="subtle" color="red">
            <IconTrash style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
          </ActionIcon>

        </Group>
      </Table.Td>
    </Table.Tr>
  );

  const rows = vaccinations.map(item => tableFormer(item));

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