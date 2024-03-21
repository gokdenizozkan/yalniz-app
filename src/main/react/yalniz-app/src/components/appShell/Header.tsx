import {AppShell, Burger, Flex} from '@mantine/core';


function Header({opened, toggle}: any) {
  return (
    <AppShell.Header>
      <Flex justify="space-between" align="center" style={{padding: '10px 20px'}}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
        <div>YALNIZ VETERINARY MANAGEMENT APP</div>
      </Flex>
    </AppShell.Header>)
}

export default Header;