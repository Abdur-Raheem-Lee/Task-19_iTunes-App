import React from "react";
import "../App.css";
import parse from "html-react-parser";

class Favorite extends React.Component {
  constructor() {
    super();
    this.state = {
      favSongs: [],
      favBooks: []
    };
  }

  //This function fetches the information from the favourites Music json file.
  componentDidMount() {
    fetch("/favoritesMusic")
      .then(res => res.json())
      .then(music => this.setState({ favSongs: music }));

    fetch("/favoritesBooks")
      .then(res => res.json())
      .then(books => this.setState({ favBooks: books }));
  }

  //This function removes the song selected by the user to be removed
  songRemove = i => {
    let songDeleteFromFav = {
      deleted: i.id
    };

    //This fetches the updated data from removed favourites
    fetch("/favoritesMusic", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(songDeleteFromFav)
    });

    //This refreshes the page when the user removes a favourite so that the user can see that the entry was deleted
    document.location.reload();
  };

  //This function removes the book selected by the user to be removed
  bookRemove = i => {
    let bookRemovedFromFav = {
      deleted: i.id
    };

    //This fetches the updated data from removed favourites
    fetch("/favoritesBooks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookRemovedFromFav)
    });

    //This refreshes the page when the user removes a favourite so that the user can see that the entry was deleted
    document.location.reload();
  };

  render() {
    return (
      <div>
        <div class="favourite-info">
          <h3>
            <u>Below are all your favourite Songs:</u>
          </h3>

          {/*This div displays all the songs the user favourited*/}
          {this.state.favSongs.map(sortMusic => (
            <article key={sortMusic.trackId}>
              <h4>
                {sortMusic.artist} &nbsp; - &nbsp; {sortMusic.track}
              </h4>
              <img src={sortMusic.artwork} alt="Loading..." /> &emsp;
              <i
                onClick={() => {
                  this.songRemove(sortMusic);
                }}
                class="remove-button fa fa-trash"
              >
                &nbsp;
                <span class="remove-tool-tip">Remove from Favourites</span>
              </i>
            </article>
          ))}
        </div>
        <div class="favourite-info">
          <h3>
            <u>Below are all your favourite Books:</u>
          </h3>

          {/*This div displays all the books the user favourited*/}
          {this.state.favBooks.map(sortBooks => (
            <article key={sortBooks.artwork}>
              <h4>
                {sortBooks.artist} &nbsp; - &nbsp; {sortBooks.track}
              </h4>
              <img src={sortBooks.artwork} alt="Loading..." />
              &emsp;
              <i
                onClick={() => {
                  this.bookRemove(sortBooks);
                }}
                class="remove-button fa fa-trash"
              >
                &nbsp;
                <span class="remove-tool-tip">Remove from Favourites</span>
              </i>
              <br />
              {parse(`<p>${sortBooks.description}</p>`)}{" "}
              <p>{sortBooks.track}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }
}

export default Favorite;
