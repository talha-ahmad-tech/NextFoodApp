import React, { useState } from 'react';
// import { TreeView } from '@progress/kendo-react-treeview';

import { TreeView } from '@progress/kendo-react-treeview';
// import { TreeView, filterBy } from '@progress/kendo-ui';

const tree = [
  {
    text: 'Furniture',
    expanded: true,
    items: [
      {
        text: 'Tables & Chairs',
      },
      {
        text: 'Sofas',
      },
      {
        text: 'Occasional Furniture',
      },
    ],
  },
  {
    text: 'Decor',
    expanded: true,
    items: [
      {
        text: 'Bed Linen',
      },
      {
        text: 'Curtains & Blinds',
      },
      {
        text: 'Carpets',
        expanded: true,
        items: [
          {
            text: 'mob',
          },
          {
            text: 'mon',
          },
          {
            text: 'ocean',
          },
        ],
      },
    ],
  },
];

const Trees = () => {
  const [data, setData] = useState(tree);
  const [search, setSearch] = useState({ searchKeyword: '' });

  const checkAll = () => {
    const newData = data.map(item => {
      item.checked = true;
      item.items = item.items.map(child => {
        child.checked = true;
        if (child?.items?.length) {
          child.items = child.items?.map(ch => {
            ch.checked = true;
            return ch;
          });
          return child;
        }
        return child;
      });
      return item;
    });
    setData(newData);
  };
  const uncheckAll = () => {
    const newData = data.map(item => {
      item.checked = false;
      item.items = item.items.map(child => {
        child.checked = false;
        if (child?.items?.length) {
          child.items = child.items?.map(ch => {
            ch.checked = false;
            return ch;
          });
          return child;
        }
        return child;
      });
      return item;
    });
    setData(newData);
  };

  const onCheckChange = event => {
    event.item.checked = !event.item.checked;
    setData([...data]);
  };

  const handleSearchChange = event => {
    setSearch({
      searchKeyword: event.target.value,
    });
  };
  const filterTreeNodes = (nodes, searchKeyword) => {
    if (!searchKeyword) {
      return nodes;
    }

    return nodes?.filter(node => {
      // Perform your filtering logic here.
      // For example, you can check if the node's text contains the search keyword.
      console.log('ch::', node, node.text);

      const result = node?.text
        ?.toLowerCase()
        ?.includes(searchKeyword?.toLowerCase());
      console.log('res::', result);
      return result;
    });
  };

  const { searchKeyword } = search;
  const filteredNodes = filterTreeNodes(tree, searchKeyword);
  console.log('ser::', filteredNodes, search, searchKeyword);

  const onExpandChange = event => {
    const { item } = event || {};
    item.expanded = !item.expanded;
  };
  const TreeItem = ({ item }) => {
    const { name } = item;

    return (
      <div className="custom-categorieswrapper">
        <p className={`font-weight-bold text-md `}>
          {name}{' '}
          {item?.parent
            ? ` ( ${
                item?.items?.filter(item => item?.checked === true)?.length
              } / ${item.items?.length})`
            : ''}
        </p>
      </div>
    );
  };
  const onItemClick = event => {
    const { item } = event || {};
    item.checked = !item?.checked;
    item.expanded = !item?.exapnded;
  };
  const expandAll = () => {
    setData(data.map(item => Object.assign({}, item, { expanded: true })));
  };
  const collapseAll = () => {
    setData(data.map(item => Object.assign({}, item, { expanded: false })));
  };
  return (
    <div>
      <div className="example-config">
        <button
          onClick={checkAll}
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        >
          Check all
        </button>
        <button
          onClick={uncheckAll}
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        >
          Uncheck all
        </button>

        <button
          onClick={expandAll}
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        >
          expand all
        </button>
        <button
          onClick={collapseAll}
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
        >
          unexpand all
        </button>
      </div>
      <input
        value={searchKeyword}
        onChange={handleSearchChange}
        placeholder="Search..."
      />

      {/* <TreeView data={filteredNodes} textField="text" /> */}
      {/* 
      <TreeView
        data={filteredNodes}
        checkboxes={true}
        onCheckChange={onCheckChange}
      >
        <TreeViewItem keyField="id" textField="text" />
      </TreeView> */}

      <TreeView
        expandIcons={true}
        data={data}
        item={({ item }) => <TreeItem item={item} />}
        onCheckChange={onCheckChange}
        checkboxes={true}
        onItemClick={onItemClick}
        onExpandChange={onExpandChange}
      />
    </div>
  );
};
export default Trees;
