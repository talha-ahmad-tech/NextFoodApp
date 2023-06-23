import React from 'react';
import RowCard from './component/RowCard';
import ImageCard from './component/ImageCard';

const ItemTable = (props: any) => {
  const tdata = (data: any) => {
    const outerArray = [];
    let index = 0;
    for (let i = 0; i < data?.length; i = i + 2) {
      const innerArr = [];
      for (let j = index * 2; j < (index + 1) * 2; j++) {
        if (data[j]) {
          innerArr.push(data[j]);
        }
      }
      outerArray.push(innerArr);
      index++;
    }
    return outerArray;
  };

  const rowData = tdata(props.tableData);
  if (!Object.keys(props.image).length) {
    return (
      <>
        {/* <div className="friday-card-body"></div> */}
        <div className="custom-responsive-table">
          <table className="table table-striped table-borderless card-table custom-table">
            <tbody>
              {rowData.map((row: any, ind: number) => {
                return <RowCard key={ind} data={row} />;
              })}
            </tbody>
          </table>
        </div>
        {/* </div> */}
      </>
    );
  }
  return (
    <>
      {/* <div className="friday-card-body"> */}
      <div className="row">
        <div className="col-lg-9">
          <div className="custom-responsive-table">
            <table className="table table-striped table-borderless custom-table">
              <tbody>
                {rowData.map((row: any, ind: number) => {
                  return <RowCard key={ind} data={row} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
        <ImageCard image={props.image} />
      </div>
      {/* </div> */}
    </>
  );
};

export default React.memo(ItemTable);
