import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ModalNew from '../pages/accounts/modalNew'
  
  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(7),
      right: theme.spacing(7),
    },
}));

export default function FloatingActionButtons(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <ModalNew close={handleClose} open={open}/>
            
        </div>
    );
  }