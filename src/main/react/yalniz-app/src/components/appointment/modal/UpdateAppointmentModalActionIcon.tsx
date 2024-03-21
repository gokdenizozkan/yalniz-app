import {useDisclosure} from '@mantine/hooks';
import {ActionIcon, Box, Button, Group, Modal, rem} from '@mantine/core';
import {useForm} from "@mantine/form";
import {findById, update} from "@/components/appointment/AppointmentService";
import {AppointmentResponse, AppointmentUpdateRequest} from "@/components/appointment/objects";
import React, {useState} from "react";
import {IconPencil} from "@tabler/icons-react";
import {DateTimePicker} from "@mantine/dates";
import {showModal} from "@/App";

export default UpdateVaccinationModalActionIcon;

function UpdateVaccinationModalActionIcon({appointmentId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [appointment, setAppointment] = useState<AppointmentResponse>();

  const readyForm = () => {
    if (appointmentId !== -1) {
      findById(appointmentId)
        .then(response => setAppointment(response.data.data))
        .catch(() => showModal("Error", "Error fetching appointment"));
      open();
    }
  }

  const appointmentForm = useForm(
    {
      initialValues: new AppointmentUpdateRequest(),
    }
  );

  const onSubmit = () => {
    var request = new AppointmentUpdateRequest();
    request.start = startDateTime?.toISOString() as string;
    request.id = appointmentId;
    request.petId = appointment?.petId as number;
    request.vetId = appointment?.vetId as number;

    update(+appointmentId, request)
      .then(() => {
        console.log("appointment updated successfully");
        window.location.reload();
      })
      .catch((error) => showModal("Error", error.message))
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Appointment" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={(values) => {onSubmit()}}>
            <DateTimePicker withAsterisk label="Date and Time"
                            placeholder="2022-12-31 14:00" value={startDateTime} onChange={(v) => setStartDateTime(v)} />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <ActionIcon onClick={readyForm} variant="subtle" color="gray" >
        <IconPencil style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}
