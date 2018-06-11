import React, { Component } from 'react';

class CommitLine extends Component {
  commitUrl(packageName, commit) {
    return `https://code.amazon.com/packages/${this.props.packageName}/commits/${this.props.data.commit}`;
  }

  render() {
    const commit = this.props.data;
    return (
      <tr>
        <td>
          <a href={this.commitUrl()}>{commit.commit}</a>
        </td>
        <td>{commit.author}</td>
        <td>{commit.date}</td>
        <td>{commit.description}</td>
        <td>
          <label className="form-check-label"><input type="checkbox" v-model="commit.isRemoved" change="toggleCommit(commit)" /> Is removed</label>
        </td>
      </tr>
    )
  }
}

export default CommitLine;
