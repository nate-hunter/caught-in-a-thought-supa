import { useEffect, useRef, useState } from 'react';

export type DialogProps = {
  allowClose?: boolean;
  contents: React.ReactNode;
  open: boolean;
  // eslint-disable-next-line
  dialogStateChange?: (open: boolean) => void;
};

export const Dialog = ({
  allowClose = true,
  contents,
  open,
  dialogStateChange = () => {},
}: DialogProps) => {
  const [showModal, setShowModal] = useState(open);
  const dialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open !== showModal) {
      setShowModal(open);
    }
    // eslint-disable-next-line
  }, [open]);

  function updateDialogState(open: boolean) {
    setShowModal(open);
    dialogStateChange(open);
  }

  return showModal ? (
    <>
      <div className="dialog-container"></div>
      <div
        onClick={({ target }) => {
          // eslint-disable-next-line
          if (!allowClose || dialog.current?.contains(target as any)) {
            return;
          }
          updateDialogState(false);
        }}
        onKeyDown={({ key }) => {
          if (!allowClose || key !== 'Escape') {
            return;
          }
          updateDialogState(false);
        }}
        className="dialog-backdrop"
      >
        <div className="dialog-placement">
          <div className="relative group">
            <div className="dialog-accent-border group-hover:opacity-100 group-hover:duration-2000"></div>
            <div ref={dialog} className="dialog-content-container">
              {contents}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};
