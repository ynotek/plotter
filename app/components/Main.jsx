import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx'
import Body from './Body.jsx'


export default class Main extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				<Body/>
			</div>
		)
	}
}

ReactDOM.render(<Main />, document.getElementById('app'));