import React from 'react';
import { NavLink } from 'react-router-dom';

import api from '../api';

export default class Artists extends React.Component {
  state = {};

  async componentDidMount() {
    // load the artists from the backend
    const data = await api('/artists');

    this.setState({
      data,
    });
  }

  render() {
    return (
      <div className="artists_container">
        <div className="artists_menu">
          <input
            type="text"
            placeholder="name"
            onChange={(e) => {
              this.setState({ nameToAdd: e.target.value });
            }}
          ></input>
          <input
            type="text"
            placeholder="Label"
            onChange={(e) => {
              this.setState({ labelToAdd: e.target.value });
            }}
          ></input>
          <input
            type="text"
            placeholder="description"
            onChange={(e) => {
              this.setState({ descriptionToAdd: e.target.value });
            }}
          ></input>
          <button
            onClick={async () => {
              if (this.state.nameToAdd === undefined) {
                return;
              }

              await api('/artists', {
                method: 'PUT',
                body: {
                  name: this.state.nameToAdd,
                  label: this.state.labelToAdd,
                  description: this.state.descriptionToAdd,
                },
              });

              const data = await api('/artists');

              this.setState({
                data,
              });
            }}
          >
            Add
          </button>
        </div>

        {this.renderList()}
      </div>
    );
  }

  renderList() {
    if (!this.state.data) {
      return null;
    }

    return (
      <table className="artists_list">
        <thead>
          <tr>
            <th>Artist</th>
            <th>Label</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{this.state.data.map(this.renderListItem)}</tbody>
      </table>
    );
  }

  renderListItem(item) {
    return (
      <tr>
        <td>
          <NavLink to={'/artists/' + item.id}>{item.name}</NavLink>
        </td>

        <td>{item.label}</td>

        <td>{item.description}</td>
      </tr>
    );
  }
}
