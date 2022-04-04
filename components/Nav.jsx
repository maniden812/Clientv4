import { useState, useEffect } from 'react';
import styles from './Nav.module.css';
import { NavLink } from '.';
import { userService } from '../services';
import Link from 'next/link'
export { Nav };


console.log("test string line 14 NAV");
function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }
    
    return (
        <>
      <nav>
          <div className={styles.header}>  
            <ul className={styles.nav}>
                {/* <NavLink href="/OrderFormHistory/OrderFormHistory" exact className={styles.nav}>Order History</NavLink> */}
                <li className={styles.Title}><NavLink href="/" exact className={styles.Title}>FuelQuote</NavLink></li>
                {(user) ? <li className={styles.nav}><NavLink href="/OrderHistory" exact className={styles.nav}>OrderHistory</NavLink></li>: NULL}
                {(user) ? <li className={styles.nav}><NavLink href="/Order" exact className={styles.nav} >Order</NavLink>  </li>:<li className={styles.nav}><Link  href="/"><a>Home</a></Link></li>}
                {(user) ? <li className={styles.nav}><NavLink href="/Profile/profile" exact className={styles.nav}>Profile</NavLink></li>:<li className={styles.nav}><NavLink href="/account/register" exact className={styles.nav}>Register</NavLink></li>}
                {(user) ? <li className={styles.nav}><a onClick={logout}>Sign Out</a></li> : <li className={styles.nav}><NavLink href="/account/login" exact className={styles.nav}>Sign In</NavLink></li>}
            </ul>
            </div>
      </nav>
    </>
  );
};
