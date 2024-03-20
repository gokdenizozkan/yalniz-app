import {useDisclosure} from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Checkbox, Group, Textarea, ActionIcon, rem} from '@mantine/core';
import {useForm} from "@mantine/form";
import {save} from "@/components/vaccination/VaccinationService";
import {VaccinationSaveRequest} from "@/components/vaccination/objects";
import {DatePickerInput} from "@mantine/dates";
import {useEffect, useRef, useState} from "react";
import {IconCalendarPlus, IconMedicineSyrup} from "@tabler/icons-react";
import {PetResponse} from "@/components/pet/objects";
import {findById} from "@/components/report/ReportService";
import {findById as findAppointmentById} from "@/components/appointment/AppointmentService";
import {ReportResponse} from "@/components/report/objects";
import {showModal} from "@/App";

function SaveVaccinationModalButton({reportId = -1, appointmentId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [administrationDate, setAdministrationDate] = useState<Date | null>(null);
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const [report, setReport] = useState<ReportResponse>();
  const [petId, setPetId] = useState<number>();

  useEffect(() => {
    if (!opened) {
      return;
    }
    findAppointmentById(appointmentId as number)
      .then(response => setPetId(response.data.data.petId))
      .catch(error => showModal("Error", error.message));
  }, [opened]);



  const vaccinationForm = useForm(
    {
      initialValues: new VaccinationSaveRequest(),
    }
  );

  const onSubmit = (values: VaccinationSaveRequest) => {
    const request = new VaccinationSaveRequest();
    request.name = values.name;
    request.code = values.code;
    request.administrationDate = administrationDate?.toISOString() as string;
    request.expirationDate = expirationDate?.toISOString() as string;
    request.petId = petId as number;
    request.reportId = reportId;

    save(request)
      .then(() => console.log("Vaccination saved successfully"))
      .catch((error: any) => showModal("Error", error.message));
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Register New Vaccination" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={vaccinationForm.onSubmit((values) => onSubmit(values))}>
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

      <ActionIcon onClick={open} variant="subtle" color="brown">
        <IconMedicineSyrup style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}

export default SaveVaccinationModalButton;