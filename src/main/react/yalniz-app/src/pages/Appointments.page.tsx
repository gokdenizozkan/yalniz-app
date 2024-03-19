import {Container} from "@mantine/core";
import {AppointmentsTable} from "@/components/appointment/AppointmentsTable";

function AppointmentsPage() {
  return (
    <div>
      <Container>
        <AppointmentsTable/>
      </Container>
    </div>
  );
}

export default AppointmentsPage;