import { Button } from '@fridayfood/ui-toolkit';
import { IconButton } from '@fridayfood/ui-toolkit';
import './ListingHeaderBar.scss';

interface ListingHeaderBar {
  title: string;
  titleLink: string;
  buttonLabel?: string;
  onClick: Function;
  btnShow: boolean;
  onClickPost?: Function;
  btnPost?: boolean;
  buttonLabelPost?: string;
  backButton?: boolean;
  children?: any;
}

const ListingHeaderBar = ({
  title = 'Product',
  titleLink = '/',
  onClick,
  btnShow = true,
  backButton = false,
  buttonLabel,
  onClickPost,
  btnPost = false,
  buttonLabelPost,
  children,
}: Partial<ListingHeaderBar>) => {
  return (
    <>
      <header className="friday-page-header w-100">
        <div className="friday-page-header__body">
          <div className="friday-page-header_inner_body">
            <div className="left-content">
              {backButton && <IconButton link={titleLink} iconText="west" />}
              <h1 className="friday-page-header__title">{title}</h1>
            </div>
            <div className="right-content d-flex">
              {btnShow && buttonLabel && (
                <Button
                  label={buttonLabel}
                  classes="custom-btn-primary"
                  onClick={onClick}
                />
              )}
              {children}
            </div>
            {btnPost && (
              <Button
                label={buttonLabelPost}
                classes="custom-btn-primary"
                onClick={onClickPost}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default ListingHeaderBar;
