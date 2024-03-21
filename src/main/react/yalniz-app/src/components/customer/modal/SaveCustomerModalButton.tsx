import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Checkbox, Group, Textarea} from '@mantine/core';
import {useForm} from "@mantine/form";
import axios from "axios";
import {findAll, save} from "@/components/customer/CustomerService";
import {CustomerSaveRequest} from "@/components/customer/objects";
import {showModal} from "@/App";

function SaveCustomerModalButton() {
  const [opened, { open, close }] = useDisclosure(false);

  const customerForm = useForm(
    {
      initialValues: new CustomerSaveRequest(),
    }
  );

  const onSubmit = () => {
    save(customerForm.values)
      .then(() => {
        console.log("customer saved successfully");
        window.location.reload();
      })
      .catch((error) => showModal("Error", error.message))
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Register New Customer" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={(values) => {onSubmit()}}>
            <TextInput withAsterisk label="Name" placeholder="Hold the Door" {...customerForm.getInputProps('name')} />
            <TextInput withAsterisk label="Phone" placeholder="+9059988877665544" {...customerForm.getInputProps('phone')} />
            <TextInput withAsterisk label="Email" placeholder="your@email.com" {...customerForm.getInputProps('email')} />
            <TextInput withAsterisk label="City" placeholder="Ankara" {...customerForm.getInputProps('city')} />
            <Textarea withAsterisk label="Address" placeholder="James Sunderland Street, Hilly Hill/Silent Hill" {...customerForm.getInputProps('address')} />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Button onClick={open}>Register Customer</Button>
    </>
  );
}

export default SaveCustomerModalButton;