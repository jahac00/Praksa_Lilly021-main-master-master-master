import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import styles from '../css/navBar.module.css';

function NavBar() {
  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div>
          <IconButton component={Link} to="/home" size="large" edge="start" color="inherit" aria-label="logo" className={styles['logo-icon']}>
            <LocalBarIcon />
          </IconButton>
          <Typography variant="h6" component={Link} to="/home" style={{ textDecoration: 'none', color: 'inherit' }} className={styles['navbar-brand']}>
            Cocktail Master
          </Typography>
        </div>
        <div>
          <Button component={Link} to="/categories" color="inherit" className={styles['nav-link']}>Categories</Button>
          <Button component={Link} to="/glasses" color="inherit" className={styles['nav-link']}>Glasses</Button>
          <Button component={Link} to="/ingridients" color="inherit" className={styles['nav-link']}>Ingredients</Button>
          <Button component={Link} to="/bartender-beginner" color="inherit" className={styles['nav-link']}>Bartender Beginner</Button>
          <Button component={Link} to="/bartender-veteran" color="inherit" className={styles['nav-link']}>Bartender Veteran</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar
