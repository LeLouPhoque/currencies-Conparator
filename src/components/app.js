import React, { Component } from 'react';
import RateExchangeList from '../containers/rate-exchange-list';
import SearchBar from '../containers/search-bar'

export default class App extends Component {
  render() {
    return (
      <div><SearchBar/><RateExchangeList/></div>
    );
  }
}
