import React, { Component } from 'react';

export default class SearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			term: ''
		};
	}
	// set state of SearchBar to the value of the input on keypress
	onInputChange(term) {
		this.setState({term});
	}

	onKeyDown(keycode) {
		// on enter search for pictures
		if(keycode === 13 && this.state.term.length > 1){
			this.props.onSearchChange(this.state.term);
		}
	}

	onBlur(term){
		this.setState({term});
		this.props.onSearchBlur(this.state.term);
	}

	componentWillReceiveProps(props){
		console.log(props,'huh')
		if(props.clearSearch === true){
			this.setState({term:''})
		}
	}

	render () {
		return(
			<div className="search-bar">
				<input
					value = { this.state.term }
					onBlur={event => this.onBlur(event.target.value)}
					onKeyDown={event => this.onKeyDown(event.keyCode)}
					onChange={ event => this.onInputChange(event.target.value)}
					placeholder="Search for pictures!"
				/>
			</div>
		);
	}
}

