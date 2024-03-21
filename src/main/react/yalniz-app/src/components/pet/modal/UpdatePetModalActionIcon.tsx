import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput,Group, ActionIcon, rem} from '@mantine/core';
import {useForm} from "@mantine/form";
import {findById, update} from "@/components/pet/PetService";
import {PetResponse, PetUpdateRequest} from "@/components/pet/objects";
import React, {useState} from "react";
import {IconPencil} from "@tabler/icons-react";
import {DatePickerInput} from "@mantine/dates";
import {showModal} from "@/App";

function UpdatePetModalActionIcon({pet = new PetResponse()}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [birthdate, setBirthdate] = useState<Date | null>(null);

  const request = new PetUpdateRequest();
  request.id = pet.id;
  request.name = pet.name;
  request.species = pet.species;
  request.breed = pet.breed;
  request.gender = pet.gender;
  request.color = pet.color;
  request.birthdate = pet.birthdate;
  request.ownerId = pet.ownerId;


  const petForm = useForm(
    {
      initialValues: request,
    }
  );

  const onSubmit = (values:PetUpdateRequest) => {
    const birthdateLocalDate = birthdate?.toISOString().split('T')[0];
    if (!birthdateLocalDate) return;

    const request = new PetUpdateRequest();
    request.id = pet.id;
    request.name = values.name;
    request.species = values.species;
    request.breed = values.breed;
    request.color = values.color;
    request.gender = values.gender;
    request.birthdate = birthdateLocalDate;
    request.ownerId = pet.ownerId;

    console.log(request);
    update(pet.id, request)
      .then(() => {
        console.log("pet updated successfully");
        window.location.reload();
      })
      .catch(() => showModal("Error", "Error updating pet"));
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Pet" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={petForm.onSubmit((values) => onSubmit(values))}>
            <TextInput withAsterisk label="Name" placeholder="Rifki" {...petForm.getInputProps('name')} />
            <TextInput withAsterisk label="Species" placeholder="Turtle" {...petForm.getInputProps('species')} />
            <TextInput withAsterisk label="Breed" placeholder="Red-Eared Slider" {...petForm.getInputProps('breed')} />
            <TextInput withAsterisk label="Gender" placeholder="Female" {...petForm.getInputProps('gender')} />
            <TextInput withAsterisk label="Color" placeholder="Green" {...petForm.getInputProps('color')} />
            <DatePickerInput withAsterisk label="Birthdate" valueFormat="YYYY-MM-DD" placeholder="Pick birthdate"
                             value={birthdate} onChange={(v) => setBirthdate(v)}/>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <ActionIcon onClick={open} variant="subtle" color="gray">
        <IconPencil style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}

export default UpdatePetModalActionIcon;