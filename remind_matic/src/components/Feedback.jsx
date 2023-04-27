import React from 'react';


// Code is maily made by Teodor Nedevski by modifyiong examples from the react and emailJS documentation
export default class Feedback extends React.Component {
  constructor(props) {
	super(props);
	this.state = { feedback: '', name: 'Name', email: 'email@example.com', email_sent: '' };
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
	return (
  	<form className="test-mailing">
    	<div>
      	<textarea
        	id="test-mailing"
        	name="test-mailing"
        	onChange={this.handleChange}
        	placeholder="EmailAdress"
        	required
        	value={this.state.email}
        	style={{width: '100%', height: '30px'}}
      	/>
    	</div>
    	<input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
        <div>{this.state.email_sent}</div>
  	</form>
	)
  }
  handleChange(event) {
    this.setState({email: event.target.value})
  }
  handleSubmit (event) {
	const templateId = 'template_16brg88';
	this.sendFeedback(templateId, {message_html: this.props.message, from_name: this.state.name, reply_to: this.state.email})
  }
  sendFeedback (templateId, variables) {
	window.emailjs.send(
  	'service_36a87bd', templateId,
  	variables
  	).then(res => {
        this.setState({email_sent: 'Email Successfully Sent!'})
    	console.log('Email successfully sent!')
  	})
  	.catch(err => console.error('Oh well, you failed.', err))
  }
}