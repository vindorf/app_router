import ReactModal from "react-modal";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onAfterClose: () => void;
};

ReactModal.setAppElement("*");

export function Modal({ children, isOpen, onAfterClose }: Props) {
  const modStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      with: "500px",
      border: "none",
      borderRadius: "20px",
      color: "white",
      backgroundColor: "lightgray",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => {}}
      onAfterClose={onAfterClose}
      style={modStyle}
    >
      {children}
    </ReactModal>
  );
}

type ModBoadyProps = {
  children: React.ReactNode;
  label: string;
};

export function ModalBody({ children, label }: ModBoadyProps) {
  return (
    <form className="m-1 p-1 lg:w-[38rem] flex flex-col items-center">
      <b className="text-[20px] border-b pb-3 mb-3">{label} </b>
      {children}
    </form>
  );
}
