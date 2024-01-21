import React from 'react';
import { withParams, withNavigate } from '../router-utils';
import api from '../api';

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
        <fieldset>
          <legend>Artist Name:</legend>
          <input
            type="text"
            value={artist.name}
            onChange={(event) => this.change('name', event.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Description:</legend>
          <textarea
            value={artist.description}
            onChange={(event) => this.change('description', event.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Record label:</legend>
          <input
            type="text"
            value={artist.label}
            onChange={(event) => this.change('label', event.target.value)}
          />
        </fieldset>

        <button
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
        </button>

        <button
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
        </button>
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
