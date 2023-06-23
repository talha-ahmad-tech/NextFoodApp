import React from "react";

const Card = (props: CardProps) => {
  return (
    <div className={"friday-card " + props.classes}>
      <div className="friday-card-body">{props.children}</div>
    </div>
  );
};

export type CardProps = {
  classes: string;
  children?: any;
};

export default React.memo(Card);
