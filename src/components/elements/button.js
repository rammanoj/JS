import React from "react";
import loader from "./../../img/loader.gif";

class Button extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <button
        type={this.props.type}
        className={this.props.class}
        onClick={this.props.click}
        disabled={this.props.disabled}
      >
        {this.props.name}
      </button>
    );
  }
}

class Image extends React.Component {
  render() {
    return (
      <img
        src={this.props.src}
        className={this.props.class}
        alt={this.props.alt}
      />
    );
  }
}

class Loading extends React.Component {
  render() {
    return <Image src={loader} class="loading" />;
  }
}

/* JSON Format to be parsed by below table: 
{
  "elements": [
    {
      "id": "Id of the block",
      "elements": "elemet in block ...."
    }
  ],
  "trHandler": "pass the handler function to the tr",
  "header": ['header1', 'header2', .... ],
  "class": "list of classes to the tables",
  "tr_b_class": "Class to all tr in body",
  "tr_h_class": "Class to tr in head",
  "th_class": "Class to th",
  "td_class": "Class to td"
}
*/

class Table extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let tr_h = [],
      tr_b = [],
      { table } = this.props;
    for (let i in table.name) {
      tr_h.push(
        <th key={i} className={table.th_class}>
          {table.name[i]}
        </th>
      );
    }
    for (let j in table.elements) {
      let td = [];
      for (let k in table.elements[j]) {
        if (k !== "pk") {
          td.push(
            <td key={table.elements[j][k]} className={table.td_class}>
              {table.elements[j][k]}
            </td>
          );
        }
      }
      tr_b.push(
        <tr
          key={j}
          id={table.elements[j].pk}
          onClick={this.props.table.trHandler}
          className={table.tr_b_class}
        >
          {td}
        </tr>
      );
    }
    let trh = <tr className={table.tr_h_class}>{tr_h}</tr>;
    return (
      <table className={table.class}>
        <thead>{trh}</thead>
        <tbody>{tr_b}</tbody>
      </table>
    );
  }
}

/*
Format of the passed object:
  {
    "options": [],
    "item": "Name of the added item"
  }
*/
class SearchComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let options = [];
    for (let i in this.props.options) {
      options.append(
        <option value={this.props.options[i]}>{this.props.options[i]}</option>
      );
    }
    return (
      <div className="list-header">
        <select className="select">
          <option value="filter1">filter1</option>
          <option value="filter2">filter2</option>
          <option value="filter3">filter3</option>
          {this.props.options}
        </select>
        <input className="input" placeholder="Search Here..." />
        <button className="button btn">
          <b style={{ fontSize: "130%%" }}>+</b> Add {this.props.item}
        </button>
      </div>
    );
  }
}

export { Image, Loading, Table, SearchComponent };
export default Button;
