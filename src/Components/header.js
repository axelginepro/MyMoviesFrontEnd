class Header extends Component {

     // Popover Reactstrap -----
  constructor(props) {
    super(props);

    // On injecte this dans nos fonctions grace à la méthode "bind"
    this.toggle = this.toggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickLikeOn = this.handleClickLikeOn.bind(this);
    this.handleClickLikeOff = this.handleClickLikeOff.bind(this);
    this.state = {
      popoverOpen: false,
      viewOnlyLike: false, // Permet de voir uniquement les Movies likés
      moviesCount: 0, // Nombre de films likés (dans le compteur)
      moviesNameList: [], // Tableau qui contient tous les films likés
      movies: [],
      moviesLiked: [],
      status: null,
    };
  }
  componentWillMount() {
    this.setState({
      status: 'Waiting for Movies !'
    });
  };
componentDidMount(){
    var ctx = this;    
    fetch('http://localhost:3000/movies')
    .then(function(response) {
      return response.json();
    })
    .then(function(movie) {
      console.log(movie)
      ctx.setState({movies: movie.movieList, status: null});
    })
    .catch(function(error) {
      console.log('Request failed', error)
    });

    fetch('http://localhost:3000/mymovies').then((response) => {
      return response.json();
    }).then((data) => {
      var moviesNameListCopy = data.movies.map(function(movie) {
        return movie.title; // pour récupérer que les titres
      });
      this.setState({
        moviesLiked: data.movies,  
        moviesCount: data.movies.length,
        moviesNameList: moviesNameListCopy
      });
      console.log(this.state.moviesLiked);
    }).catch((error) => {
      console.error(error);
    });
  };


  handleClick(isLike, name) {
    var moviesNameListCopy = [...this.state.moviesNameList]; 
    variable, parce que c'est un tableau"
    if (isLike) {
      moviesNameListCopy.push(name);
  
      this.setState({
        moviesCount: this.state.moviesCount + 1,
        moviesNameList: moviesNameListCopy
      });
    } else {
      var index = moviesNameListCopy.indexOf(name)
      moviesNameListCopy
      moviesNameListCopy.splice(index, 1)

      this.setState({
        moviesCount: this.state.moviesCount - 1,
        moviesNameList: moviesNameListCopy
      });
    }
  }

  handleClickLikeOn() {
    
    this.setState({
      viewOnlyLike: true
    });
  }

  handleClickLikeOff() {
    this.setState({
      viewOnlyLike: false
    });
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  

  render() {