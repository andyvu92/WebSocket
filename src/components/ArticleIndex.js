import React, { Component } from 'react';
import axios from 'axios';
import ArticleItem from './ArticleItem';

export default class ArticleIndex extends Component {

  constructor(props) {
      super(props);
      this.state = {articles: []};
    }

    componentDidMount(){
      axios.get('http://localhost:4200/serverport/article')
      .then(response => {
        this.setState({ articles: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    articleGrid(){
        return this.state.articles.map(function(object, i){
            return <ArticleItem obj={object} key={i} />;
        });
    }

    render() {
      return (
        <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Title</td>
                  <td>Author</td>
                  <td>Image</td>
                  <td>Intro</td>
                  <td>Body</td>
                </tr>
              </thead>
              <tbody>
                {this.articleGrid()}
              </tbody>
            </table>
        </div>
      );
    }
  }