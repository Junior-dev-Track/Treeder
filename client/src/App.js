import React from 'react';
import './style/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

fetchFromServer = (url) => {
  console.log('Fetching from URL:', url.toString());

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => this.setState({ data }))
      .then(() => console.log('Data fetched:', this.state.data))
      .catch(error => console.error('Error:', error));
}

componentDidMount() {
    const url = new URL('/exemple', window.location.href);
    this.fetchFromServer(url);
  }

  changeData = () => {
  this.setState({ data: null }, () => {
      const url = new URL('/autre', window.location.href);
      this.fetchFromServer(url);
      });
}

  render() {
      console.log('Data:', this.state.data);

      return (
        <div>
          <h1>Welcome to Treeder</h1>
          <h2>Seed leaves, harvest forests</h2>
          <p>{this.state.data ? this.state.data.data : 'Loading...'}</p>
          <button onClick={this.changeData}>Change Data</button>
        </div>
      );
    }
}

export default App;