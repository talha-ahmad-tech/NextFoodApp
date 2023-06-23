import './style.scss';

const SectionWrapper = ({ className, children }: any) => {
  return <div className={`custom-card-wrapper  ${className}`}>{children}</div>;
};
export default SectionWrapper;
