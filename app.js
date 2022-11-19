const Header = (props) => {
  return (
    <div className="container">
      <nav className="navbar sticky-top navbar-light bg-dark">
        <h1 className="navbar-brand text-light">{props.title}</h1>
      </nav>
    </div>
  );
};

class GetPokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      sprite: '',
      abilities: []
    };
  }

  componentDidMount() {
    var num = Math.floor(Math.random() * 800);
    var URL = "https://pokeapi.co/api/v2/pokemon/" + num;
    fetch(URL)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          id: result.id,
          name: result.name,
          sprite: result.sprites.front_default,
          abilities: result.abilities
        });
      });
      
  }

  render() {
    const {name, sprite, abilities} = this.state;
    return (
      <div className="col-3">
        <div className="card">
          <img
            src={sprite}
            alt={name}
            className="card-img-top"
          />
          <div className="card-body">
            <h3 className="card-title"><b>{name.charAt(0).toUpperCase() + name.slice(1)}</b></h3>
                <h5 className="abilities"><u>Abilities:</u></h5>
                {abilities.map(ability => (
                    <p className="abilities">
                        {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                    </p>
                ))}
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header title="Pokemon Characters" />
        <div className="row">
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        <GetPokemon/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
