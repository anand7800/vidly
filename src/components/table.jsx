import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
class Table extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  render() {
    const { columns, sortColumn, data } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          onRiseSort={this.raiseSort}
          sortColumn={sortColumn}
        />
        <TableBody data={data} columns={columns} />
      </table>
    );
  }
}

export default Table;
