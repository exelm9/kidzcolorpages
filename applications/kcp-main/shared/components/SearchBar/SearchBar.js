import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {term: ''};
	}
	// set state of SearchBar to the value of the input on keypress
	onInputChange(term) {
		this.setState({term});
	}

	onKeyDown(keycode) {
		// on enter search for pictures
		if(keycode === 13){
			this.props.onSearchChange(this.state.term);
		}
	}

	render () {
		return(
			<div className="search-bar">
				<input
					value = { this.state.term }
					onKeyDown={event => this.onKeyDown(event.keyCode)}
					onChange={ event => this.onInputChange(event.target.value) }
					placeholder="Search for pictures!"
				/>
			</div>
		);
	}
}

