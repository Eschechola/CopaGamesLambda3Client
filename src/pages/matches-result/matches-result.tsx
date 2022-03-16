import { Component } from "react";

class MatchesResult extends Component {
  //const { state } = this.props.location

  constructor(props: any){
    super(props);
    console.log(localStorage.getItem("games"));
  }

  render(){
    return (
      <section className="matches-result-section">
        <p>Matches Result</p>
      </section>
    );
  }
}
  
  export default MatchesResult;