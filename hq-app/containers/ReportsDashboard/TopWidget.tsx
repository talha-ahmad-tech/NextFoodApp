import { memo } from 'react';
import SectionWrapper from '@fridayfood/shared/components/SectionWrapper';
import CardHeaderIConText from '@fridayfood/shared/components/CardHeaderIconText';
import ProductSvg from '@fridayfood/shared/components/Svgs/ProductSvg';
// import { useFetchWidgetDataQuery } from 'services/modules/reports.api';
import { WidgetType } from './helper';

const TopWidget = ({
  // dates,
  WidgetsData,
}: {
  // dates: DatesType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WidgetsData?: any;
}) => {
  // const { data: WidgetsData } = useFetchWidgetDataQuery(
  //   {
  //     StartDate: dates.start,
  //     EndDate: dates.end,
  //   },
  //   {
  //     skip: dates.start === '' || dates.end === '',
  //   },
  // );

  const getCurrentTab = (type: number) =>
    WidgetsData
      ? WidgetsData?.cards?.filter(
          (card: { type: number }) => card.type === type,
        )[0]
      : {
          growth: 0,
          type: 0,
          value: 0,
        };

  return (
    <div className="row">
      {Object.keys(WidgetType ?? []).map(currentWidget => {
        const TabData = getCurrentTab(parseInt(currentWidget));
        return (
          <div
            className="col-12 col-md-6 col-lg-3 col-xl-2  pb-4"
            key={currentWidget}
          >
            <SectionWrapper className="height-auto">
              <CardHeaderIConText
                icon={<ProductSvg />}
                nodropdown
                percentageammount={(TabData?.growth).toFixed(2) ?? '0'}
                arrowDown
              />
              <div className="py-3">
                <p className="custom-p-14 grey-color">
                  {
                    WidgetType[
                      parseInt(currentWidget) as keyof typeof WidgetType
                    ]
                  }
                </p>
                <h5 className="font-bold pt-1">
                  {TabData?.value?.toFixed(2) ?? 0}
                </h5>
              </div>
            </SectionWrapper>
          </div>
        );
      })}
    </div>
  );
};

export default memo(TopWidget);
