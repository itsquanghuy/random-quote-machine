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
			<div
				id='quote-box'
				className='mx-auto mt-5 text-center'
				style={{ width: 500 }}
			>
				<blockquote id='text' className='blockquote'>
					<p className='mb-0'>{quote && quote.quote}</p>
					<footer id='author' className='blockquote-footer'>
						{quote && quote.author}
					</footer>
				</blockquote>
				<div className='row'>
					<div className='col'>
						<a href={quote && quote.twitterUrl} id='tweet-quote'>
							<i className='fa fa-twitter'></i>
						</a>
					</div>
					<div className='col'>
						<button
							id='new-quote'
							className='btn btn-primary'
							onClick={this.handleChangeQuote}
						>
							New Quote
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default QuoteBox;
