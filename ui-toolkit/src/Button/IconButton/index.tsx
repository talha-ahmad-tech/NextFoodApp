import Link from 'next/link';

const IconButton = ({ link = '', iconText = '' }) => {
  return (
    <Link href={link} className="circle-icon-secondary me-2">
      <span className="material-icons-outlined">{iconText}</span>
    </Link>
  );
};
export default IconButton;
