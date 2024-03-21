import {AppShell, NavLink} from "@mantine/core";
import {useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppShell.Navbar p="md" style={{gap: '10px'}}>
      <NavLink label="Dashboard" onClick={() => navigate('/#/dashboard')} style={{margin:'5px'}}/>
      <NavLink label="Appointments" onClick={() => navigate('/#/appointments')} style={{margin:'5px'}}/>
      <NavLink label="Reports" onClick={() => navigate('/#/reports')} style={{margin:'5px'}}/>
      <NavLink label="Customers" onClick={() => navigate('/#/customers')} style={{margin:'5px'}}/>
      <NavLink label="Vets" onClick={() => navigate('/#/vets')} style={{margin:'5px'}}/>
    </AppShell.Navbar>
  )
}

export default Navbar;