import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput,Group, ActionIcon, rem} from '@mantine/core';
import {useForm} from "@mantine/form";
import {findById, update} from "@/components/pet/PetService";
import {PetUpdateRequest} from "@/components/pet/objects";
import React, {useState} from "react";
import {IconPencil} from "@tabler/icons-react";
import {DatePickerInput} from "@mantine/dates";

function UpdatePetModalActionIcon({petId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [ownerId, setOwnerId] = useState(-1);

  const readyForm = () => {
    if (petId !== -1) {
      findById(petId)
        .then(response => {
          petForm.setValues(response.data)
          setBirthdate(new Date(response.data.birthdate));
          setOwnerId(response.data.ownerId)
        })
        .catch(console.error);
      open();
    }
  }

  const petForm = useForm(
    {
      initialValues: new PetUpdateRequest(),
    }
  );

  const onSubmit = (values:PetUpdateRequest) => {
    const birthdateLocalDate = birthdate?.toISOString().split('T')[0];
    if (!birthdateLocalDate) return;

    values.birthdate = birthdateLocalDate;
    update(petId, values)
      .then(() => console.log("customer updated successfully"))
      .catch((error) => console.error("Error updating customer", error))
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Customer" centered>
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

      <ActionIcon onClick={readyForm} variant="subtle" color="gray">
        <IconPencil style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}

export default UpdatePetModalActionIcon;