import { Modal,ModalContent,ModalBody,Spinner} from "@nextui-org/react";


export default function Loading({label,...props}){



    return (
        <Modal 
            hideCloseButton
            size="full"
            classNames={{
                base: "bg-tranparent",
            }}
            {...props}
        >
            <ModalContent> 
                <ModalBody className="justify-center items-center">
                    <Spinner size="lg" color="warning" labelColor="warning" label={label} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}