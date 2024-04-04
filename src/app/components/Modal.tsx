import ReactModal from 'react-modal';

type Props = {
    children: React.ReactNode;
    isOpen: boolean;
};

ReactModal.setAppElement("*");

export function Modal({children, isOpen}: Props) {
    const modStyle = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
             zIndex: 1000,
             display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            with: "500px",
            border: "1px solid"
        },
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => {}}
            style={modStyle}
        >
            {children}
        </ReactModal>
    );
}

type ModBoadyProps = {
    children: React.ReactNode;
    label: string;
}

export function ModalBody({children, label}: ModBoadyProps) {
    return <form className='border m-1 p-1 w-[20rem] flex flex-col items-center' >
        <h1>{label} </h1>
        {children}
        </form>
}