import React, { Component } from 'react';
import axios from 'axios';

export default class ArticleSingle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            content: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4200/serverport/article/'+this.props.match.params.id)
            .then(response => {
                this.setState({ title: response.data.title, author: response.data.author, content: response.data.content });
            })
            .catch(function (error) {
                console.log(error);
            })
        }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <h2>{this.state.title}</h2>
                <span>Author: {this.state.author}</span>
                <p>{this.state.content}</p>
            </div>
        )
    }
}