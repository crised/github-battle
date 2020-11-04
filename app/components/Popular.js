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
      repos: {},
      error: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(selectedLanguage){
    this.setState({
      selectedLanguage: selectedLanguage,
      error: null
    })

    if(!this.state.repos[selectedLanguage]){
      fetchPopularRepos(selectedLanguage)
      .then((data) => {
        this.setState(({repos}) => ({
          repos:{
          ...repos,
          [selectedLanguage]: data
        }
      }))
      })
      .catch((error) => {
        console.warn('Error fetching repos', error)

        this.setState({
        repos: null,
        error: null
      })})
    }
  }

  isLoading(){
    const { selectedLanguage, repos, error } = this.state
    return !repos[selectedLanguage] && error === null
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

      {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
      </React.Fragment>

    )

  }
}