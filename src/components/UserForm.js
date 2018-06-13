import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isSubmitted: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.state.value;
    if (value) {
      this.props.onSubmit(value);
      this.setState({
        value: '',
        isSubmitted: true
      });
      setTimeout(_ => this.setState({ isSubmitted: false }), 1000);
    }
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            <small className="text-muted">Add more users?</small>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <form className="form-row" onSubmit={this.onSubmit.bind(this)} hidden={this.state.isSubmitted}>
              <div className="col-auto col-sm-4">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Type username, e.g. `jeff`"
                  onChange={_ => this.setState({ value: _.target.value })}
                  value={this.state.value}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>
            <div className="text-success" hidden={!this.state.isSubmitted}>Thank you!</div>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    )
  }
}

export default UserForm;
