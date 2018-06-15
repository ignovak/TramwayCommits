import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as packageActions from './actions/packageActions';
import * as uiActions from './actions/uiActions';
import FiltersCard from './components/FiltersCard';
import PackageCard from './components/PackageCard';
import CommitForm from './components/CommitForm';
import './App.css';
import fetchData from './util';

const packageTitleHeight = 35;
const numOfCardsToToggle = window.innerHeight / packageTitleHeight;

class App extends Component {
  toggleExpandCards(e) {
    const isExpanded = e.target.checked;
    // TODO: use redux-saga / redux-thunk for async operation
    for (let i = 0, start = 0, end = numOfCardsToToggle; start < this.props.data.length; i++, start = end, end += numOfCardsToToggle) {
      setTimeout(_ => this.props.dispatch(packageActions.toggleExpandCards(isExpanded, start, end)), 50 * i);
    }
  }

  toggleRemovedPackages(e) {
    this.props.dispatch(uiActions.toggleRemovedPackages(e.target.checked));
  }

  filterByAuthor([author]) {
    this.props.dispatch(uiActions.filterByAuthor(author));
    window.location.hash = `#${ author || '' }`;
  }

  filterByTag([tag]) {
    this.props.dispatch(uiActions.filterByTag(tag));
  }

  addUser(user) {
    fetchData(`/add/user/${ user }`).then(_ => {
      this.props.dispatch(uiActions.addUser(user));
    });
  }

  addCommit(packageName, commit) {
    fetchData(`/add/commit/${ packageName }/${ commit }`).then(_ => {
      this.props.dispatch(packageActions.addCommit(packageName, commit));
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <FiltersCard
            ui={this.props.ui}
            addUser={this.addUser.bind(this)}
            filterByAuthor={this.filterByAuthor.bind(this)}
            filterByTag={this.filterByTag.bind(this)}
            toggleExpandCards={this.toggleExpandCards.bind(this)}
            toggleRemovedPackages={this.toggleRemovedPackages.bind(this)}
          />
          <CommitForm onSubmit={this.addCommit.bind(this)} />
          {
            this.props.data
              .filter(data =>
                (!this.props.ui.author || data.commits.some(_ => _.author === this.props.ui.author))
                &&
                (!this.props.ui.tag || data.tags.some(_ => _ === this.props.ui.tag))
                &&
                (this.props.ui.showRemoved || !data.isRemoved || data.recentlyUpdated)
              )
              .map(data => <PackageCard {...data} key={data.packageName} currentAuthor={this.props.ui.author} />)
          }
        </div>
      </div>
    );
  }
}

export default connect(state => ({ data: state.packageData, ui: state.ui }))(App);
