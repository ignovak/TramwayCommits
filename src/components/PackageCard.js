import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as packageActions from '../actions/packageActions';
import CommitLine from './CommitLine';

class PackageCard extends Component {
  onChange(e) {
    this.props.dispatch(packageActions.togglePackage(this.props.packageName, e.target.checked));
  }

  render() {
    return (
      <Panel expanded={this.props.isExpanded} onToggle={_ => _}>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle className="h3" componentClass="a">{this.props.packageName}</Panel.Toggle>
            <label className="form-check-label">
              <input type="checkbox" checked={this.props.isRemoved} onChange={this.onChange.bind(this)} /> Is removed
            </label>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse timeout={0}>
          <Panel.Body>
            <Table hover>
              <tbody>
                {this.props.commits.map(_ => <CommitLine key={_.commit} packageName={this.props.packageName} data={_} />)}
              </tbody>
            </Table>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    )
  }
}

export default connect(state => state.ui)(PackageCard);
