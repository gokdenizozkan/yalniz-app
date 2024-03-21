import {useDisclosure} from '@mantine/hooks';
import {ActionIcon, Box, Button, Group, Modal, rem, TextInput} from '@mantine/core';
import {useForm} from "@mantine/form";
import {save} from "@/components/pet/PetService";
import {PetSaveRequest} from "@/components/pet/objects";
import {IconCat} from "@tabler/icons-react";
import React, {useState} from "react";
import {DatePickerInput} from "@mantine/dates";
import {showModal} from "@/App";

function SavePetModalMenuItem({customerId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [birthdate, setBirthdate] = useState<Date | null>(null);

  let initialPet = new PetSaveRequest();
  initialPet.ownerId = customerId;

  const petForm = useForm(
    {
      initialValues: initialPet,
    }
  );

  const onSubmit = (values:PetSaveRequest) => {
    const birthdateLocalDate = birthdate?.toISOString().split('T')[0];
    if (!birthdateLocalDate) return;

    values.birthdate = birthdateLocalDate;

    save(values)
      .then(() => {
        console.log("pet saved successfully", values);
        window.location.reload();
      })
      .catch((error) => showModal("Error", "Error saving pet"));
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Pet" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={petForm.onSubmit((values) => onSubmit(values))}>
            <TextInput withAsterisk label="Name" placeholder="Rifki" {...petForm.getInputProps('name')} />
            <TextInput withAsterisk label="Species" placeholder="Turtle" {...petForm.getInputProps('species')} />
            <TextInput withAsterisk label="Breed" placeholder="Red-Eared Slider" {...petForm.getInputProps('breed')} />
            <TextInput withAsterisk label="Gender" placeholder="Female" {...petForm.getInputProps('gender')} />
            <TextInput withAsterisk label="Color" placeholder="Green" {...petForm.getInputProps('color')} />
            <DatePickerInput withAsterisk label="Birthdate" valueFormat="YYYY-MM-DD" placeholder="Pick birthdate" value={birthdate} onChange={(v) => setBirthdate(v)} />
            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <ActionIcon onClick={open} variant="subtle" color="darkgreen">
        <IconCat style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}

export default SavePetModalMenuItem;