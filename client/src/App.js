import React from 'react';
import './style/App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch('/exemple')
      .then(response => response.json())
        .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <p>{this.state.data}</p>
      </div>
    );
  }
}

export default App;