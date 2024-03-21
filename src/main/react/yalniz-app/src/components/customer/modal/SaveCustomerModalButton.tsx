import {useDisclosure} from '@mantine/hooks';
import {Box, Button, Group, Modal, Textarea, TextInput} from '@mantine/core';
import {useForm} from "@mantine/form";
import {save} from "@/components/customer/CustomerService";
import {CustomerSaveRequest} from "@/components/customer/objects";
import {showModal} from "@/App";

function SaveCustomerModalButton() {
  const [opened, { open, close }] = useDisclosure(false);

  const customerForm = useForm(
    {
      initialValues: new CustomerSaveRequest(),
    }
  );

  const onSubmit = (v:CustomerSaveRequest) => {
    const request = new CustomerSaveRequest();
    request.name = customerForm.values.name;
    request.phone = customerForm.values.phone;
    request.email = customerForm.values.email;
    request.city = customerForm.values.city;
    request.address = customerForm.values.address;

    save(request)
      .then(() => {
        console.log("customer saved successfully");
        window.location.reload();
      })
      .catch((error) => showModal("Error", error.message));
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Register New Customer" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={customerForm.onSubmit((v) => onSubmit(v))}>
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