import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Checkbox, Group, Textarea} from '@mantine/core';
import {useForm} from "@mantine/form";
import {save} from "@/components/vet/VetService";
import {VetSaveRequest} from "@/components/vet/objects";
import {showModal} from "@/App";

function SaveVetModalButton() {
  const [opened, { open, close }] = useDisclosure(false);

  const vetForm = useForm(
    {
      initialValues: new VetSaveRequest(),
    }
  );

  const onSubmit = (values: VetSaveRequest) => {
    save(values)
      .then(() => {
        console.log("Vet saved successfully")
        window.location.reload();
      })
      .catch((error: any) => showModal("Error", error.message));
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Register New Vet" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={vetForm.onSubmit( (values) => onSubmit(values))}>
            <TextInput withAsterisk label="Name" placeholder="Hold the Door" {...vetForm.getInputProps('name')} />
            <TextInput withAsterisk label="Phone" placeholder="+9059988877665544" {...vetForm.getInputProps('phone')} />
            <TextInput withAsterisk label="Email" placeholder="your@email.com" {...vetForm.getInputProps('email')} />
            <TextInput withAsterisk label="City" placeholder="Ankara" {...vetForm.getInputProps('city')} />
            <Textarea withAsterisk label="Address" placeholder="James Sunderland Street, Hilly Hill/Silent Hill" {...vetForm.getInputProps('address')} />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Button onClick={open}>Register Vet</Button>
    </>
  );
}

export default SaveVetModalButton;