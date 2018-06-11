import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from './actions/uiActions';
import { Typeahead } from 'react-bootstrap-typeahead';
import PackageCard from './components/PackageCard';
import './App.css';

class App extends Component {
  toggleExpandCards(e) {
    this.props.dispatch(uiActions.toggleExpandCards(e.target.checked));
  }

  toggleRemovedPackages(e) {
    this.props.dispatch(uiActions.toggleRemovedPackages(e.target.checked));
  }

  filterByAuthor([author]) {
    this.props.dispatch(uiActions.filterByAuthor(author));
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="checkbox" defaultChecked={this.props.ui.isExpanded} onChange={this.toggleExpandCards.bind(this)} /> Expand all
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label"><input type="checkbox" defaultChecked={this.showRemoved} onChange={this.toggleRemovedPackages.bind(this)} /> Show removed</label>
          </div>
          <div className="form-group row">
            <label className="col-3 col-form-label">Filter by username</label>
            <div className="col-9">
              <Typeahead
                  highlightOnlyResult={true}
                  options={this.props.ui.authors}
                  onChange={this.filterByAuthor.bind(this)}
                  placeholder="Choose the user"
                  selectHintOnEnter={true}
                />
            </div>
          </div>
          {
            this.props.data
              .filter(data => (!this.props.ui.author || data.commits.some(_ => _.author === this.props.ui.author)) && (this.props.ui.showRemoved || !data.isRemoved || data.recentlyUpdated))
              .map(data => <PackageCard {...data} key={data.packageName} />)
          }
        </div>
      </div>
    );
  }
}

export default connect(state => ({ data: state.packageData, ui: state.ui }))(App);
