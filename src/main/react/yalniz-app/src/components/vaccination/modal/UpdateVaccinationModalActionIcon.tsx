import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Checkbox, Group, Textarea, ActionIcon, rem} from '@mantine/core';
import {useForm} from "@mantine/form";
import {update} from "@/components/vaccination/VaccinationService";
import React, {useState} from "react";
import {IconPencil} from "@tabler/icons-react";
import {VaccinationResponse, VaccinationUpdateRequest} from "@/components/vaccination/objects";
import {DatePickerInput} from "@mantine/dates";

export default UpdateVaccinationModalActionIcon;

function UpdateVaccinationModalActionIcon({vaccination= new VaccinationResponse()}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [administrationDate, setAdministrationDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const request = new VaccinationUpdateRequest();
  request.id = vaccination.id;
  request.name = vaccination.name;
  request.code = vaccination.code;
  request.administrationDate = vaccination.administrationDate;
  request.expirationDate = vaccination.expirationDate;
  request.petId = vaccination.petId;
  request.reportId = vaccination.reportId;



  const vaccinationForm = useForm(
    {
      initialValues: request,
    }
  );

  const onSubmit = (values: VaccinationUpdateRequest) => {
    request.name = values.name;
    request.code = values.code;
    request.administrationDate = administrationDate?.toISOString() as string;
    request.expirationDate = expirationDate?.toISOString() as string;

    console.log(request, "<- request");
    update(+vaccination.id, request)
      .then(() => {
        console.log("vaccination updated successfully");
      })
      .catch((error) => {
        console.error("Error updating vaccination", error);
      })
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Vaccination" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={vaccinationForm.onSubmit(values => onSubmit(values))}>
            <TextInput withAsterisk label="Name"
                       placeholder="Hold the Door" {...vaccinationForm.getInputProps('name')} />
            <TextInput withAsterisk label="Code" placeholder="ASAM-54X" {...vaccinationForm.getInputProps('code')} />
            <DatePickerInput label="Administration Date" placeholder="YYYY-MM-DD" value={administrationDate}
                             onChange={(v) => setAdministrationDate(v)}/>
            <DatePickerInput label="Expiration Date" placeholder="YYYY-MM-DD" value={expirationDate}
                             onChange={(v) => setExpirationDate(v)}/>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <ActionIcon onClick={open} variant="subtle" color="gray" >
        <IconPencil style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}
