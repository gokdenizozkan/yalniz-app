import { useDisclosure } from '@mantine/hooks';
import {Modal, Button, Box, TextInput, Checkbox, Group, Textarea, ActionIcon, rem} from '@mantine/core';
import {useForm} from "@mantine/form";
import {findById, update} from "@/components/customer/CustomerService";
import {CustomerUpdateRequest} from "@/components/customer/objects";
import React from "react";
import {IconPencil} from "@tabler/icons-react";

function UpdateCustomerModalActionIcon({customerId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);

  const readyForm = () => {
    if (customerId !== -1) {
      findById(customerId)
        .then(response => customerForm.setValues(response.data.data))
        .catch(console.error);
      open();
    }
  }

  const customerForm = useForm(
    {
      initialValues: new CustomerUpdateRequest({}),
    }
  );

  const onSubmit = () => {
    update(+customerId, customerForm.values)
      .then(() => {
        console.log("customer updated successfully");
      })
      .catch((error) => {
        console.error("Error updating customer", error);
      })
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Update Customer" centered>
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

      <ActionIcon onClick={readyForm} variant="subtle" color="gray" >
        <IconPencil style={{width: rem(22), height: rem(22)}} stroke={1.5}/>
      </ActionIcon>
    </>
  );
}

export default UpdateCustomerModalActionIcon;