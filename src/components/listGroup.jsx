import React from "react";
const ListGroup = props => {
  const {
    items,
    onItemSelect,
    textProperty,
    idProperty,
    imtemSelected
  } = props;
  return (
    <ul className="list-group">
      {items.map(i => (
        <li
          key={i[idProperty] || 0}
          onClick={() => onItemSelect(i)}
          className={
            imtemSelected === i ? "list-group-item active" : "list-group-item"
          }
        >
          {i[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  idProperty: "_id"
};
export default ListGroup;
