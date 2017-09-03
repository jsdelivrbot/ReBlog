import React, { Component } from 'react';

class PostsShow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Show posts {this.props.id}</div>;
  }
}

export default PostsShow;
