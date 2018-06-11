import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from './actions/uiActions';
import PackageCard from './components/PackageCard';
import './App.css';

class App extends Component {
  onChange(e) {
    this.props.dispatch(uiActions.toggleCards(e.target.checked));
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input type="checkbox" defaultChecked={this.props.isExpanded} onChange={this.onChange.bind(this)} /> Expand all
            </label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label"><input type="checkbox" defaultChecked={this.hideRemoved} /> Hide removed</label>
          </div>
          <div className="form-group row">
            <label htmlFor="text-filter" className="col-3 col-form-label">Filter by username</label>
            <div className="col-9">
              <input className="form-control" placeholder="Type text..." v-model="filters.username" input="update" />
            </div>
          </div>
          {this.props.data.map(({ packageName, commits }) => <PackageCard key={packageName} name={packageName} data={commits} />)}
        </div>
      </div>
    );
  }
}

export default connect(state => ({ isExpanded: state.ui.isExpanded }))(App);
