import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import CommitLine from './CommitLine';

class PackageCard extends Component {

  constructor(props) {
    super(props);
    this.expanded = true;
    this.onToggle = _ => console.log(_);
  }

  render() {
    return (
      <Panel defaultExpanded onToggle={this.onToggle}>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle className="h3" componentClass="a">{this.props.name}</Panel.Toggle>
            <label className="form-check-label"><input type="checkbox" v-model="commit.isRemoved" change="toggleCommit(commit)" /> Is removed</label>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            <Table hover>
              <tbody>
                {this.props.data.map(_ => <CommitLine key={_.commit} packageName={this.props.name} data={_} />)}
              </tbody>
            </Table>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    )
  }
}

export default PackageCard;
