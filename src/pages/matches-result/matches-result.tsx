import { Component } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/loading";
import IGame from "../../interfaces/IGame";
import "../matches-result/matches-result.css";
import { sendGamesToMatches } from "../../services/game.service";

class MatchesResult extends Component {

  constructor(props: any){
    super(props);
    const gamesObject = JSON.parse(localStorage.getItem("games") as string)
    this.state.gamesToMatch = gamesObject?.games as IGame[];
  }

  state = {
    isLoading: true,
    gamesToMatch: [] as IGame[],
    winners: [] as IGame[],
    resultComponent: <></>
  }

  componentDidMount(){
    document.title = "Match Result!"
    this.mountWinnersComponent()
  }

  getWinnerAsync = async () => {
    try{
        const games = await sendGamesToMatches(this.state.gamesToMatch);
        this.setState({winners: games});
    }
    catch(error: any){
        alert(error);
    }
  }

  mountWinnersComponent = async () => {
    this.enableLoading();
    await this.getWinnerAsync();
    
    var winnersComponent = []
    
    winnersComponent.push(
      <div className="matches-result-rows">
        <div className="matches-result-row">
          <div className="matches-result-row-position">
            <h1>1º</h1>
          </div>
          <div className="matches-result-row-title">
            <p>{this.state.winners[0].title}</p>
          </div>
        </div>

        <div className="matches-result-row">
          <div className="matches-result-row-position">
              <h1>2º</h1>
            </div>
            <div className="matches-result-row-title">
              <p>{this.state.winners[1].title}</p>
          </div>
        </div>
      </div>);

    this.setState({resultComponent: winnersComponent});
    this.disableLoading();
  }

  enableLoading = () => this.setState({isLoading: true});

  disableLoading = () => this.setState({isLoading: false});

  render(){
    return (
      <section className="matches-result-section">
        <div className="matches-result-content">
          <header className="header">
            <h6>CAMPEONATO DE GAMES</h6>
            <h1>Resultado Final</h1>
            <hr />

            <p>Veja o resultado final do campeonato de game de forma simples e rapida!</p> 
          </header>

          {
            this.state.isLoading
            ? <Loading />
            : this.state.resultComponent
          }

          <div className="matches-result-back-button">
            <Link to="/games">Voltar para seleção de jogos</Link>
          </div>
        </div>
      </section>
    );
  }
}
  
  export default MatchesResult;