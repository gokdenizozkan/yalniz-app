import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Group, ActionIcon, rem, NumberInput} from '@mantine/core';
import {useForm} from "@mantine/form";
import {save as saveReport} from "@/components/report/ReportService";
import {ReportSaveRequest} from "@/components/report/objects";
import {IconReport} from "@tabler/icons-react";
import React, {useState} from "react";

function SaveReportModalActionIcon({appointmentId = -1}) {
  const [opened, { open, close }] = useDisclosure(false);

  const reportForm = useForm(
    {
      initialValues: new ReportSaveRequest(),
    }
  );

  const onSubmit = (values: ReportSaveRequest) => {
    const requestReport = new ReportSaveRequest();
    requestReport.title = values.title;
    requestReport.diagnosis = values.diagnosis;
    requestReport.cost = values.cost
    requestReport.appointmentId = appointmentId;

    console.log("Saving Report", requestReport);
    saveReport(requestReport)
      .then(() => {
        console.log("Report saved successfully");
      })
      .catch((error: any) => {
        console.error("Error saving report", error);
      })
      .finally(() => console.log("FINITO"));


  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Register New Report" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={reportForm.onSubmit( (values) => onSubmit(values))}>
            <TextInput withAsterisk label="Title" placeholder="SCP" {...reportForm.getInputProps('title')} />
            <TextInput withAsterisk label="Diagnosis" placeholder="Hysteria" {...reportForm.getInputProps('diagnosis')} />
            <NumberInput withAsterisk label="Cost" placeholder="100" {...reportForm.getInputProps('cost')} />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <ActionIcon onClick={open} variant="subtle" color="yellow" >
        <IconReport style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}

export default SaveReportModalActionIcon;