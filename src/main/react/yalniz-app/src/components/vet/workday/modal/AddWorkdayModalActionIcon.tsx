import {useDisclosure} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {ActionIcon, Box, Button, Group, Modal, rem,} from '@mantine/core';
import {IconCalendarPlus} from "@tabler/icons-react";
import {DatePickerInput} from "@mantine/dates";
import React, {useState} from "react";
import {save} from "@/components/vet/workday/WorkdayService";
import {WorkdaySaveRequest} from "@/components/vet/workday/objects";

function AddWorkdayModalActionIcon({vetId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);

  const workdayForm = useForm(
    {
      initialValues: new WorkdaySaveRequest(),
    }
  )

  const onSubmit = (values: WorkdaySaveRequest) => {
    const d = date?.toISOString();
    const request = new WorkdaySaveRequest();
    request.date = d;
    request.vetId = vetId;
    save(request)
      .then(() => console.log("workday saved successfully", request))
      .catch((error: any) => console.error("Error saving workday", error, request));
  }


  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Appointment" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={workdayForm.onSubmit( (values) => onSubmit(values) )}>
            <DatePickerInput withAsterisk label="Workday" valueFormat="YYYY-MM-DD" placeholder="Pick birthdate" value={date} onChange={(v) => setDate(v)} />
            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <ActionIcon onClick={open} variant="subtle" color="cyan">
        <IconCalendarPlus style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}

export default AddWorkdayModalActionIcon;