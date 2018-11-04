import React, { Component } from 'react';
import Layout from './containers/Layout'
import axios from 'axios'
import BaseRouter from './routes'
import {BrowserRouter as Router} from 'react-router-dom'

const AppContext = React.createContext();

class App extends Component {
  state = {
    config: {},
    search_results: [],
    query: "",
    handleResultsSubmit: (value) => {
      this.setState({query:value})
    }
  }
  componentDidMount() {
    axios.get("https://api.themoviedb.org/3/configuration?api_key=2005b3a7fc676c3bd69383469a281eff").then(res => {
      this.setState({
        config: res.data
      })
    })
  }
  render() {
    const session = localStorage.getItem("TMDB_session_id")
    return (
      <div className="App">
        <AppContext.Provider value={this.state}>
          <Router>
            <Layout>
              <BaseRouter searchQuery={this.state.query}/>
            </Layout>
          </Router>
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
export {AppContext}
