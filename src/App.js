import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as packageActions from './actions/packageActions';
import * as uiActions from './actions/uiActions';
import { Typeahead } from 'react-bootstrap-typeahead';
import PackageCard from './components/PackageCard';
import './App.css';

const packageTitleHeight = 35;
const numOfCardsToToggle = window.innerHeight / packageTitleHeight;

class App extends Component {
  toggleExpandCards(e) {
    const isExpanded = e.target.checked;
    // TODO: use redux-saga / redux-thunk for async operation
    for (let i = 0, start = 0, end = numOfCardsToToggle; start < this.props.data.length; i++, start = end, end += numOfCardsToToggle) {
      setTimeout(_ => this.props.dispatch(packageActions.toggleExpandCards(isExpanded, start, end)), 100 * i);
    }
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
