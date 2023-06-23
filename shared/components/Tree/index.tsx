import { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import Modal from '@fridayfood/ui-toolkit/src/Modal';
import Tree from './TreeView';
import { Icon } from '@fridayfood/shared/components/Icon';
import React from 'react';
import { Field } from '@fridayfood/ui-toolkit';

interface IinitialData {
  expand?: boolean;
  collapse?: boolean;
  checked?: boolean;
  unchecked?: boolean;
}

const initialData: IinitialData = {
  expand: false,
  collapse: false,
  checked: false,
  unchecked: false,
};

type IAddModifiers = {
  keyName?: string;
  tree?: any;
  onSelectValues?: any;
  label?: string;
  title?: string;
  fieldValue?: string;
  setProducts?: any;
  nameToShow?: string;
  isFullWidth?: boolean;
  onCheckChanges?: any;
  heading?: string;
  simpleTree?: boolean;
  childrenKey?: string;
  changeEvent?: any;
  onSave?: any;
  searchPlaceholder?: string;
};
const AddModifiers = (
  {
    tree,
    onSelectValues,
    label = 'Modifiers',
    title = '',
    simpleTree = false,
    nameToShow = '',
    isFullWidth = false,
    onCheckChanges,
    keyName = '',
    heading = 'Add Modifiers',
    childrenKey = 'items',
    changeEvent,
    onSave,
    searchPlaceholder,
  }: IAddModifiers,
  ref: any,
) => {
  const childRef: React.MutableRefObject<undefined> | any = useRef();

  const [show, setShow] = useState<boolean>(false);
  const [modifiers, setMofifiers] = useState<{
    modifiers?: any;
    selectedItem?: string;
  }>({
    modifiers: [],
    selectedItem: '',
  });

  const [permissions, setPermissions] = useState<{
    permissions?: any;
    selectedItem?: string;
  }>({
    permissions: [],
    selectedItem: '',
  });

  const selectedNameToShown = nameToShow;
  let counter = 0;

  const onCheckChange = (event: any) => {
    let name = '';
    const { item } = event || {};
    item.checked = !item?.checked;
    item.isGranted = !item?.checked;

    if (item?.checked && item?.items?.length) {
      // item.expanded = true;
      item.isGranted = true;
    }
    if ((item?.selected || !item?.checked) && !item?.checked) {
      // item.expanded = false;
      item.isGranted = false;
    }

    if ((item?.selected || item?.checked) && item?.checked) {
      item.expanded = true;
      item.isGranted = true;
    }
    if (item?.items?.length) {
      item?.items.map((child: any) => {
        child.checked = item?.checked;
        child.isGranted = item?.checked;
      });
    }

    const checkedData = [...event?.target.data] || [];
    console.log('EVENT', checkedData);

    let nameToShow = '';
    checkedData?.forEach((names: { name: string; checked?: boolean }) => {
      if (names?.checked && checkedData[0]) {
        nameToShow = names?.name;
      }
      if (names?.checked) {
        counter++;
      }
    });
    name = counter > 1 ? `${nameToShow}+${counter - 1}` : nameToShow;
    const result =
      checkedData
        ?.filter((outerItem: any) => outerItem.checked)
        ?.map((mappedItem: any) => {
          console.log('mapped ', mappedItem);

          return [...mappedItem?.items].filter(
            (innerItem?: any) => innerItem?.checked,
          );
        }) || [];

    const permissionResult =
      checkedData
        ?.filter((outerItem: any) => outerItem.checked)
        ?.map((mappedItem: any) => {
          return [...mappedItem?.items].map((innerItem?: any) => {
            if (innerItem?.checked) {
              return { ...innerItem, checked: true, isGranted: true };
            } else {
              return { ...innerItem, checked: false, isGranted: false };
            }
          });
        }) || [];

    setMofifiers({ ...modifiers, modifiers: result, selectedItem: name });
    setPermissions({
      ...permissions,
      permissions: checkedData,
      selectedItem: name,
    });
  };
  const handleOpenModal = () => {
    childRef?.current?.clearValues();
  };
  const handleSave = () => {
    onCheckChanges(modifiers);
  };

  if (onSave) {
    onSave(permissions);
  }

  useImperativeHandle(ref, () => ({
    permissions: () => {
      return permissions;
    },
  }));

  return (
    <>
      {simpleTree ? (
        <Tree
          onCheckChanges={onCheckChange}
          checkboxes={true}
          tree={tree}
          searchPlaceholder={searchPlaceholder}
          keyName={childrenKey}
        />
      ) : (
        <>
          <div
            className={`form-group ${
              isFullWidth ? 'm-0 full-width-wrapper' : ''
            }`}
          >
            <div className="row">
              {!isFullWidth && label ? (
                <div className="col-12  col-lg-5 col-xxl-3">
                  <label className="col-form-label form-label-required">
                    {label}
                  </label>
                </div>
              ) : null}
              <div
                className={` ${
                  isFullWidth ? 'col-12' : 'col-12  col-lg-7 col-xxl-9'
                }`}
              >
                <div className="add-vendor-group" onClick={() => setShow(true)}>
                  <div className="left-side">{title ? title : null}</div>
                  {!selectedNameToShown && (
                    <button
                      className="button-tree-wrapper"
                      type="button"
                      onClick={() => setShow(true)}
                    >
                      <Icon variant="plus" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {show && (
            <Modal
              close={() => {
                handleOpenModal();
                setShow(false);
              }}
              saveButtonType="button"
              show={show}
              title={heading}
              customBodyClass="custom-height-moda-body"
              modalWidth="medium-modal"
              handleSave={() => {
                handleSave();
                setShow(false);
              }}
            >
              <Tree
                onCheckChanges={onCheckChange}
                checkboxes={true}
                tree={tree}
                searchPlaceholder={searchPlaceholder}
                ref={childRef}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
};
export default memo(forwardRef(AddModifiers));
