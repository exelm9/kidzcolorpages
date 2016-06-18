import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {term: ''};
	}

	onInputChange(term) {
		this.setState({term});
		this.props.onSearchChange(term);
	}

	render () {
		return(
			<div className="search-bar">
				<input value = { this.state.term }
				onChange={ event => this.onInputChange(event.target.value) } />
			</div>
		);
	}
}

