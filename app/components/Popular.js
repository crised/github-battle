import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

function LanguagesNav({selected, onUpdateLanguage}){
  // console.log(props);
  // const {selected, onUpdateLanguage} = props;
  const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className = 'flex-center'>
    {languages.map((language, index) => (
      <li key={index}>
      <button
        className='btn-clear nav-link'
        style = {language === selected ? { color: 'red'} : null}
        onClick={() =>  onUpdateLanguage(language)}>
        {language}
      </button>
      </li>
    ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected : PropTypes.string.isRequired,
  onUpdateLanguage : PropTypes.func.isRequired

}

export default class Popular extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      selectedLanguage: 'All',
      repos: null,
      error: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  updateLanguage(selectedLanguage){
    this.setState({
      selectedLanguage: selectedLanguage,
      error: null,
      repos: null
    }) // Async

    fetchPopularRepos(selectedLanguage)
      .then((repos) => this.setState({
        repos,
        error: null
      }))
      .catch((error) => {
        console.warn('Error fetching repos', error)

        this.setState({
        repos: null,
        error: null
      })})
  }

  isLoading(){
    return this.state.repos === null && this.state.error === null
  }

  render() {
    const { selectedLanguage, repos, error } = this.state

    return(
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}/>

      {this.isLoading() && <p>LOADING</p>}

      {error && <p>{error}</p>}

      {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>

    )

  }
}