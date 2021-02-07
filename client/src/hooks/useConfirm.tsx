import { useMemo, useState } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

export interface IConfirmModal {
  message: string;
  onOk: () => void | Promise<void>;
}

export default function useConfirm() {
  const [confirmModalInfo, setConfirmModalInfo] = useState<IConfirmModal>(
    undefined
  );
  const [visible, setVisible] = useState<boolean>(false);

  const confirmModal = (modalInfo: IConfirmModal) => {
    setConfirmModalInfo(modalInfo);
    setVisible(true);
  };

  const closeConfirmModal = () => {
    setVisible(false);
    setConfirmModalInfo(undefined);
  };

  const ModalConfirm = useMemo(() => {
    if (!(confirmModalInfo && visible)) return null;
    return (
      <Modal basic onClose={closeConfirmModal} open={visible} size="small">
        <Modal.Content>
          <p>{confirmModalInfo.message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setVisible(false)}>
            <Icon name="remove" /> No
          </Button>
          <Button
            color="green"
            inverted
            onClick={() => {
              setVisible(false);
              confirmModalInfo.onOk();
            }}
          >
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }, [confirmModalInfo, visible]);

  return { confirmModal, ModalConfirm };
}
