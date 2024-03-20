import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Group, Textarea, ActionIcon, rem} from '@mantine/core';
import {useForm} from "@mantine/form";
import {findById, update} from "@/components/vet/workday/WorkdayService";
import {WorkdayUpdateRequest} from "@/components/vet/workday/objects";
import React, {useState} from "react";
import {IconPencil} from "@tabler/icons-react";
import {DatePickerInput} from "@mantine/dates";
import {showModal} from "@/App";

export default UpdateWorkdayModalActionIcon;

function UpdateWorkdayModalActionIcon({workdayId = -1, vetId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);

  const workdayForm = useForm(
    {
      initialValues: new WorkdayUpdateRequest(),
    }
  );

  const onSubmit = () => {
    const request = new WorkdayUpdateRequest();
    request.id = workdayId;
    request.date = date?.toISOString();
    request.vetId = vetId;

    update(+workdayId, request)
      .then(() => {
        console.log("customer updated successfully");
      })
      .catch((error) => showModal('Error', error.response.data.message));
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Customer" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={(values) => {onSubmit()}}>
            <DatePickerInput withAsterisk label="Date" valueFormat="YYYY-MM-DD" placeholder="Pick date" value={date} onChange={(v) => setDate(v)} />

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
