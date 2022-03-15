import { Component } from "react";
import Loading from "../../components/loading/loading";
import './games.css';
import { getGamesAsync } from "../../services/game.service";
import IGame from "../../interfaces/IGame";

class Games extends Component{
    constructor(props: any){
        super(props);
    }

    state = {
        isLoading: true,
        selectedGames: 0,
        games: {} as IGame[],
        gamesComponent: <></>
    }

    componentDidMount(){
        document.title = "Game List"
        this.mountGamesComponent();
    }

    getGamesAsync = async () => {
        try{
            const games = await getGamesAsync();
            this.setState({games: games});
        }
        catch(error: any){
            alert(error);
        }
    }

    mountGamesComponent = async () => {
        await this.getGamesAsync();
        
        var yearList: Number[] = this.getOrderedYearList();
        var gameList = [];

        for(var i = 0; i < yearList.length; i++){
            const gamesFromYear = this.getGamesFromYear(yearList[i]);
            const gameRows = this.mountGamesRows(gamesFromYear);

            gameList.push(this.mountYearHeader(yearList[i]));
            gameList.push(this.mountGamesContainerContent(gameRows));
        }

        const gamesContainer = this.mountGamesContainer(gameList); 
        this.setState({gamesComponent: gamesContainer});
    }

    getOrderedYearList = (): Number[] => {
        var yearList: Number[] = [];
        
        for(var i = 0; i < this.state.games.length; i++){
            var year = this.state.games[i].year
            if(!yearList.includes(year))
                yearList.push(year)
        }

        return yearList.sort().reverse();
    }

    mountYearHeader = (year: Number) => {
        return (
            <div className="games-container-header">
                <p>{year}</p>
            </div>
        );
    }

    mountGamesContainer = (gameList: any) =>{
        return (
            <div className="games-container">
                {gameList}
            </div>
        );
    }

    mountGamesContainerContent = (gameRows: any) => {
        return (<div className="games-container-content">
            {gameRows}
        </div>)
    }

    getGamesFromYear = (year: Number): IGame[] => {
        var gamesFromYear: IGame[] = [];

        this.state.games.forEach((game) => {
            if(game.year == year)
                gamesFromYear.push(game);
        });

        return gamesFromYear;
    }

    mountGamesRows = (games: IGame[]): JSX.Element[] => {
        var rows: JSX.Element[] = [];
        var rowCount: Number = games.length / 3;

        for(var i = 0; i < rowCount; i+=3){
            var elements: JSX.Element[] = [];

            if(games[i] !== undefined)
                elements.push(this.mountGameCard(games[i]));

            if(games[i + 1] !== undefined)
                elements.push(this.mountGameCard(games[i + 1]));

            if(games[i + 2] !== undefined)
                elements.push(this.mountGameCard(games[i + 2]));

            rows.push(<div className="games-container-content-row">{elements}</div>)
        }

        return rows;
    }

    mountGameCard = (game: IGame) => {
        return (
            <div className="games-container-content-row-item">
                <h6>{game.title}</h6>
                <p>{game.rating}</p>
                <img src={game.urlImage as string} alt={game.id as string}/>
            </div>
        );
    }

    render() {
        return (
            <section className="games-section">
                <div className="games-content">
                    <header className="header">
                        <h6>Challenge Games</h6>
                        <h1>Fase de Seleção</h1>
                        <hr />

                        <p>Selectione 8 games que você deseja que entrem na competição
                        e depois pressione o botão Gerar Campeonato para prosseguir.</p> 
                    </header>

                    <div className="games-info">
                        <div className="games-info-text">
                            <p><strong>Selecionados:</strong> {this.state.selectedGames} games</p>
                        </div>
                        <div className="games-info-actions">
                            <button>
                                Gerar Campeonato
                            </button>
                        </div>
                    </div>

                    <div className="game-list">
                        {
                            !this.state.isLoading
                            ? <Loading />
                            : this.state.gamesComponent
                        }
                    </div>
                </div>
                <br /><br />
            </section>);
    }
}

export default Games;