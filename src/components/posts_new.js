import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${ touched && error ? 'has-danger' : '' }`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          type="text"
          className="form-control"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);

    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
         />

        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />

        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger" style={{marginLeft: "5px"}}>Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // validate inputs from 'values'
  if(values.title && !values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters";
  }

  if(values.title && values.title.length >= 3){
    delete errors.title;
  }

  if(!values.title) {
    errors.title = "Enter a title";
  }

  if(!values.categories) {
    errors.categories = "Enter a category";
  }

  if(!values.content) {
    errors.content = "Enter some content";
  }


  // if errors is empty, form is valid
  // if errors has *any* properties, Redux assumes form is invalid

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost } )(PostsNew)
);
