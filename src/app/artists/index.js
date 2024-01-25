import React from 'react';
import { NavLink } from 'react-router-dom';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
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
        <div className="width_fill">
          <div className="artist_form">
            <div style={{ flex: 1 }}>
              <TextField
                borderless={true}
                styles={{
                  field: {
                    backgroundColor: 'rgba(250, 139, 255,0.3);',
                    fontSize: '1.2rem',
                  },
                }}
                placeholder="Name"
                onChange={(e) => {
                  this.setState({ nameToAdd: e.target.value });
                }}
              ></TextField>
            </div>
          </div>
        </div>
        <div className="width_fill">
          <div className="artist_form">
            <div style={{ flex: 1 }}>
              <TextField
                borderless={true}
                styles={{
                  field: {
                    backgroundColor: 'rgba(250, 139, 255,0.3);',
                    fontSize: '1.2rem',
                  },
                }}
                placeholder="Label"
                onChange={(e) => {
                  this.setState({ labelToAdd: e.target.value });
                }}
              ></TextField>
            </div>
          </div>
        </div>
        <div className="width_fill">
          <div className="artist_form">
            <div style={{ flex: 1 }}>
              <TextField
                borderless={true}
                styles={{
                  field: {
                    backgroundColor: 'rgba(250, 139, 255,0.3);',
                    fontSize: '1.2rem',
                  },
                }}
                placeholder="Description"
                onChange={(e) => {
                  this.setState({ descriptionToAdd: e.target.value });
                }}
              ></TextField>
            </div>
          </div>
        </div>
        <PrimaryButton
          styles={{
            root: {
              backgroundColor: '#CEABD8',
              borderColor: '#B681C5',
              fontSize: '1.2rem',
            },
            rootHovered: {
              backgroundColor: '#B681C5',
              borderColor: '#A665B8',
            },
          }}
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
        </PrimaryButton>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
          }}
        >
          {this.renderList()}
        </div>
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
