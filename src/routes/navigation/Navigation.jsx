import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';
import CartDropdown from '../../components/cart-dropdown/CartDropdown'
import CartIcon from '../../components/cart-icon/CartIcon';

import { signOutUser } from '../../utils/firebase/firebase.component';


import { ReactComponent as CrwnLogo } from '../../assets/crwn.svg';
import { LogoContainer, NavigationStyles, NavLink, NavLinkContainer } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  const { isCartOpen } = useContext(CartContext)

  return (
    <>
      <NavigationStyles>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinkContainer>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            )
              : (
                <NavLink to='/auth'>
                  SIGN IN
                </NavLink>
              )
          }
          <CartIcon />
        </NavLinkContainer>
        {
          isCartOpen && <CartDropdown />
        }
      </NavigationStyles>
      <Outlet />
    </>
  );
};

export default Navigation;