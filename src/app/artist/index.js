import React from 'react';
import { withParams, withNavigate } from '../router-utils';
import api from '../api';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';

class Artist extends React.Component {
  state = {};

  async componentDidMount() {
    const { id: artistId } = this.props.params;

    const artist = await api('/artists/' + artistId);

    this.setState({
      artist,
    });
  }

  render() {
    const { artist } = this.state;

    if (!artist) return null;

    return (
      <div className="artist">
        <div className="width_fill">
          <div className="artist_form">
            <div style={{ flex: 1 }}>
              <legend>Artist Name:</legend>
              <TextField
                borderless={true}
                styles={{
                  field: {
                    backgroundColor: 'rgba(250, 139, 255,0.3);',
                  },
                }}
                value={artist.name}
                onChange={(event) => this.change('name', event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="width_fill">
          <div className="artist_form">
            <div style={{ flex: 1 }}>
              <legend>Description:</legend>
              <TextField
                borderless={true}
                styles={{
                  field: {
                    backgroundColor: 'rgba(250, 139, 255,0.3)',
                  },
                }}
                multiline
                rows={3}
                value={artist.description}
                onChange={(event) =>
                  this.change('description', event.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="width_fill">
          <div className="artist_form">
            <div style={{ flex: 1 }}>
              <legend>Record label:</legend>
              <TextField
                borderless={true}
                styles={{
                  field: {
                    backgroundColor: 'rgba(250, 139, 255,0.3);',
                  },
                }}
                value={artist.label}
                onChange={(event) => this.change('label', event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="width_fill" style={{ gap: '20px' }}>
          <PrimaryButton
            onClick={async () => {
              const { artist } = this.state;
              const initalPost = await api('/artists/' + artist.id, {
                method: 'POST',
                body: artist,
              });

              const response = initalPost;
              console.log(response);
              withNavigate(Artist);
              this.props.navigate('/');
            }}
          >
            Save
          </PrimaryButton>

          <PrimaryButton
            onClick={async () => {
              const { artist } = this.state;
              const artistToDelete = await api('/artists/' + artist.id, {
                method: 'DELETE',
                body: artist,
              });
              console.log(artistToDelete);
              withNavigate(Artist);
              this.props.navigate('/');
            }}
          >
            Delete
          </PrimaryButton>
        </div>
      </div>
    );
  }

  change = (field, newValue) => {
    const artist = Object.assign({}, this.state.artist);

    artist[field] = newValue;

    this.setState({
      artist,
    });
  };
}

export default withNavigate(withParams(Artist));
