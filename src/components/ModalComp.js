import React from 'react'
import { Button, Modal, Header, Image } from 'semantic-ui-react'

const ModalComp = ({open, setOpen, img, name, phone, email, dateOfBirth, id, handleDelete}) => {
  return (
    <Modal onClose={()=> setOpen(false)} onOpen={()=> setOpen(true)} open>
        <Modal.Header>User Details</Modal.Header>
        <Modal.Content image>
            <Image size='medium' src={img} wrapped />
            <Modal.Description>
                <Header>{name}</Header>
                <p><strong>Email: </strong>{email}</p>
                <p><strong>Phone number: </strong>{phone}</p>
                <p><strong>Date of birth: </strong>{dateOfBirth}</p>
            </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
            <Button color='black' onClick={()=> setOpen(false)} >Cancel</Button>
            <Button color='red' onClick={()=> handleDelete(id)} >Delete</Button>
        </Modal.Actions>
    </Modal>
  )
}

export default ModalComp