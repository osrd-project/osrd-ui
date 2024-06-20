import React, { useState } from 'react';
import { Eye, EyeClosed } from '@osrd-project/ui-icons';

import Input, { InputProps } from './Input';
import cx from 'classnames';

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ inputFieldWrapperClassname, ...restProps }, ref) => {
    const [showPassword, toggleShowPassword] = useState(false);

    return (
      <Input
        {...restProps}
        type={showPassword ? 'text' : 'password'}
        trailingContent={{
          content: showPassword ? <EyeClosed /> : <Eye />,
          onClickCallback: () => toggleShowPassword(!showPassword),
        }}
        inputFieldWrapperClassname={cx('password-input', inputFieldWrapperClassname)}
        ref={ref}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
