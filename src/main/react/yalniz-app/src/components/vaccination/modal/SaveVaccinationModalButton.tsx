import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Checkbox, Group, Textarea} from '@mantine/core';
import {useForm} from "@mantine/form";
import {save} from "@/components/vaccination/VaccinationService";
import {VaccinationSaveRequest} from "@/components/vaccination/objects";

function SaveVaccinationModalButton() {
  const [opened, { open, close }] = useDisclosure(false);

  const vaccinationForm = useForm(
    {
      initialValues: new VaccinationSaveRequest(),
    }
  );

  const onSubmit = (values: VaccinationSaveRequest) => {
    save(values)
      .then(() => {
        console.log("Vet saved successfully");
      })
      .catch((error: any) => {
        console.error("Error saving Vet", error);
      })
      .finally(() => console.log("FINITO"));
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Register New Vet" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={vaccinationForm.onSubmit( (values) => onSubmit(values))}>
            <TextInput withAsterisk label="Name" placeholder="Hold the Door" {...vaccinationForm.getInputProps('name')} />
            <TextInput withAsterisk label="Code" placeholder="+9059988877665544" {...vaccinationForm.getInputProps('code')} />
            <Textarea withAsterisk label="Address" placeholder="James Sunderland Street, Hilly Hill/Silent Hill" {...vaccinationForm.getInputProps('address')} />

            <Checkbox
              mt="md"
              label="I agree to sell my privacy"
              {...vaccinationForm.getInputProps('termsOfService', { type: 'checkbox' })}
            />

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

export default SaveVaccinationModalButton;