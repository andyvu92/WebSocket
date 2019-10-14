import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ArticleItem extends Component {
  constructor(props) {
      super(props);

      this.delete = this.delete.bind(this);
  }

  delete() {
    axios.get('http://localhost:4200/serverport/article/delete/'+this.props.obj._id)
          .then(console.log('Delete'))
          .catch(err => console.log(err));
  }

  render() {
    return (
        <tr key={this.props.obj._id}>
          <td>
            {this.props.obj._id}
          </td>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            {this.props.obj.author}
          </td>
          <td>
            <img src={this.props.obj.image} alt="" height="100" />
          </td>
          <td>
            {this.props.obj.intro}
          </td>
          <td>
            {this.props.obj.content}
          </td>
          <td>
            <Link to={"/article/"+this.props.obj.slug} className="btn btn-primary">View</Link>
          </td>
          <td>
            <Link to={"/article/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default ArticleItem;