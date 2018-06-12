import React, { Component } from 'react';

class CommitLine extends Component {
  commitUrl() {
    return `https://code.amazon.com/packages/${this.props.packageName}/commits/${this.props.commit}`;
  }

  onChange(e) {
    this.props.onChange(this.props.commit, e.target.checked);
  }

  render() {
    return (
      <tr>
        <td>
          <a href={this.commitUrl()}>{this.props.commit}</a>
        </td>
        <td>{this.props.author}</td>
        <td>{this.props.date}</td>
        <td>{this.props.description}</td>
        <td>
          <label className="form-check-label">
            <input type="checkbox" checked={this.props.isRemoved} onChange={this.onChange.bind(this)} /> Is removed
          </label>
        </td>
      </tr>
    )
  }
}

export default CommitLine;
