import Modal from '@material-ui/core/Modal';

export default function modalNew(props){

    return (
        <Modal
            open={props.open}
            onClose={props.close}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {props.children}
        </Modal>
    )
}