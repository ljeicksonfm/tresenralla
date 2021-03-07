class Square extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let className ="square";
    if (this.props.paint) {
      className+=" BGroundGreen";
    }
    return (
      <button className={className} onClick={() => this.props.onClick()}>
        { this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);

  }

  renderSquare= (i) =>{

    const squaresToPaint= this.props.squaresToPaint;
    let paint =squaresToPaint.includes(i);

    return (
            <Square
              key={i}
              value={this.props.arrayBoard[i]}
              onClick={() => this.props.onClick(i)}
              paint={paint}
            />
          )
  }

  render() {

    const column= this.props.column;
    const row= this.props.row;

    let  drawBoard=[];
    let  colBoard=[];
    let sl=0;
    for(let i=0;i<row;i++){
      colBoard=[];
      for (let j=0; j<column;j++){
        colBoard.push(this.renderSquare(sl));
        sl++;
      }
      drawBoard.push(<div key={i} className="board-row" >{colBoard}</div>);
    }

    return (
      <div>
      {drawBoard}
      </div>
    );
  }
}

class GameStart extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div id="gameStart">
      <div className="game-board">
        <Board
          arrayBoard={this.props.current.arrayBoard}
          onClick={ this.props.clickSquare}
          column={this.props.columnNumber}
          row={this.props.rowNumber}
          squaresToPaint={this.props.squaresToPaint}
        />
      </div>
        <div className="game-info">
          <div>{this.props.status}</div>
          <ol>{this.props.moves}</ol>
          <button onClick={this.props.ordenar} >Ordenar</button>
        </div>
      </div>
    );
  }
}


class GameOptions extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div id="gameOptions">
        <p> Antes de comenzar </p>
        <form id="gameOptionsForm" name="gameOptionsForm" onSubmit={(event) => this.props.startGame(event)}>
          <label >Filas</label>
          <input type="number" name="rowNumber" id="rowNumber" onChange={(e)=>this.props.onChange(e)} value={this.props.rowNumber}/>
          <label >Columnas</label>
          <input type="number" name="columnNumber" id="columnNumber" onChange={(e)=>this.props.onChange(e)} value={this.props.columnNumber} />
          <input type="submit" value="ready" />
        </form>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state={
      player:"X",
      history:[{
        arrayBoard:Array(9),
        position:[0,0],
        pos:0
      }],
      stepNumber:0,
      columnNumber:3,
      rowNumber:3,
      winner:false,
      orden:"desc",
      start:false
    };

  }

  //Function
  calculateWinner = (i,array,row) => {

    const rowNumber = parseInt(this.state.rowNumber);
    const columnNumber = parseInt(this.state.columnNumber);

        //Horizontal checking
        if (array[i]==array[i+1] && array[i]==array[i+2]  && ( i+1 < columnNumber * row && i+1 >= columnNumber * (row-1) ) &&  ( i+2 < columnNumber * row && i+2 >= columnNumber * (row-1) ) ) {
          console.log("1");
          return [i,i+1,i+2];
        }else if (array[i]==array[i-1] && array[i]==array[i-2] && ( i-1 < columnNumber * row && i-1 >= columnNumber * (row-1) ) &&  ( i-2 < columnNumber * row && i-2 >= columnNumber * (row-1) ) ) {
          console.log("2");
          return [i,i-1,i-2];
        }else if (array[i]==array[i-1] && array[i]==array[i+1] && ( i-1 < columnNumber * row && i-1 >= columnNumber * (row-1) ) &&  ( i+1 < columnNumber * row && i+1 >= columnNumber * (row-1) ) ) {
          console.log("3");
          return [i,i-1,i+1];
          //Vertical checking
        }else if(array[i]== array[i + columnNumber] && array[i]== array[ i + ( columnNumber * 2) ]){
          console.log("4");
          return [i,i+columnNumber,i+(columnNumber*2)];
        }else if(array[i]== array[i-columnNumber] && array[i]== array[i-(columnNumber*2)]){
          console.log("5");
          return [i,i-columnNumber,i-(columnNumber*2)];
        }else if(array[i]== array[i-columnNumber] && array[i]== array[i+columnNumber]){
          console.log("6");
          return [i,i-columnNumber,i+columnNumber];
          //diagonal check
        }else if(array[i]==array[i + (columnNumber + 1)] && array[i]==array[i + ( (columnNumber + 1) * 2)] && (i+(columnNumber + 1) >=  columnNumber * (row) && i+(columnNumber + 1) < columnNumber * (row+1)) && ( i+(columnNumber + 1)*2 >=  columnNumber * (row+1) && i+(columnNumber + 1)*2 < columnNumber * (row+2)) ){
          console.log("7");
          return [i, i + (columnNumber + 1),i + ( (columnNumber + 1) * 2)];
        }else if(array[i]==array[i-(columnNumber + 1)] && array[i]==array[i-((columnNumber + 1)*2)] && ( i-(columnNumber + 1) < columnNumber * (row-1) &&  i-(columnNumber + 1) >= columnNumber * (row-2)) && (i-((columnNumber + 1)*2) < columnNumber * (row-2) &&  i-((columnNumber + 1)*2) >= columnNumber * (row-3))){
          console.log("8");
          return [i,i-(columnNumber + 1),i-((columnNumber + 1)*2)];
        }else if(array[i]==array[i-(columnNumber + 1)] && array[i]==array[i+(columnNumber + 1)] && ( i+(columnNumber + 1) >= columnNumber * (row) && i+(columnNumber + 1) < columnNumber * (row+1) ) && ( i-(columnNumber + 1) <  columnNumber * (row-1) && i-(columnNumber + 1)  >=columnNumber * (row-2)) ){
          console.log("9");
          return [i,i-(columnNumber + 1),i+(columnNumber + 1)];

        }else if(array[i]==array[i+(columnNumber - 1)] && array[i]==array[i+((columnNumber - 1)*2)] && (i+(columnNumber - 1) >=  columnNumber * (row) && i+(columnNumber - 1) < columnNumber * (row+1)) && ( i+(columnNumber - 1)*2 >=  columnNumber * (row+1) && i+(columnNumber - 1)*2 < columnNumber * (row+2)) ) {

          console.log("10");
          return [i,i+(columnNumber - 1),i+((columnNumber - 1)*2)];

        }else if(array[i]==array[i-(columnNumber - 1)] && array[i]==array[i-((columnNumber - 1)*2)] && ( i-(columnNumber - 1) < columnNumber * (row-1) &&  i-(columnNumber - 1) >= columnNumber * (row-2)) && (i-((columnNumber - 1)*2) < columnNumber * (row-2) &&  i-((columnNumber - 1)*2) >= columnNumber * (row-3)) ){
          console.log("11");
          return [i,i-(columnNumber - 1),i-((columnNumber - 1)*2)];
        }else if(array[i]==array[i-(columnNumber - 1)] && array[i]==array[i+(columnNumber - 1)] && ( i+(columnNumber - 1) >= columnNumber * (row) && i+(columnNumber - 1) < columnNumber * (row+1) ) && ( i-(columnNumber - 1) <  columnNumber * (row-1) && i-(columnNumber - 1)  >=columnNumber * (row-2)) ){
          console.log("12");
          return [i,i-(columnNumber - 1),i+(columnNumber - 1)];
        }else{
          return false;
        }


  }

  //Function
  clickSquare= (i)=>{


    const history = (this.state.orden=="desc")?
                      this.state.history.slice(0, this.state.stepNumber + 1) :
                      this.state.history.slice((this.state.history.length - this.state.stepNumber)*-1);

    const current =(this.state.orden=="desc")?
                      history[history.length - 1]:
                      history[0];
    const arrayBoard = current.arrayBoard.slice();

    let sl=0;
    let positionY=0;
    let positionX=0;


    for(let j=0; j<this.state.rowNumber;j++){
      for(let h=0; h<this.state.columnNumber;h++){
        if (sl == i ) {
          positionY=j+1;
          positionX=h+1;
          j=this.state.rowNumber;
          break;
        }
        sl++;
      }
    }
    //const positionY=Math.floor((i/this.state.rowNumber)+1);
    //const positionX=this.state.rowNumber-((positionY*this.state.columnNumber)-(i+1));

    let player= this.state.player;
    if ((arrayBoard[i] == "" || arrayBoard[i] == undefined) && !this.state.winner) {

      arrayBoard[i]=player;
      player= player!="X" ? "X" : "O" ;
      let pos = current.pos+1;
      const newHistory={
        arrayBoard:arrayBoard,
        position:[positionX,positionY],
        pos: pos
      };
      const historyToPush = (this.state.orden=="desc") ? history.concat(newHistory) : [newHistory].concat(history);
      const winner = this.calculateWinner(i,arrayBoard,positionY);

      this.setState({
        history:historyToPush,
        player:player,
        stepNumber:(this.state.orden=="desc")?history.length:0,
        winner:winner
      });



    }

  }

 //Function
  jumpTo(step){

    let position=(this.state.orden=="desc")? step : this.state.stepNumber + step;
    if (position != this.state.stepNumber) {
      this.setState({
        stepNumber:position,
        player:(step%2==0)?"X":"O",
        winner:false
      });
    }

  }

  //Function
  resetGame= () =>{
    this.state.winner=false;
    this.setState({
      arrayBoard:Array(9),
      player:"X"
    });
  }
  startGame = (event) => {
    event.preventDefault();

    const numberOfSquares=this.state.columnNumber * this.state.rowNumber;
    const startHistory = [{
      arrayBoard:Array(numberOfSquares),
      position:[0,0],
      pos:0
    }]
    this.setState({
      start:true,
      history:startHistory
    })
  }
  //Function
  ordenar=()=>{
    if (!this.state.winner) {
      let orden=this.state.orden;
      let reverseHistory = this.state.history.reverse();
      let step=0;
      if (orden=="desc") {
          orden="asc";
      }else{
        orden="desc";
        step = reverseHistory.length;
      }
      this.setState({
        history:reverseHistory,
        orden:orden,
        stepNumber:step

      });
    }
  }
  gameOptionControl = (event) => {

    const name = event.target.name;
    let value =  event.target.value;

    this.setState({
      [name]:value
    })
  }
  //Render Function
  render() {

    const history = (this.state.orden=="desc")?
                      this.state.history.slice(0, this.state.stepNumber + 1) :
                      this.state.history.slice((this.state.history.length - this.state.stepNumber)*-1);

    const current =(this.state.orden=="desc")?
                      history[history.length - 1]:
                      history[0];

    let status;
    const squaresToPaint= (!this.state.winner)? []:this.state.winner;


     status = !this.state.winner?'Next player:'+this.state.player: "Winner is  "+current.arrayBoard[this.state.winner[0]];

     const moves = history.map((step,move)=>{
       const desc= step.pos!=0 ?
       'Go to move #'+ step.pos+" position " + history[move].position[0]+"-"+history[move].position[1]:
        'Go to start';
        return (
          <li key={step.pos}>
          <button  onClick={()=>this.jumpTo(move)}>{desc}</button>
          </li>
        )
     })

    return (
      <div className="game">

        {!this.state.start  ? (
        <GameOptions
          rowNumber={this.state.rowNumber}
          columnNumber={this.state.columnNumber}
          onChange={this.gameOptionControl}
          startGame={this.startGame}
        />
      ) : (
        <GameStart
          status={status}
          current={current}
          rowNumber={this.state.rowNumber}
          columnNumber={this.state.columnNumber}
          ordenar={this.ordenar}
          clickSquare={this.clickSquare}
          squaresToPaint={squaresToPaint}
          moves={moves}
        />
      )}

      </div>
    );
  }
}
Game.defaultProps={
   orden:"desc",
   winner : false,
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
