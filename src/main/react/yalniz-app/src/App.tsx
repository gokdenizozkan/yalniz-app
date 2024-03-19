import '@mantine/core/styles.css';
import {AppShell, MantineProvider} from '@mantine/core';
import { theme } from './theme';
import Header from "@/components/appShell/Header";
import Navbar from "@/components/appShell/Navbar";
import RouterSwitcher from "@/components/appShell/RouterSwitcher";
import {useDisclosure} from "@mantine/hooks";

export default function App() {
  const [opened, {toggle}] = useDisclosure();

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{height: 60}} navbar={{width: 317, breakpoint: 'sm', collapsed: {mobile: !opened},}}>

        <Header opened={opened} toggle={toggle}/>
        <Navbar />

        <AppShell.Main>
          <RouterSwitcher />
        </AppShell.Main>

      </AppShell>
    </MantineProvider>
  );
}
