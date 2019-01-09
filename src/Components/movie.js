import React, {Component} from 'react'; // Import de React et de son élément "Component"
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'; // Obligatoire pour utiliser bootstrap
import Sound from 'react-sound';
import {
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,

} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' // Obligatoire pour utiliser fontawesome avec React
import {faHeart} from '@fortawesome/free-solid-svg-icons' // Il faut spécifier chaque icons que l'on souhaite récupérer




class Movies extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      like: this.props.isLiked
    };
  }

  handleClick() {
    var isLike = !this.state.like;
    this.setState({
      like: isLike
    });

if (isLike) {
    fetch('http://localhost:3000/mymovies', {
  method: 'POST',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: 'title=' + this.props.movieName +'&overview=' + this.props.movieDesc + '&poster_path=' + this.props.movieImg + '&idMovieDB=' + this.props.idMovieDB
});
} else {
  fetch('http://localhost:3000/mymovies/' + this.props.idMovieDB, {
    method: 'DELETE'
  }
  );
}
    console.log('clic détecté', isLike);
    this.props.handleClickParent(isLike, this.props.movieName); // J'appelle la fonction contenue dans mon parent avec 2 paramètres (liké ou non, et le nom du film)

  }
  render() {
    // On redéclare notre style qui sera utilisé sur le coeur, pour pouvoir le modifier en dynamique
    var colorHeart = {
      color: 'grey',
      position: 'absolute',
      top: '3%',
      right: '5%',
      height: 30,
      width: 30
    };

    if (this.state.like) {
      colorHeart.color = '#FF5B53';
      
    }

    var isDisplay = {
      marginBottom: 15
    };

    var title = {
      fontFamily: 'Impact',
      color: '#607D8B',
      textAlign: 'center'
    };
    var desc = {
      fontFamily: 'Calibri'
    };

    // Si l'état like est "false" ET QUE displayOnlyLike est "true", on cache le composant Movie sur lequel on est
    if (!this.state.like && this.props.displayOnlyLike) {
      isDisplay.display = 'none';
    }

    // Pour les Colonnes responsives, on met directement "xs", "sm", "md", "xl" et "lg" suivi d'un égal et du nombre de colonnes que doit prendre notre élément (entre guillemets)
    return (<Col xs="12" sm="6" lg="3" style={isDisplay}>
      <Card>
        {/* top est un élémént booléen, il peut être spécifié seul, ou suivi d'un ={true} */
        }
        <CardImg top={true}  width="100%" src={'https://image.tmdb.org/t/p/w500/' + this.props.movieImg} alt="Card image cap"/>
          <CardBody style={styles.cardHeight}>
          <CardTitle style={title}>{this.props.movieName} </CardTitle>
          <CardText style={desc}>{this.props.movieDesc.substr(0, 80) + ' ...'}</CardText>
          </CardBody>
          {/* Appel de l'icone fontawesome en utilisant une balise autofermante FontAwesomeIcon (élément importé tout en haut du code) */
        }
        <FontAwesomeIcon icon={faHeart} style={colorHeart} onClick={this.handleClick}/>
        <Sound
      url="Click.mp3"
      playStatus={Sound.status.PLAYING}
      playFromPosition={5}
      onFinishedPlaying={this.handleSongFinishedPlaying} />
      </Card>
    </Col>);
  }
}

// Déclaration d'un objet styles contenant tout le style de nos composants présents dans le fichier
var styles = {
  navMargin: {
    marginBottom: 10,
    paddingTop: 5
  },
  colorWhite: {
    color: 'white'
  },
  cardHeight: {
    height: 200
  },
};

export default movie;