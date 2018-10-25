import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {quote: {
      content: '',
      author: ''
    }};
    this.handleNewQuote = this.handleNewQuote.bind(this);
    this.handleTweete = this.handleTweete.bind(this);
  }

  componentDidMount() {
    this.handleNewQuote();
  }

  handleNewQuote() {
    fetch('https://talaikis.com/api/quotes/random/')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const quoteData = data;
      const { quote } = this.state;
      quote.content = quoteData.quote;
      quote.author = quoteData.author;
      this.setState({quote});
    });
  }

  handleTweete() {
    window.open(`https://twitter.com/intent/tweet?text="${this.state.quote.content}"-${this.state.quote.author}`);
  }

  render() {
    return (
      <div className="App container" id='quote-box' >
      <blockquote className='text-center my-5'>
        <QuoteText content={this.state.quote.content}/> 
        <QuoteAuthor author={this.state.quote.author} />
      </blockquote>
      <div className='mb-5 mx-auto btn-group' role='group'>
        <button id='new-quote' className='btn btn-primary' onClick={this.handleNewQuote}>New quote</button>
        <button id='new-quote' className='btn btn-primary' onClick={this.handleTweete}>Tweet</button>
      </div>

      </div>
    );
  }
}

const QuoteText = (props) => {
  return (<div id='text'>
     {props.content}
  </div>);
}

const QuoteAuthor = (props) => {
  return (<div id='author'>
    -{props.author}
  </div>);
}

export default App;
