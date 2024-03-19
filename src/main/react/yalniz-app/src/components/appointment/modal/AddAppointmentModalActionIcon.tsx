import {useDisclosure} from '@mantine/hooks';
import {useForm} from '@mantine/form';
import {
  Box,
  Button,
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
import {useEffect, useRef, useState} from "react";
import {findPetsById} from '../../customer/CustomerService'
import {findAll} from "@/components/vet/VetService";
import {PetResponse} from "@/components/pet/objects";
import {VetResponse} from "@/components/vet/objects";
import {save} from "@/components/appointment/AppointmentService";

function AddAppointmentModalActionIcon(this: any, {customerId = -1}) {
  const [opened, {open, close}] = useDisclosure(false);
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);

  // pet
  const petCombobox = useCombobox({
    onDropdownClose: () => petCombobox.resetSelectedOption(),
  });
  const [petValue, setPetValue] = useState<string | null>(null);
  const [pets, setPets] = useState<PetResponse[]>([new PetResponse()]);

  const petFirstUpdate = useRef(true);
  useEffect(() => {
    if (petFirstUpdate.current) {
      petFirstUpdate.current = false;
      findPetsById(customerId).then(response => setPets(response.data.data)).catch(console.error);
      return;
    }
  }, [pets]);

  console.log("pets", pets);
  const petOptions = pets.map((pet) => (
    <Combobox.Option value={pet.name + "," + pet.id} key={pet.id}>
      {pet.name}
    </Combobox.Option>
  ));

// vet
  const vetCombobox = useCombobox({
    onDropdownClose: () => vetCombobox.resetSelectedOption(),
  });
  const [vetValue, setVetValue] = useState<string | null>(null);
  const [vets, setVets] = useState<VetResponse[]>([new VetResponse()]);

  const vetFirstUpdate = useRef(true);
  useEffect(() => {
    if (vetFirstUpdate.current) {
      vetFirstUpdate.current = false;
      findAll().then(response => setVets(response.data.data)).catch(console.error);
      return;
    }
  }, [vets]);

  console.log("vets", vets);
  const vetOptions = vets.map((vet) => (
    <Combobox.Option value={vet.name + "," + vet.id} key={vet.id}>
      {vet.name}
    </Combobox.Option>
  ));

  const appointmentForm = useForm(
    {
      initialValues: new AppointmentSaveRequest(),
    }
  )

  const onSubmit = (values: AppointmentSaveRequest) => {
    appointmentForm.setValues({
      start: startDateTime?.toISOString(),
      // @ts-ignore
      vetId: +vetValue.split(",")[1],
      // @ts-ignore
      petId: +petValue.split(",")[1]
    });
    appointmentForm.values;
    save(appointmentForm.values)
      .then(() => console.log("appointment saved successfully", appointmentForm.values))
      .catch((error) => console.error("Error saving appointment", error, appointmentForm.values));
  }


  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Appointment" centered>
        <Box maw={340} mx="auto">
          <form onSubmit={appointmentForm.onSubmit( (values) => onSubmit(values) )}>
            <DateTimePicker withAsterisk label="Date and Time"
                            placeholder="2022-12-31 14:00" value={startDateTime} onChange={(v) => setStartDateTime(v)} />
            <Combobox
              store={vetCombobox}
              onOptionSubmit={value => {
                setVetValue(value)
                vetCombobox.closeDropdown()
              }}
            >
              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron/>}
                  rightSectionPointerEvents="none"
                  onClick={() => vetCombobox.toggleDropdown()}
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
              onOptionSubmit={(val) => {
                setPetValue(val)
                petCombobox.closeDropdown()
              }}
            >
              <Combobox.Target>
                <InputBase
                  component="button"
                  type="button"
                  pointer
                  rightSection={<Combobox.Chevron/>}
                  rightSectionPointerEvents="none"
                  onClick={() => petCombobox.toggleDropdown()}
                  {...appointmentForm.getInputProps('petId')}
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