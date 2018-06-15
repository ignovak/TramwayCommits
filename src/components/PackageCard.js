import React, { Component } from 'react';
import { Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { WithContext as ReactTags } from 'react-tag-input';
import * as packageActions from '../actions/packageActions';
import * as uiActions from '../actions/uiActions';
import CommitLine from './CommitLine';
import fetchData from '../util';
import './PackageCard.css';

class PackageCard extends Component {
  handleTagAddition(tag) {
    const packageName = this.props.packageName;
    fetchData(`/add/tag/${ packageName }/${ tag.id }`).then(_ => {
      this.props.dispatch(uiActions.updateTags([tag.id]));
      this.props.dispatch(packageActions.addTag(packageName, tag.id));
    });
  }

  handleTagDelete(i) {
    const packageName = this.props.packageName;
    const tag = this.props.tags[i];
    fetchData(`/remove/tag/${ packageName }/${ tag }`).then(_ => {
      this.props.dispatch(packageActions.deleteTag(packageName, tag));
    });
  }

  toggleExpandCard(open) {
    this.props.dispatch(packageActions.toggleExpandCard(open, this.props.packageName));
  }

  onChange(e) {
    const packageName = this.props.packageName;
    const isRemoved = e.target.checked;
    fetchData(`/${ isRemoved ? 'remove' : 'restore' }/package/${ packageName }`).then(_ => {
      this.props.dispatch(packageActions.togglePackage(packageName, isRemoved));
    });
  }

  onCommitChange(commit, isRemoved) {
    fetchData(`/${ isRemoved ? 'remove' : 'restore' }/commit/${ commit }`).then(_ => {
      this.props.dispatch(packageActions.toggleCommit(commit, isRemoved));
    });
  }

  render() {
    return (
      <Panel className="package-card" expanded={this.props.isExpanded} onToggle={this.toggleExpandCard.bind(this)}>
        <Panel.Heading>
          <Panel.Title>
            <Panel.Toggle className="h3" componentClass="a">{this.props.packageName}</Panel.Toggle>
            <ReactTags
              allowDeleteFromEmptyInput={false}
              handleAddition={this.handleTagAddition.bind(this)}
              handleDelete={this.handleTagDelete.bind(this)}
              minQueryLength={0}
              suggestions={[...this.props.suggestions].map(_ => ({ id: _, text: _ }))}
              tags={this.props.tags.map(_ => ({ id: _, text: _ }))}
            />
            <label className="form-check-label">
              <input type="checkbox" checked={this.props.isRemoved} onChange={this.onChange.bind(this)} /> Marked as hidden
            </label>
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse timeout={0}>
          <Panel.Body>
            <Table hover>
              <tbody>
                {
                  this.props.commits.map(data =>
                    <CommitLine
                      {...data}
                      currentAuthor={this.props.currentAuthor}
                      key={data.commit}
                      onChange={this.onCommitChange.bind(this)}
                      packageName={this.props.packageName}
                    />
                  )
                }
              </tbody>
            </Table>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    )
  }
}

export default connect(state => state.ui)(PackageCard);
