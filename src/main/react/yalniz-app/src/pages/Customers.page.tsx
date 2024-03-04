import SaveCustomerModalButton from "@/components/customer/modal/SaveCustomerModalButton";
import {CustomersTable} from "@/components/customer/CustomersTable";
import {Container} from "@mantine/core";

function CustomersPage() {
  return (
    <div>
      <Container>
        <SaveCustomerModalButton />
        <CustomersTable />
      </Container>
    </div>
  );
}

export default CustomersPage;