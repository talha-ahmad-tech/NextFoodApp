import React from 'react';
import { SwitchButton } from '@fridayfood/ui-toolkit';
import Image from 'next/image';

const RowCard = (props: any) => {
  return (
    <>
      {/* {props.data.map((item: any) => {
        if(item.title) {
          return   <React.Fragment key={item.title} >
              <tr>
            <th colSpan={6} className="card-table">{item.title}</th>
            </tr>
          </React.Fragment>
        }
        else if (item.Rule) {
          return   <React.Fragment key={item.type} >
         <tr>
            <th className="card-table">{item.type}</th>
            <td className="card-table">{item.typeValue}</td>
            <th className="card-table">{item.total}</th>
            <td className="card-table" >{item.totalAmount}</td>
            <th className="card-table">{item.ruleType}</th>
            <td className="card-table">{item.Rule}</td>
            </tr>
      </React.Fragment>
        } 
      }) } */}
      <tr>
        {props.data.map((item: any) => {
          if (!item.title && !item.type) {
            return (
              <React.Fragment key={item.name}>
                <th className="card-table">{item.name}</th>

                {item?.images ? (
                  <Image src={''} width={150} height={150} alt="no image" />
                ) : item.key ? (
                  <td>
                    <SwitchButton
                      label={''}
                      errorMessage={''}
                      value={item.key === 'False' ? false : true}
                      onChange={(e: any) => {}}
                      onBlur={undefined}
                      name={''}
                      isDisabled={true}
                      isFullWidth
                    />
                  </td>
                ) : (
                  <td className="card-table">{item.value}</td>
                )}
              </React.Fragment>
            );
          }
        })}
      </tr>
    </>
  );
};
export default React.memo(RowCard);
