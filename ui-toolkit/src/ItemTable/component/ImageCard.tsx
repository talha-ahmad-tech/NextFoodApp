import React from "react";
const ImageCard = ({ image }: any) => {
  return (
    <div className="col-lg-3">
      <div className="product-image">
        {/* <figure className="border-radius-8 border border-1 p-4"> */}
          <img
            style={{ objectFit: "cover", width: "100%" }}
            src="/assests/svgs/plus"
            className={image.class}
            alt={image.alt}
          />
        {/* </figure> */}
      </div>
    </div>
  );
};

export default React.memo(ImageCard);
