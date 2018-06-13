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
        <td className="commit-id">
          <a href={this.commitUrl()}>{this.props.commit}</a>
        </td>
        <td className={`commit-author ${this.props.author === this.props.currentAuthor ? 'font-weight-bold' : ''}`}>
          {this.props.author}
        </td>
        <td className="commit-date">{this.props.date}</td>
        <td dangerouslySetInnerHTML={{ __html: this.props.description }}></td>
        <td className="commit-is-removed">
          <label className="form-check-label">
            <input type="checkbox" checked={this.props.isRemoved} onChange={this.onChange.bind(this)} /> Marked as hidden
          </label>
        </td>
      </tr>
    )
  }
}

export default CommitLine;
