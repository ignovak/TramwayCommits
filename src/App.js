import React, { Component } from 'react';
import PackageCard from './components/PackageCard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="form-check form-check-inline">
            <label className="form-check-label"><input type="checkbox" v-model="expand" /> Expand all</label>
          </div>
          <div className="form-check form-check-inline">
            <label className="form-check-label"><input type="checkbox" v-model="hideRemoved" /> Hide removed</label>
          </div>
          <div className="form-group row">
            <label htmlFor="text-filter" className="col-3 col-form-label">Filter by username</label>
            <div className="col-9">
              <input className="form-control" id="text-filter" placeholder="Type text..." v-model="filters.username" input="update" />
            </div>
          </div>
          {this.props.data.map(({ packageName, commits }) => <PackageCard key={packageName} name={packageName} data={commits} />)}
        </div>
      </div>
    );
  }
}

export default App;
