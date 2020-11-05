import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'

function ReposGrid({repos}) {
  return (
    <ul id="list">
    {repos.map((repo, index) => {
      const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
      const { login, avatar_url } = owner

      return (
      <li key={index}>
      <h4>
          #{index+1}
      </h4>
      <img
        width="100px"
        src={avatar_url}
        alt={`Avatar for ${login}`}
      />
      <h2>
        <a href={html_url}>{login}</a>
      </h2>
      <ul>
        <li>
          <FaUser color='rgb(255, 191, 116)' size={22} />
          <a href={`https://github.ocm/${login}`}>
            {login}
          </a>
        </li>
        <li>
          <FaStar color='rgb(255, 215, 0)' size={22} />
          {stargazers_count.toLocaleString()} stars
        </li>
        <li>
          <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
          {forks.toLocaleString()} forks
        </li>
        <li>
          <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
          {open_issues.toLocaleString()} open
        </li>
      </ul>
      </li>
      )
    })}
    </ul>
  )
}

    // {[<li>1</li>,<li>1</li>]}


 // {repos.map((repo, index) => {
      //   index
      // })}

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

      {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}
      </React.Fragment>

    )

  }
}