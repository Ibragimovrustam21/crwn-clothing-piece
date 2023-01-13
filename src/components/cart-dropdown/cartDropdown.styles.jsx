import styled from 'styled-components'
import { BaseButton, GoogleSignInButton, InvertedButton } from '../UI/button/button.styles'

export const CartDropdownContainer = styled.div`
position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  bottom: 0;
  right: 40px;
  z-index: 5;

  /* bu customniy buttonnii uzgartirish un ishlatildi */
  /* biz yaratgan buttonga yunaltirilayabdi */
  ${BaseButton}, 
  ${GoogleSignInButton},
  ${InvertedButton}{
    margin-top: auto;
  }
`
export const CartItems = styled.div`
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: auto;
`
export const EmptyAlert = styled.span`
    font-size: 20px;
    margin: 0 auto;
`


