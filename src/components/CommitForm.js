import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class CommitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isValid: true,
      isSubmitted: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const value = this.state.value;
    if (value) {
      const match = value.match(/.*code.amazon.com\/packages\/(\w+)\/commits\/(\w+)/);
      if (match === null) {
        this.setState({ isValid: false });
      } else {
        this.props.onSubmit(...match.slice(1));
        this.setState({
          value: '',
          isValid: true,
          isSubmitted: true
        });
        setTimeout(_ => this.setState({ isSubmitted: false }), 1000);
      }
    }
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>
            <small className="form-text text-muted">Add more commits?</small>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <form className="form-row" onSubmit={this.onSubmit.bind(this)} hidden={this.state.isSubmitted}>
              <div className="col-auto col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Paste the commit URL, e.g. `https://code.amazon.com/packages/TRStoreAttributes/commits/6ee0983c48feb7ec678f90ee2174467864d73bcc`"
                  onChange={_ => this.setState({ value: _.target.value })}
                  value={this.state.value}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-sm">Submit</button>
            </form>
            <div className="text-success" hidden={!this.state.isSubmitted}>Thank you!</div>
            <div className="text-danger" hidden={this.state.isValid}>Commit URL is invalid</div>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    )
  }
}

export default CommitForm;
