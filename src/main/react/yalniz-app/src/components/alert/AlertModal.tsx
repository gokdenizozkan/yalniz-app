import {useDisclosure} from '@mantine/hooks';
import {Modal, Box} from '@mantine/core';
import React, {useEffect} from "react";

function ErrorModal({errorMessage = "", showError = false}) {
  const [opened, {open, close}] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="ERROR" centered>
        <Box maw={340} mx="auto">
          <p>{errorMessage}</p>
        </Box>
      </Modal>
    </>
  );
}

export default ErrorModal;