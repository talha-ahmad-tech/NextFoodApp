import { PAGINATION_BLOCKED_SIZE } from ".";
const AgGridFitlersUtils = (params: any) => {
  const { startRow, endRow, filterModel, sortModel } = params;

  let param: any = {
    startRow: startRow,
    endRow: endRow,
    pageNumber: endRow / PAGINATION_BLOCKED_SIZE,
    pageSize: PAGINATION_BLOCKED_SIZE,
    PageIndex: 1,
  };

  if (sortModel.length) {
    const { colId, sort } = sortModel[0];
    param["sort"] = sort;
    param["colId"] = colId;
  }

  const filterKeys = Object.keys(filterModel);
  if (filterKeys.length) {
    filterKeys.forEach((filter, index) => {
      param[`Filters[${index}].key`] = filterModel[filter].filter;
      param[`Filters[${index}].type`] = filterModel[filter].type;
      param[`Filters[${index}].colId`] = filter;
    });
  }

  return param;
};

export default AgGridFitlersUtils;