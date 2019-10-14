import React, { Component } from 'react';
import axios from 'axios';
import slugify from 'react-slugify';

export default class ArticleEdit extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeIntro = this.onChangeIntro.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            author: '',
            image: '',
            intro: '',
            content: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4200/serverport/article/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({ title: response.data.title, author: response.data.author, image: response.data.image, intro: response.data.intro, content: response.data.content });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
            slug: slugify(e.target.value)
        });
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangeContent(e) {
        this.setState({
            content: e.target.value
        });
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        });
    }

    onChangeIntro(e) {
        this.setState({
            intro: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const article = {
            title: this.state.title,
            slug: this.state.slug,
            author: this.state.author,
            image: this.state.image,
            intro: this.state.intro,
            content: this.state.content
        }
        axios.post('http://localhost:4200/serverport/article/update/'+this.props.match.params.id, article)
        .then(res => console.log(res.data));
        this.setState({
            title: '',
            slug: '',
            author: '',
            image: '',
            intro: '',
            content: ''
        })
        this.props.history.push('/article/index');
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <h3>Editing {this.state.image}</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Article Title:  </label>
                        <input type="text" value={this.state.title} onChange={this.onChangeTitle} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Article Author: </label>
                        <input type="text" value={this.state.author} onChange={this.onChangeAuthor} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Article Image: </label>
                        <input type="text" value={this.state.image} onChange={this.onChangeImage} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Article Intro: </label>
                        <input type="textarea" value={this.state.intro} onChange={this.onChangeIntro} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Article Body: </label>
                        <input type="textarea" value={this.state.content} onChange={this.onChangeContent} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Article" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}