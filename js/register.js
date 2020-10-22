import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class App extends React.Component {
	render() {
		return (
			<ReactBootstrap.Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
				</Form.Group>
			</ReactBootstrap.Form>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("registration-form"));
