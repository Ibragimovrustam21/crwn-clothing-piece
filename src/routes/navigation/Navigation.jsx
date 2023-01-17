import { Outlet } from 'react-router-dom';
import CartDropdown from '../../components/cart-dropdown/CartDropdown'
import CartIcon from '../../components/cart-icon/CartIcon';

import { signOutUser } from '../../utils/firebase/firebase.component';
import { useSelector } from 'react-redux'

import { ReactComponent as CrwnLogo } from '../../assets/crwn.svg';
import { LogoContainer, NavigationStyles, NavLink, NavLinkContainer } from './navigation.styles';
import { selectIsCartOpen } from '../../store/cart/cart-selector';

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

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