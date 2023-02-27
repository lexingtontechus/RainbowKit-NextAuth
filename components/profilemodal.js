import { Modal, useModal, Button, Text, css } from "@nextui-org/react";
import React from "react";
import ProfileUpdate from "./profileupdate";
export default function ModalLogin({ address }) {
  // const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const { setVisible, bindings } = useModal();
  return (
    <div>
      <Button auto ripple animated bordered color="gradient" onPress={handler}>
        PROFILE
      </Button>
      <Modal
        animated={false}
        //scroll
        //fullScreen
        preventClose
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeButton
        blur
        //open={visible}
        onClose={closeHandler}
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Wallet Profile
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">Profile Management</Text>
          <ProfileUpdate address={address} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            css={{ color: "#f4f4f5", background: "#581c87" }}
            onPress={closeHandler}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
