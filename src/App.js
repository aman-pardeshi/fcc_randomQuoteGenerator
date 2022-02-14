import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      refresh: true,
      quotes: [],
      currentQuote: {},
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          quotes: data,
          currentQuote: data[Math.floor(Math.random() * data.length)],
        })
      );
  }

  handleClick() {
    this.setState({
      currentQuote:
        this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)],
    });
  }

  render() {
    const { currentQuote } = this.state;
    let hRef = `https://twitter.com/intent/tweet?text=${currentQuote.text}`;
    return (
      <div id='quote-box'>
        <div id='text'>
          <span className='quote-text'>{currentQuote.text}</span>
          <span className='quote-author'>- {currentQuote.author}</span>

          <div className='link-wrapper'>
            <a
              id='tweet-quote'
              title='Tweet this quote!'
              target='_top'
              href={hRef}
            >
              <i class='fa fa-twitter'></i>
            </a>
            <button id='new-quote' onClick={this.handleClick}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
