import React from "react";
import "../App.css";
import parse from "html-react-parser";

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      dataArr: [],
      bookInput: ""
    };
  }

  //This function gets the dataArr of the ebooks api that will be displayed when the user searches a book
  newSearch() {
    fetch("/books")
      .then(res => res.json())
      .then(dataArr => this.setState({ dataArr }));
  }

  //This async/await function fetches the information from the api
  bookSearch = async () => {
    let search = this.state.bookInput.split(" ").join("+");
    const getBook = await fetch(
      `/book?search=${search}&type=${this.state.type}`
    );
    let res = await getBook.json();
    this.setState({
      dataArr: res
    });
  };

  //This function gets and adds the information of the book the user selected to the favourite Books json file
  favoriteBook = i => {
    let favPic = {
      id: i.trackId,
      author: i.artistName,
      artwork: i.artworkUrl100,
      book: i.trackName,
      description: i.description
    };

    //This fetch method  is used to get and post the information of the books to "favouriteBooks" json file
    fetch("/favoritesBooks", {
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
        <h1>E-Books</h1>
        <input
          type="text"
          onChange={e => this.setState({ bookInput: e.target.value })}
          input
        />
        &emsp;
        <i onClick={() => this.bookSearch()} class="search-button fa fa-search">
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
            {parse(`<p>${sortArr.description}</p>`)}
            <img src={sortArr.artworkUrl100} alt="Loading..." />
            &emsp;
            <i
              onClick={() => {
                this.favoriteBook(sortArr);
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

export default Books;
