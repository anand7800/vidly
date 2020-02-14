import React, { Component } from "react";

class TableHeader extends Component {
  state = {};
  sortIcon = column => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    const { columns, onRiseSort } = this.props;

    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.key || column.lable}
              className="clickable"
              onClick={() => onRiseSort(column.path)}
            >
              {column.lable} {this.sortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
