import '@mantine/core/styles.css';
import {AppShell, Button, MantineProvider, Text} from '@mantine/core';
import {theme} from './theme';
import Header from "@/components/appShell/Header";
import Navbar from "@/components/appShell/Navbar";
import RouterSwitcher from "@/components/appShell/RouterSwitcher";
import {useDisclosure} from "@mantine/hooks";
import {ContextModalProps, modals, ModalsProvider} from "@mantine/modals";

export default function App() {
  const [opened, {toggle}] = useDisclosure();
  const InfoModal = ({
                       context,
                       id,
                       innerProps,
                     }: ContextModalProps<{ modalBody: string }>) => (
    <>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
        Close
      </Button>
    </>
  );

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider modals={{info: InfoModal}}>
        <AppShell header={{height: 60}} navbar={{width: 317, breakpoint: 'sm', collapsed: {mobile: !opened},}}>

          <Header opened={opened} toggle={toggle}/>
          <Navbar/>

          <AppShell.Main>
            <RouterSwitcher/>
          </AppShell.Main>

        </AppShell>
      </ModalsProvider>
    </MantineProvider>
  );
}

export function showModal(title: string, body: string) {
  modals.openContextModal({
    modal: 'info',
    title: title,
    innerProps: {
      modalBody:
      body,
    },
  })
}
