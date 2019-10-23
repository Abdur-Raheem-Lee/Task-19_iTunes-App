import React from "react";
import "../App.css";
import parse from "html-react-parser";

class Music extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArr: [],
      songInput: ""
    };
  }

  //This function gets the dataArr of the ebooks api that will be displayed when the user searches a track
  newSearch() {
    fetch("/music")
      .then(res => res.json())
      .then(dataArr => this.setState({ dataArr }));
  }

  //This async/await function fetches the information from the api
  songSearch = async () => {
    let search = this.state.songInput.split(" ").join("+");
    const getBook = await fetch(
      `/music?search=${search}&type=${this.state.type}`
    );
    let res = await getBook.json();
    this.setState({
      dataArr: res
    });
  };

  //This function gets and adds the information of the track the user selected to the favourite Music json file
  favoriteSong = i => {
    let favPic = {
      id: i.trackId,
      artist: i.artistName,
      artwork: i.artworkUrl100,
      track: i.trackName,
      description: i.description
    };

    //This fetch method  is used to get and post the information of the books to "favouriteMusic" json file
    fetch("/favoritesMusic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(favPic)
    });
    alert(i.trackName + " was added to Favorites");
  };

  render() {
    return (
      <div>
        <h1>Tunes</h1>
        <input
          type="text"
          onChange={e => this.setState({ songInput: e.target.value })}
          input
        />
        &emsp;
        <i onClick={() => this.songSearch()} class="search-button fa fa-search">
          {" "}
          &nbsp;
          <span class="search-tool-tip">Search</span>
        </i>
        {/*This div displays all the information of books related to what was entered into the search bar*/}
        {this.state.dataArr.map(sortArr => (
          <article key={sortArr.trackId}>
            <h4>
              {sortArr.artistName} &nbsp; - &nbsp;
              {sortArr.trackName}
            </h4>
            <img src={sortArr.artworkUrl100} alt="Loading..." />
            &emsp;
            <i
              onClick={() => {
                this.favoriteSong(sortArr);
              }}
              class="favourite-button fa fa-heart"
            >
              {" "}
              &nbsp;
              <span class="favourite-tool-tip">Add to Favourites</span>
            </i>
            <hr />
          </article>
        ))}
      </div>
    );
  }
}

export default Music;
