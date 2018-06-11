import React, { Component } from 'react';
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
            <details v-for="item in data" open="expand" disabled="item.isRemoved" hidden="hideRemoved && item.isRemoved">
              <summary className="h3">
                 item.package 
              </summary>
              <table className="table table-hover">
                <div className="form-check form-check-inline">
                  <label className="form-check-label"><input type="checkbox" v-model="item.isRemoved" change="togglePackage(item)" /> Is removed</label>
                </div>
                <tr v-for="commit in item.commits" disabled="commit.isRemoved">
                  <td>
                    <a href="commitUrl(item.package, commit.commit)"> commit.commit </a>
                  </td>
                  <td> commit.author </td>
                  <td> commit.date </td>
                  <td> commit.description </td>
                  <td>
                    <label className="form-check-label"><input type="checkbox" v-model="commit.isRemoved" change="toggleCommit(commit)" /> Is removed</label>
                  </td>
                </tr>
              </table>
            </details>
        </div>
      </div>
    );
  }
}

export default App;
