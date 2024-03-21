import {Table, Group, Text, ActionIcon, rem} from '@mantine/core';
import {IconTrash} from '@tabler/icons-react';
import React from "react";
import {PetResponse} from "@/components/pet/objects";
import {deleteById} from "@/components/pet/PetService";
import {useNavigate} from "react-router-dom";
import UpdatePetModalActionIcon from "@/components/pet/modal/UpdatePetModalActionIcon";
import {showModal} from "@/App";

export default function PetsTable({pets = [new PetResponse()]}) {
  const navigate = useNavigate();
  const deleteRecord = (id: number) => {
    deleteById(id)
      .then(() => {
        console.log('Vaccination deleted successfully');
        window.location.reload();
      })
      .catch((error) => showModal("Error deleting pet", `Could not delete pet with id ${id}`));
  }
  const tableFormer = (item: PetResponse) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <div>
            <Text onClick={() => navigate(`/pets/${item.id}`)} fz="sm" fw={500}>{item.name}</Text>
            <Text c="dimmed" fz="xs">{item.name}</Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.species}</Text>
        <Text fz="xs" c="dimmed">Species</Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.breed}</Text>
        <Text fz="xs" c="dimmed">Breed</Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.color}</Text>
        <Text fz="xs" c="dimmed">Color</Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{item.gender}</Text>
        <Text fz="xs" c="dimmed">Gender</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
          <UpdatePetModalActionIcon pet={item}/>

          <ActionIcon onClick={() => deleteRecord(+item.id)} variant="subtle" color="red">
            <IconTrash style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
          </ActionIcon>

        </Group>
      </Table.Td>
    </Table.Tr>
  );

  const rows = pets.map(item => tableFormer(item));

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