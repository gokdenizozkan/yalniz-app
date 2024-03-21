import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Checkbox, Group, Textarea, ActionIcon, rem, NumberInput} from '@mantine/core';
import {useForm} from "@mantine/form";
import {findById, update} from "@/components/report/ReportService";
import {ReportUpdateRequest} from "@/components/report/objects";
import React from "react";
import {IconPencil} from "@tabler/icons-react";
import {showModal} from "@/App";

export default UpdateReportModalActionIcon;

function UpdateReportModalActionIcon({reportId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);

  const readyForm = () => {
    if (reportId !== -1) {
      findById(reportId)
        .then(response => reportForm.setValues(response.data.data))
        .catch(() => showModal("Error", "Error fetching report"));
      open();
    }
  }

  const reportForm = useForm(
    {
      initialValues: new ReportUpdateRequest(),
    }
  );

  const onSubmit = (values: ReportUpdateRequest) => {
    const request = new ReportUpdateRequest();
    request.title = values.title;
    request.diagnosis = values.diagnosis;
    request.cost = values.cost;
    request.appointmentId = values.appointmentId;
    request.id = reportId;

    update(+reportId, reportForm.values)
      .then(() => {
        console.log("report updated successfully");
        window.location.reload();
      })
      .catch((error) => showModal("Error", error.message));
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Report" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={reportForm.onSubmit((values) => onSubmit(values))}>
            <TextInput withAsterisk label="Title" placeholder="Hold the Door" {...reportForm.getInputProps('title')} />
            <TextInput withAsterisk label="Diagnosis" placeholder="Hysteria" {...reportForm.getInputProps('diagnosis')} />
            <NumberInput withAsterisk label="Cost" placeholder="100" {...reportForm.getInputProps('cost')} />

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
