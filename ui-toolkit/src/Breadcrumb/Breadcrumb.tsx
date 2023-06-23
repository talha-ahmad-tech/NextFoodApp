import React from 'react';
import Link from 'next/link';
import './Breadcrumb.scss';

const Breadcrumb = (props: BreadcrumbProps) => {
  return (
    <header className="friday-page-header">
      <div className="friday-page-header__body">
        <div>
          <div className="d-flex">
            <Link href={props.link} className="circle-icon-secondary me-3">
              <span className="material-icons-outlined">{props.icon}</span>
            </Link>
            <div className="d-flex flex-column">
              <h1 className="friday-page-header__title">{props.title}</h1>
              {props.subtitle && (
                <p className="friday-page-header__sub-title">
                  {props.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export type BreadcrumbProps = {
  icon: string;
  title: string;
  link: string;
  subtitle?: string;
};
export default React.memo(Breadcrumb);
