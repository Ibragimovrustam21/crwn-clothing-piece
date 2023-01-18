import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import CartDropdown from '../../components/cart-dropdown/CartDropdown'
import CartIcon from '../../components/cart-icon/CartIcon';

import { selectIsCartOpen } from '../../store/cart/cart-selector';
import { signOutStart } from '../../store/user/user-action';

import { ReactComponent as CrwnLogo } from '../../assets/crwn.svg';
import { LogoContainer, NavigationStyles, NavLink, NavLinkContainer } from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  const dispatch = useDispatch()

  const signOutHandler = () => dispatch(signOutStart())
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
              <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
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