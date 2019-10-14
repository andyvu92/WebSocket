import React, { Component } from 'react';
import axios from 'axios';
import slugify from 'react-slugify';

export default class ArticleCreate extends Component {

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
            slug: '',
            author: '',
            image: '',
            intro: '',
            content: ''
        }
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
        axios.post('http://localhost:4200/serverport/article/add', article)
        .then(res => console.log(res.data)).catch(error => {
            console.log(error.response)
        });
        this.setState({
            title: '',
            slug: '',
            author: '',
            image: '',
            intro: '',
            content: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <h3>Add New Article</h3>
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
                        <input type="submit" value="Create Article" className="btn btn-primary"/>
                    </div>
                </form>

                <div className="preview_panel">
                    <h2>{this.state.title}</h2>
                    <h4>{this.state.author}</h4>
                    <div className="image"><img src={this.state.image} alt="" height="100" /></div>
                    <p>{this.state.intro}</p>
                    <p>{this.state.content}</p>
                </div>
            </div>
        )
    }
}