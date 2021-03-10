import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from './drawer';
import MenuAvatar from './menuAvatar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title:{
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const mainList = [
  {text: 'Inicio', url: '/inicio'},
  {text: 'Cuentas', url: '/cuentas'}, 
  {text: 'Movimientos', url: '/movimientos'},
  {text: 'Categorias', url: '/Categorias'}, 
  {text: 'Reportes', url: '/Reportes'}
]

const secondList = ['Configuracion', 'Perfil'];

export default function bar(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start"
            onClick={handleDrawerToggle} className={classes.menuButton} >
            <MenuIcon />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            {props.title}
          </Typography>

          <MenuAvatar avatar={props.avatar}/>
        </Toolbar>
      </AppBar>
      <Drawer mainList={mainList} secondList={secondList} toggle={handleDrawerToggle} open={mobileOpen}/>
    </>
  );
}