import React from 'react'

import { Group, Input, InputLabel } from './formInput.styles'

const FormInput = ({ label, ...props }) => {
  return (
    <Group>
      <Input {...props} />
      {
        label && <InputLabel shrink={props.value.length}>{label}</InputLabel>
      }
    </Group>
  )
}
export default FormInput