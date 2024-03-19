import {VetsTable} from "@/components/vet/VetsTable";
import {Container} from "@mantine/core";
import SaveVetModalButton from "@/components/vet/modal/SaveVetModalButton";

function VetsPage() {
  return (
    <div>
      <Container>
        <SaveVetModalButton/>
        <VetsTable/>
      </Container>
    </div>
  );
}

export default VetsPage;