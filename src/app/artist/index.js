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
                    fontSize: '1.2rem',
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
                    fontSize: '1.2rem',
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
                    fontSize: '1.2rem',
                  },
                }}
                value={artist.label}
                onChange={(event) => this.change('label', event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="width_fill" style={{ gap: '20px' }}>
          {/* <input
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
              this.setState({ file: file });
            }}
          ></input>
          <button
            style={{ height: '100px', width: '100px' }}
            onClick={async () => {
              const { artist } = this.state;
              const formData = new FormData();
              formData.append('image', this.state.file);
              const imagePost = await api('/upload/' + artist.id, {
                method: 'POST',
                body: formData,
              });
              console.log(imagePost);
            }}
          >
            {'upload!'}
          </button> */}

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
              const { artist } = this.state;
              const initalPost = await api('/artists/' + artist.id, {
                method: 'POST',
                body: artist,
              });

              const response = initalPost;
              console.log(response);

              this.props.navigate('/');
            }}
          >
            Save
          </PrimaryButton>

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
              const { artist } = this.state;
              const artistToDelete = await api('/artists/' + artist.id, {
                method: 'DELETE',
                body: artist,
              });
              console.log(artistToDelete);

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
