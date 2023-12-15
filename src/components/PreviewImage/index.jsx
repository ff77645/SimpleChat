import {useState} from 'react'
import {Image,Modal,ModalContent,ModalBody} from "@nextui-org/react";


export default function PreviewImage({images,current,onClose}){
  const [index,setIndex] = useState(current || 0)
  
  return (
    <Modal 
      hideCloseButton
      defaultOpen={true}
      onClose={onClose}
      classNames={{
        base:'!m-0 bg-transparent shadow-none',
        // base:'max-w-full h-full !m-0 bg-transparent',
        // body:'p-0 w-full flex flex-row items-center justify-between',
      }}
    >
      <ModalContent> 
        <ModalBody>
          <Image src={images[index]} width={500} height={500} loading="lazy"></Image>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}