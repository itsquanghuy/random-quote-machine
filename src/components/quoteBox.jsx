import React, { Component } from 'react';
import axios from 'axios';

class QuoteBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quote: {},
		};
	}

	async generateRandomQuote() {
		const quotesData = await axios.get(
			'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
		);

		const { quotes } = quotesData.data;
		const quote = quotes[Math.floor(Math.random() * quotes.length)];
		quote.twitterUrl =
			'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
			encodeURIComponent('"' + quote.quote + '" ' + quote.author);

		this.setState({ quote });
	}

	async componentDidMount() {
		await this.generateRandomQuote();
	}

	handleChangeQuote = async (event) => {
		event.preventDefault();
		await this.generateRandomQuote();
	};

	render() {
		const { quote } = this.state;

		return (
			<div id='quote-box'>
				<div id='text'>{quote && quote.quote}</div>
				<div id='author'>{quote && quote.author}</div>
				<a href={quote && quote.twitterUrl} id='tweet-quote'>
					Twitter
				</a>
				<button id='new-quote' onClick={this.handleChangeQuote}>
					New Quote
				</button>
			</div>
		);
	}
}

export default QuoteBox;
