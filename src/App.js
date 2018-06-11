import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from './actions/uiActions';
import PackageCard from './components/PackageCard';
import './App.css';

class App extends Component {
  toggleExpandCards(e) {
    this.props.dispatch(uiActions.toggleExpandCards(e.target.checked));
  }

  toggleRemovedPackages(e) {
    this.props.dispatch(uiActions.toggleRemovedPackages(e.target.checked));
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="checkbox" defaultChecked={this.props.isExpanded} onChange={this.toggleExpandCards.bind(this)} /> Expand all
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label"><input type="checkbox" defaultChecked={this.showRemoved} onChange={this.toggleRemovedPackages.bind(this)} /> Show removed</label>
          </div>
          <div className="form-group row">
            <label htmlFor="text-filter" className="col-3 col-form-label">Filter by username</label>
            <div className="col-9">
              <input className="form-control" placeholder="Type text..." v-model="filters.username" input="update" />
            </div>
          </div>
          {this.props.data.map(data => <PackageCard {...data} key={data.packageName} />)}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ data: state.packageData, isExpanded: state.ui.isExpanded }))(App);
