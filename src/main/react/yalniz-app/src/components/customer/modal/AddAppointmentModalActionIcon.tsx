import {useDisclosure} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {
  Box,
  Button,
  TextInput,
  Group,
  rem,
  ActionIcon,
  Modal,
  useCombobox,
  Combobox,
  InputBase,
  InputPlaceholder
} from '@mantine/core';
import {AppointmentSaveRequest} from "@/components/appointment/objects";
import {IconCalendarPlus} from "@tabler/icons-react";
import {DateTimePicker} from "@mantine/dates";
import {useState} from "react";
import {findPetsById} from '../CustomerService'
import {findAll} from "@/components/vet/VetService";

function AddAppointmentModalActionIcon({ownerId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);

  // pet
  const petCombobox = useCombobox({
    onDropdownClose: () => petCombobox.resetSelectedOption(),
  });
  const [petValue, setPetValue] = useState<string | null>(null);
  let pets = [{id: "", name: ""}];
  findPetsById(ownerId).then(response => pets.push(response.data)).catch(console.error);
  const petOptions = pets.map( pet => (
    <Combobox.Option value={pet.id} key={pet.name}>
      {pet.name}
    </Combobox.Option>
  ));

  // vet
  const vetCombobox = useCombobox({
    onDropdownClose: () => vetCombobox.resetSelectedOption(),
  });
  const [vetValue, setVetValue] = useState<string | null>(null);
  let vets = [{id: "", name: ""}];
  findAll().then(response => vets.push(response.data)).catch(console.error);
  const vetOptions = vets.map( vet => (
    <Combobox.Option value={vet.id} key={vet.name}>
      {vet.name}
    </Combobox.Option>
  ));

  const appointmentForm = useForm(
    {
      initialValues: new AppointmentSaveRequest(),
    }
  )

  const onSubmit = () => {
    //
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Appointment" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={(values) => {
            onSubmit()
          }}>
            <DateTimePicker withAsterisk label="Date and Time"
                            placeholder="2022-12-31 14:00" {...appointmentForm.getInputProps('date')} />
            <Combobox
              store={vetCombobox}
              onOptionSubmit={value => {
                setVetValue(value)
                vetCombobox.closeDropdown()
              }
              }>

              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron/>}
                  rightSectionPointerEvents="none"
                  onClick={() => vetCombobox.toggleDropdown}
                >
                  {vetValue || <InputPlaceholder>Pick a vet</InputPlaceholder>}
                </InputBase>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>{vetOptions}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>

            <Combobox
              store={petCombobox}
              onOptionSubmit={value => {
                setPetValue(value)
                petCombobox.closeDropdown()
              }
              }>

              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron/>}
                  rightSectionPointerEvents="none"
                  onClick={() => petCombobox.toggleDropdown}
                >
                  {petValue || <InputPlaceholder>Pick a pet</InputPlaceholder>}
                </InputBase>
              </Combobox.Target>
              <Combobox.Dropdown>
                <Combobox.Options>{petOptions}</Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>

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

export default AddAppointmentModalActionIcon;