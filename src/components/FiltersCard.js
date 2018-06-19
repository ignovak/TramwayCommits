import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import UserForm from './UserForm';

class FiltersCard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-6">
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="checkbox" defaultChecked={this.props.ui.isExpanded} onChange={this.props.toggleExpandCards} /> Expand all
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label"><input type="checkbox" defaultChecked={this.props.ui.showRemoved} onChange={this.props.toggleRemovedPackages} /> Show hidden packages</label>
          </div>
          <div className="form-group row">
            <label className="col-4 col-form-label">Filter packages by username</label>
            <div className="col-8">
              <Typeahead
                  defaultInputValue={this.props.ui.author}
                  highlightOnlyResult={true}
                  options={this.props.ui.authors}
                  onChange={this.props.filterByAuthor}
                  placeholder="Choose the user"
                  selectHintOnEnter={true}
                />
                <UserForm onSubmit={this.props.addUser} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-4 col-form-label">Filter packages by tag</label>
            <div className="col-8">
              <Typeahead
                  defaultInputValue={this.props.ui.tag}
                  highlightOnlyResult={true}
                  options={[...this.props.ui.suggestions].sort()}
                  onChange={this.props.filterByTag}
                  placeholder="Choose the tag"
                  selectHintOnEnter={true}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FiltersCard;
