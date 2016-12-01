import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { fetchCity } from '../actions/actions';

class SearchBox extends Component {
  constructor(props){
    super(props);
    
    this.state = {term: ''};
    
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  onInputChange(event) {
    this.setState({term: event.target.value});
  }
  
  onFormSubmit(event) {
    event.preventDefault();    
    this.props.fetchCity(this.state.term);
  }
  
  render() {
    
    // do I really even need this? It seems like it would come in handy later if I want to ensure
    // someone types in information into the search input before they submit 
    const handleSubmit = this.props.handleSubmit;

    return (
      <div className='search-box col-md-6 col-md-offset-3'>
        <form onSubmit={this.onFormSubmit} className="search-form form-inline">
          <div className="form-group">  
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by City"
              name=""
              value={this.state.term}
              onChange={this.onInputChange}
            />
          </div>
          <button type="submit" className="btn btn-default">Search</button>
        </form>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCity }, dispatch);
}



export default connect(null, mapDispatchToProps)(SearchBox);