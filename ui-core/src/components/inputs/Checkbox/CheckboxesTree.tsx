import React from 'react';
import CheckboxList from './CheckboxList';
import {
  completeOrInitializeItemStates,
  computeNextItemStates as defaultComputeNextItemStates,
} from './utils';
import FieldWrapper, { FieldWrapperProps } from '../FieldWrapper';
import { CheckboxTreeItem, ItemStates } from './type';

export type CheckboxesTreeProps = Omit<FieldWrapperProps, 'children'> & {
  readOnly?: boolean;
  items: CheckboxTreeItem[];
  // This code may contain a partial/complete state of items. The states of items not provided are computed according to the following rules:
  // - If the item is a leaf:
  //   - If the item.props.checked property is defined, it is used to set the state.
  //   - Otherwise, the state defaults to UNCHECKED.
  // - If the item is a parent, its state is computed from the states of its children, regardless of whether the state is provided or not.
  itemStates?: ItemStates;
  onChange?: (newItemStates: ItemStates, item: CheckboxTreeItem) => void;
  computeNextItemStates?: (prevItemState: ItemStates, item: CheckboxTreeItem) => ItemStates;
};

const CheckboxesTree = ({
  items,
  small,
  id,
  label,
  hint,
  statusWithMessage,
  disabled,
  required,
  readOnly,
  itemStates,
  onChange,
  computeNextItemStates,
}: CheckboxesTreeProps) => {
  const handleClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    item: CheckboxTreeItem
  ) => {
    // As we want to send back the state of all the itmes even if in input,
    // the user can send only some of them, we need to ensure that we have the state of all the items.
    // So we need to compute the state of all the items.
    const prevItemStates = completeOrInitializeItemStates(items, itemStates);
    const newItemStates = computeNextItemStates
      ? computeNextItemStates(prevItemStates, item)
      : defaultComputeNextItemStates(items, item.id, prevItemStates);
    onChange?.(newItemStates, item);
    item.props.onClick?.(e);
  };

  return (
    <FieldWrapper
      id={id}
      label={label}
      hint={hint}
      statusWithMessage={statusWithMessage}
      statusIconPosition="before-status-message"
      disabled={disabled}
      required={required}
      small={small}
    >
      <CheckboxList
        small={small}
        items={items}
        disabled={disabled}
        readOnly={readOnly}
        onClickItem={handleClick}
        itemStates={itemStates}
      />
    </FieldWrapper>
  );
};

export default CheckboxesTree;
