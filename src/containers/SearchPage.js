import React, { Component } from 'react';
import { history } from '../history';
import qs from 'qs';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import SearchPagination from '../components/SearchPagination';
import SearchToolbar from '../components/SearchToolbar';
import { tomorrowString } from '../helpers/date.js';
import { getSearchParams, getTotalPages, getSearchUrl } from '../helpers/search.js';
import api from '../helpers/api';
import '../assets/css/search.css'

class SearchPage extends Component {
  
  state = {
    loading: true,
    cars: null,
    form: {
      location: 'London, United Kingdom',
      max_distance: 1000,
    	number_of_months: 12,
    	number_of_weeks: 52,
    	order_by: "recommended",
    	order_direction: "asc",
    	page: 1,
    	per_page: 15,
    	price_max: 2500,
    	price_min :100,
    	number_of_seats_min: 2,
    	number_of_seats_max: 9,
    	rolling: false,
    	start_date: tomorrowString,
    	vehicle_type: "Consumer",
    	subscription_start_days: 30,
    	vehicle_make: '',
    	transmission: '',
    	year: '',
    	fuel: '',
    },
    metadata: {},
    currentLocation: 'London, United Kingdom',
  }
  
  // On page load, grab any params from the URL, update the state, and then call the API
  // URL params are strings, so number fields need to be converted to a number
  componentDidMount() {
    let params = (this.props.location ? this.props.location.search.replace('?','') : null);
    params = qs.parse(params);
    const numberFields = ['subscription_start_days', 'max_distance', 'price_min', 'price_max', 'number_of_seats_min', 'number_of_seats_max', 'page', 'year'];
    let paramsClean = Object.assign({}, ...Object.keys(params).map(k => ({[k]: (numberFields.includes(k) ? parseInt(params[k], 10) : params[k])})));
    this.setState(prevState => ({
      form: {
        ...prevState.form, ...paramsClean
      },
      currentLocation: paramsClean.location || prevState.location
    }), this.search);
  }
  
  handleInputChange = event => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      const action = (target.tagName === 'SELECT' ? this.blurForm : null); // If the event was a select event, we want to blur the select when it changes
      
      this.setState(prevState => ({
          form: { ...prevState.form, [name]: value }
      }), action);
  }

  // Handle inputs for slider fields which have min and max values
  handleInputChangeSlider = (values, minFieldName, maxFieldName) => {
      const min = values[0];
      const max = values[1];
      
      this.setState(prevState => ({
          form: { ...prevState.form, [minFieldName]: min, [maxFieldName]: max }
      }));
  }
  
  // Handle sort changes
  handleSortChange = (order_by, order_direction) => {
    this.setState(prevState => ({
        form: { ...prevState.form, order_by, order_direction }
    }), this.blurForm);
  }
  
  search = (pageHasChanged = false) => {
    const page = (pageHasChanged ? this.state.form.page : 1); // If the page number was not changed (default), change to page 1 whenever a search is made
    
    this.setState(prevState => ({
      loading: true,
      cars: null,
      form: { ...prevState.form, page },
      currentLocation : prevState.form.location
    }), () => {
      api.getVehicles(getSearchParams(this.state.form))
      .then(res => {
        this.setState({ loading: false, cars: res.data, metadata: res.metadata });
        const urlString = getSearchUrl(this.state.form);
        history.push('/?'+urlString); // Update the URL with the new params
      });
    });
  }
  
  // When a form input is blurred, make a search
  handleBlur = () => {
    this.search();
  }
  
  // If the user submits the form (by pressing enter), blur the form (which will trigger a search)
  // If we don't blur the form, it will get submitted again when the user clicks away
  handleSubmit = (e) => {
      e.preventDefault();
      this.blurForm();
  }
  
  blurForm = () => [...document.getElementById("search_form").elements].forEach(field => field.blur());
  
  // When pagination is clicked, update the state with the page number and then search
  onPaginationClick = (page) => {
    this.setState(prevState => ({
      form: { ...prevState.form, page }
    }), () => { this.search(true) });
  }
  
  render() {
    const { currentLocation, form, loading, metadata } = this.state;
    
    return (
      <div className="row">
        <div className="col-lg-3">
          <SearchForm
            formValues={form}
            metadata={metadata}
            onBlur={this.handleBlur}
            onChange={this.handleInputChange}
            onChangeSlider={this.handleInputChangeSlider}
            onSubmit={this.handleSubmit}
          />
        </div>
        <div className="col-lg-9">
          {!loading && !!metadata.total_count &&
            <div>
              <h4 className="font-weight-bold">{metadata.total_count} VEHICLES FOUND NEAR {currentLocation.toUpperCase()}</h4>
            </div>
          }
          <SearchToolbar loading={loading} orderBy={form.order_by} orderDirection={form.order_direction} onChange={this.handleSortChange} onBlur={this.handleBlur} />
          <SearchResults {...this.state}/>
          <SearchPagination loading={loading} onPaginationClick={this.onPaginationClick} pageCurrent={form.page} pageTotal={getTotalPages(metadata.total_count, metadata.per_page)} />
        </div>
      </div>
    );
  }
}

export default SearchPage;
