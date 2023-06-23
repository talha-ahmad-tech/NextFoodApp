import { memo } from 'react';
import ChartsWrapper from '../ChartsWrapper';
import Footer from '../Footer';
import { WorkspaceCard } from '../WorkspaceCard';
import { BarChart, DoughnutChart, LineChart } from './Charts';
import { SectionWrapper } from '@fridayfood/shared/components';
import CardHeaderIConText from '@fridayfood/shared/components/CardHeaderIconText';
import ProductSvg from '../../components/Svgs/ProductSvg';
const Workspace = () => {
  return (
    <>
      <div className="custom-tabs-wrapper-content">
        <div
          className="tab-content custom-tabs-wrapper-content__content"
          id="pills-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
             <div className="row">
            <div className="col-12 col-md-6 col-lg-3 col-xl-2 pb-4">
              <SectionWrapper className="height-auto">
              <CardHeaderIConText
                icon={<ProductSvg />}
                nodropdown
                percentageammount="-2.4"
                arrowDown
              />
              <div className='py-3'>
              <p className='custom-p-14 grey-color'>Gross Sales</p>
              <h5 className='font-bold pt-1'>63,527</h5>
              </div>
            </SectionWrapper>
              </div>
              <div className="col-12 col-md-6 col-lg-3 col-xl-2 pb-4">
              <SectionWrapper className="height-auto">
              <CardHeaderIConText
                icon={<ProductSvg />}
                nodropdown
                percentageammount="+2.4"
              />
              <div className='py-3'>
              <p className='custom-p-14 grey-color'>Discount %</p>
              <h5 className='font-bold pt-1'>15%</h5>
              </div>
            </SectionWrapper>
              </div>
              <div className="col-12 col-md-6 col-lg-3 col-xl-2 pb-4">
              <SectionWrapper className="height-auto">
              <CardHeaderIConText
                icon={<ProductSvg />}
                nodropdown
                percentageammount="-2.4"
                arrowDown
              />
              <div className='py-3'>
              <p className='custom-p-14 grey-color'>Gross Sales</p>
              <h5 className='font-bold pt-1'>63,527</h5>
              </div>
            </SectionWrapper>
              </div>
              <div className="col-12 col-md-6 col-lg-3 col-xl-2 pb-4">
              <SectionWrapper className="height-auto">
              <CardHeaderIConText
                icon={<ProductSvg />}
                nodropdown
                percentageammount="+2.4"
              />
              <div className='py-3'>
              <p className='custom-p-14 grey-color'>Gross Sales</p>
              <h5 className='font-bold pt-1'>63,527</h5>
              </div>
            </SectionWrapper>
              </div>
              <div className="col-12 col-md-6 col-lg-3 col-xl-2 pb-4">
              <SectionWrapper className="height-auto">
              <CardHeaderIConText
                icon={<ProductSvg />}
                nodropdown
                percentageammount="-2.4"
                arrowDown
              />
              <div className='py-3'>
              <p className='custom-p-14 grey-color'>Gross Sales</p>
              <h5 className='font-bold pt-1'>63,527</h5>
              </div>
            </SectionWrapper>
              </div>
              <div className="col-12 col-md-6 col-lg-3 col-xl-2 pb-4">
              <SectionWrapper className="height-auto">
              <CardHeaderIConText
                icon={<ProductSvg />}
                nodropdown
                percentageammount="+2.4"
              />
              <div className='py-3'>
              <p className='custom-p-14 grey-color'>Gross Sales</p>
              <h5 className='font-bold pt-1'>63,527</h5>
              </div>
            </SectionWrapper>
              </div>
            </div>
            <div className="row">
              <WorkspaceCard />
            </div>
            <div className="row">
              <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                <ChartsWrapper heading="Head Count & Open Position">
                  <BarChart />
                </ChartsWrapper>
              </div>
              <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                <ChartsWrapper heading="Source Effectiveness">
                  <DoughnutChart />
                </ChartsWrapper>
              </div>
              <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                <ChartsWrapper heading="Performance by hiring source">
                  <LineChart />
                </ChartsWrapper>
              </div>
              <div className="col-12 col-xl-6 pb-4 custom-grid-desktop-only">
                <ChartsWrapper heading="Candidate pipeline summary">
                  <BarChart />
                </ChartsWrapper>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Workspace);
