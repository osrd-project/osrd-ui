import React, { useState } from 'react';
import cx from 'classnames';

interface CheckboxProps {
    label: string;
    small?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({ label, small }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
            <label className={cx('custom-checkbox', {
                'small': small
            })}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className='checkmark'></span>
                <div className='label'>{label}</div>
            </label>
    );
};

export default Checkbox;
