const NoItem = (props: any) => {
  return (
    <div className="no-item-img-wrapper pt-3">
      <img src={props.itemImage} alt="no Item" />
    </div>
  );
};
export default NoItem;
