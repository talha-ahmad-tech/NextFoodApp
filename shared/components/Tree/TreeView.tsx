import {
  Children,
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import {
  TreeView,
  TreeViewExpandChangeEvent,
  processTreeViewItems,
} from '@progress/kendo-react-treeview';
import '../../assets/style.scss';
import { UpdateObjectKey } from '../../utils/helper';
import { Field } from '@fridayfood/ui-toolkit';

interface TreeViewDataItem {
  expanded?: boolean;
  checked?: boolean;
  selected?: boolean;
  children?: TreeViewDataItem[];
  subCategory?: any;
}

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
interface ITree {
  tree: TreeViewDataItem[];
  checkboxes?: boolean;
  onCheckChanges?: any;
  ref?: any;
  keyName?: string;
  searchPlaceholder?: string;
}
const Tree = (
  {
    tree,
    checkboxes,
    onCheckChanges,
    keyName = 'modifierValues',
    searchPlaceholder = 'Search',
  }: ITree,
  ref: Ref<unknown> | undefined,
) => {
  let latestTree = UpdateObjectKey(
    keyName ? keyName : 'modifierValues',
    'items',
    tree,
  );
  const [search, setSearch] = useState('');

  const [data, setData] = useState(tree);
  const [originalData, setOrinal] = useState(tree);
  const [active, setActive] = useState({ ...initialData });

  useEffect(() => {
    if (latestTree) {
      setData(processTreeViewItems(latestTree, {}));
      setOrinal(processTreeViewItems(latestTree, {}));
    }
  }, [tree]);

  const applySelectedClass = (item: {
    parent?: boolean;
    items: { checked: boolean }[];
  }) => {
    if (item?.parent) {
      return item?.items?.filter(
        (ite: { checked: boolean }) => ite?.checked === true,
      )?.length > 0
        ? 'text-primary text-xl-left'
        : '';
    }
    return '';
  };

  const TreeItem = ({ item }: any) => {
    const { name } = item;

    return (
      <div className="custom-categorieswrapper">
        <p className={`font-weight-bold text-md ${applySelectedClass(item)}`}>
          {name}{' '}
          {item?.parent
            ? ` ( ${
                item?.items?.filter(
                  (ite: { checked: boolean }) => ite?.checked === true,
                )?.length
              } / ${item.items?.length})`
            : ''}
        </p>
      </div>
    );
  };

  const checkAll = () => {
    const newData = data.map((item: any) => {
      item.checked = true;
      item.items = item?.items?.map((child: any) => {
        child.checked = true;
        if (child?.items?.length) {
          child.items = child?.items?.map((innerChild: any) => {
            innerChild.checked = true;
            return innerChild;
          });
          return child;
        }
        return child;
      });
      return item;
    });
    setData(newData);
    setOrinal(newData);
  };

  const uncheckAll = () => {
    const newData = data?.map((item: any) => {
      item.checked = false;
      item.items = item?.items?.map((child: any) => {
        child.checked = false;
        if (child?.items?.length) {
          child.items = child?.items?.map((innerChild: any) => {
            innerChild.checked = false;
            return innerChild;
          });
          return child;
        }
        return child;
      });
      return item;
    });
    setData(newData);
    setOrinal(newData);
  };

  // we habe defined uncheckAll method in parent Component , which triggers this funtion to clear checked items
  useImperativeHandle(ref, () => ({
    clearValues: () => uncheckAll(),
  }));

  // expand and check items on onClick
  const onItemClick = (event: any) => {
    const { item } = event || {};
    item.checked = !item?.checked;
    item.expanded = !item?.exapnded;
  };

  const onExpandChange = (event: TreeViewExpandChangeEvent) => {
    const { item } = event || {};
    item.expanded = !item.expanded;
  };

  const expandAll = () => {
    const expendedData = data?.map(item =>
      Object?.assign({}, item, { expanded: true }),
    );
    setData(expendedData);
    setOrinal(expendedData);
  };
  const collapseAll = () => {
    const callpseData = data?.map(item =>
      Object?.assign({}, item, { expanded: false }),
    );
    setOrinal(callpseData);
    setData(callpseData);
  };

  const handle = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const copyData = [...originalData];

    const res = copyData.filter((it: any, index: number) => {
      return it?.name?.toLowerCase().includes(search.toLowerCase());
    });

    if (res?.length) {
      setData(res);
      return;
    }
    setData(processTreeViewItems(latestTree, {}));
  }, [search]);

  return (
    <>
      <div className=" d-flex  mb-4 tree-filters">
        <div className="custom-flex-start justify-content-start">
          <button
            onClick={() => {
              checkAll();
            }}
            className={`friday-btn-primary outline-btn  small-btn font-medium m-2`}
          >
            Check All
          </button>
          <button
            onClick={() => {
              uncheckAll();
            }}
            className={`friday-btn-primary outline-btn  small-btn font-medium m-2`}
          >
            Uncheck All
          </button>

          <button
            onClick={() => {
              expandAll();
            }}
            className={`friday-btn-primary outline-btn  small-btn font-medium m-2`}
          >
            Expand All
          </button>
          <button
            onClick={() => {
              collapseAll();
            }}
            className={`friday-btn-primary outline-btn  small-btn font-medium m-2`}
          >
            Collapse All
          </button>
        </div>
        <div className="custom-flex-start justify-content-end mt-2">
          <Field
            name="searchbar"
            placeholder={searchPlaceholder}
            onChange={handle}
            value={search}
            isFullWidth
            title=""
          />
        </div>
      </div>
      <TreeView
        expandIcons={true}
        data={data}
        item={({ item }) => <TreeItem item={item} />}
        onCheckChange={onCheckChanges}
        checkboxes={checkboxes}
        onItemClick={onItemClick}
        onExpandChange={onExpandChange}
      />
    </>
  );
};

export default forwardRef(Tree);
