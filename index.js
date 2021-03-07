var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Square = function (_React$Component) {
  _inherits(Square, _React$Component);

  function Square(props) {
    _classCallCheck(this, Square);

    return _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).call(this, props));
  }

  _createClass(Square, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var className = "square";
      if (this.props.paint) {
        className += " BGroundGreen";
      }
      return React.createElement(
        "button",
        { className: className, onClick: function onClick() {
            return _this2.props.onClick();
          } },
        this.props.value
      );
    }
  }]);

  return Square;
}(React.Component);

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board(props) {
    _classCallCheck(this, Board);

    var _this3 = _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).call(this, props));

    _this3.renderSquare = function (i) {

      var squaresToPaint = _this3.props.squaresToPaint;
      var paint = squaresToPaint.includes(i);

      return React.createElement(Square, {
        key: i,
        value: _this3.props.arrayBoard[i],
        onClick: function onClick() {
          return _this3.props.onClick(i);
        },
        paint: paint
      });
    };

    return _this3;
  }

  _createClass(Board, [{
    key: "render",
    value: function render() {

      var column = this.props.column;
      var row = this.props.row;

      var drawBoard = [];
      var colBoard = [];
      var sl = 0;
      for (var i = 0; i < row; i++) {
        colBoard = [];
        for (var j = 0; j < column; j++) {
          colBoard.push(this.renderSquare(sl));
          sl++;
        }
        drawBoard.push(React.createElement(
          "div",
          { key: i, className: "board-row" },
          colBoard
        ));
      }

      return React.createElement(
        "div",
        null,
        drawBoard
      );
    }
  }]);

  return Board;
}(React.Component);

var GameStart = function (_React$Component3) {
  _inherits(GameStart, _React$Component3);

  function GameStart(props) {
    _classCallCheck(this, GameStart);

    return _possibleConstructorReturn(this, (GameStart.__proto__ || Object.getPrototypeOf(GameStart)).call(this, props));
  }

  _createClass(GameStart, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { id: "gameStart" },
        React.createElement(
          "div",
          { className: "game-board" },
          React.createElement(Board, {
            arrayBoard: this.props.current.arrayBoard,
            onClick: this.props.clickSquare,
            column: this.props.columnNumber,
            row: this.props.rowNumber,
            squaresToPaint: this.props.squaresToPaint
          })
        ),
        React.createElement(
          "div",
          { className: "game-info" },
          React.createElement(
            "div",
            null,
            this.props.status
          ),
          React.createElement(
            "ol",
            null,
            this.props.moves
          ),
          React.createElement(
            "button",
            { onClick: this.props.ordenar },
            "Ordenar"
          )
        )
      );
    }
  }]);

  return GameStart;
}(React.Component);

var GameOptions = function (_React$Component4) {
  _inherits(GameOptions, _React$Component4);

  function GameOptions(props) {
    _classCallCheck(this, GameOptions);

    return _possibleConstructorReturn(this, (GameOptions.__proto__ || Object.getPrototypeOf(GameOptions)).call(this, props));
  }

  _createClass(GameOptions, [{
    key: "render",
    value: function render() {
      var _this6 = this;

      return React.createElement(
        "div",
        { id: "gameOptions" },
        React.createElement(
          "p",
          null,
          " Antes de comenzar "
        ),
        React.createElement(
          "form",
          { id: "gameOptionsForm", name: "gameOptionsForm", onSubmit: function onSubmit(event) {
              return _this6.props.startGame(event);
            } },
          React.createElement(
            "label",
            null,
            "Filas"
          ),
          React.createElement("input", { type: "number", name: "rowNumber", id: "rowNumber", onChange: function onChange(e) {
              return _this6.props.onChange(e);
            }, value: this.props.rowNumber }),
          React.createElement(
            "label",
            null,
            "Columnas"
          ),
          React.createElement("input", { type: "number", name: "columnNumber", id: "columnNumber", onChange: function onChange(e) {
              return _this6.props.onChange(e);
            }, value: this.props.columnNumber }),
          React.createElement("input", { type: "submit", value: "ready" })
        )
      );
    }
  }]);

  return GameOptions;
}(React.Component);

var Game = function (_React$Component5) {
  _inherits(Game, _React$Component5);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this7 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this7.calculateWinner = function (i, array, row) {

      var rowNumber = parseInt(_this7.state.rowNumber);
      var columnNumber = parseInt(_this7.state.columnNumber);

      //Horizontal checking
      if (array[i] == array[i + 1] && array[i] == array[i + 2] && i + 1 < columnNumber * row && i + 1 >= columnNumber * (row - 1) && i + 2 < columnNumber * row && i + 2 >= columnNumber * (row - 1)) {
        console.log("1");
        return [i, i + 1, i + 2];
      } else if (array[i] == array[i - 1] && array[i] == array[i - 2] && i - 1 < columnNumber * row && i - 1 >= columnNumber * (row - 1) && i - 2 < columnNumber * row && i - 2 >= columnNumber * (row - 1)) {
        console.log("2");
        return [i, i - 1, i - 2];
      } else if (array[i] == array[i - 1] && array[i] == array[i + 1] && i - 1 < columnNumber * row && i - 1 >= columnNumber * (row - 1) && i + 1 < columnNumber * row && i + 1 >= columnNumber * (row - 1)) {
        console.log("3");
        return [i, i - 1, i + 1];
        //Vertical checking
      } else if (array[i] == array[i + columnNumber] && array[i] == array[i + columnNumber * 2]) {
        console.log("4");
        return [i, i + columnNumber, i + columnNumber * 2];
      } else if (array[i] == array[i - columnNumber] && array[i] == array[i - columnNumber * 2]) {
        console.log("5");
        return [i, i - columnNumber, i - columnNumber * 2];
      } else if (array[i] == array[i - columnNumber] && array[i] == array[i + columnNumber]) {
        console.log("6");
        return [i, i - columnNumber, i + columnNumber];
        //diagonal check
      } else if (array[i] == array[i + (columnNumber + 1)] && array[i] == array[i + (columnNumber + 1) * 2] && i + (columnNumber + 1) >= columnNumber * row && i + (columnNumber + 1) < columnNumber * (row + 1) && i + (columnNumber + 1) * 2 >= columnNumber * (row + 1) && i + (columnNumber + 1) * 2 < columnNumber * (row + 2)) {
        console.log("7");
        return [i, i + (columnNumber + 1), i + (columnNumber + 1) * 2];
      } else if (array[i] == array[i - (columnNumber + 1)] && array[i] == array[i - (columnNumber + 1) * 2] && i - (columnNumber + 1) < columnNumber * (row - 1) && i - (columnNumber + 1) >= columnNumber * (row - 2) && i - (columnNumber + 1) * 2 < columnNumber * (row - 2) && i - (columnNumber + 1) * 2 >= columnNumber * (row - 3)) {
        console.log("8");
        return [i, i - (columnNumber + 1), i - (columnNumber + 1) * 2];
      } else if (array[i] == array[i - (columnNumber + 1)] && array[i] == array[i + (columnNumber + 1)] && i + (columnNumber + 1) >= columnNumber * row && i + (columnNumber + 1) < columnNumber * (row + 1) && i - (columnNumber + 1) < columnNumber * (row - 1) && i - (columnNumber + 1) >= columnNumber * (row - 2)) {
        console.log("9");
        return [i, i - (columnNumber + 1), i + (columnNumber + 1)];
      } else if (array[i] == array[i + (columnNumber - 1)] && array[i] == array[i + (columnNumber - 1) * 2] && i + (columnNumber - 1) >= columnNumber * row && i + (columnNumber - 1) < columnNumber * (row + 1) && i + (columnNumber - 1) * 2 >= columnNumber * (row + 1) && i + (columnNumber - 1) * 2 < columnNumber * (row + 2)) {

        console.log("10");
        return [i, i + (columnNumber - 1), i + (columnNumber - 1) * 2];
      } else if (array[i] == array[i - (columnNumber - 1)] && array[i] == array[i - (columnNumber - 1) * 2] && i - (columnNumber - 1) < columnNumber * (row - 1) && i - (columnNumber - 1) >= columnNumber * (row - 2) && i - (columnNumber - 1) * 2 < columnNumber * (row - 2) && i - (columnNumber - 1) * 2 >= columnNumber * (row - 3)) {
        console.log("11");
        return [i, i - (columnNumber - 1), i - (columnNumber - 1) * 2];
      } else if (array[i] == array[i - (columnNumber - 1)] && array[i] == array[i + (columnNumber - 1)] && i + (columnNumber - 1) >= columnNumber * row && i + (columnNumber - 1) < columnNumber * (row + 1) && i - (columnNumber - 1) < columnNumber * (row - 1) && i - (columnNumber - 1) >= columnNumber * (row - 2)) {
        console.log("12");
        return [i, i - (columnNumber - 1), i + (columnNumber - 1)];
      } else {
        return false;
      }
    };

    _this7.clickSquare = function (i) {

      var history = _this7.state.orden == "desc" ? _this7.state.history.slice(0, _this7.state.stepNumber + 1) : _this7.state.history.slice((_this7.state.history.length - _this7.state.stepNumber) * -1);

      var current = _this7.state.orden == "desc" ? history[history.length - 1] : history[0];
      var arrayBoard = current.arrayBoard.slice();

      var sl = 0;
      var positionY = 0;
      var positionX = 0;

      for (var j = 0; j < _this7.state.rowNumber; j++) {
        for (var h = 0; h < _this7.state.columnNumber; h++) {
          if (sl == i) {
            positionY = j + 1;
            positionX = h + 1;
            j = _this7.state.rowNumber;
            break;
          }
          sl++;
        }
      }
      //const positionY=Math.floor((i/this.state.rowNumber)+1);
      //const positionX=this.state.rowNumber-((positionY*this.state.columnNumber)-(i+1));

      var player = _this7.state.player;
      if ((arrayBoard[i] == "" || arrayBoard[i] == undefined) && !_this7.state.winner) {

        arrayBoard[i] = player;
        player = player != "X" ? "X" : "O";
        var pos = current.pos + 1;
        var newHistory = {
          arrayBoard: arrayBoard,
          position: [positionX, positionY],
          pos: pos
        };
        var historyToPush = _this7.state.orden == "desc" ? history.concat(newHistory) : [newHistory].concat(history);
        var winner = _this7.calculateWinner(i, arrayBoard, positionY);

        _this7.setState({
          history: historyToPush,
          player: player,
          stepNumber: _this7.state.orden == "desc" ? history.length : 0,
          winner: winner
        });
      }
    };

    _this7.resetGame = function () {
      _this7.state.winner = false;
      _this7.setState({
        arrayBoard: Array(9),
        player: "X"
      });
    };

    _this7.startGame = function (event) {
      event.preventDefault();

      var numberOfSquares = _this7.state.columnNumber * _this7.state.rowNumber;
      var startHistory = [{
        arrayBoard: Array(numberOfSquares),
        position: [0, 0],
        pos: 0
      }];
      _this7.setState({
        start: true,
        history: startHistory
      });
    };

    _this7.ordenar = function () {
      if (!_this7.state.winner) {
        var orden = _this7.state.orden;
        var reverseHistory = _this7.state.history.reverse();
        var step = 0;
        if (orden == "desc") {
          orden = "asc";
        } else {
          orden = "desc";
          step = reverseHistory.length;
        }
        _this7.setState({
          history: reverseHistory,
          orden: orden,
          stepNumber: step

        });
      }
    };

    _this7.gameOptionControl = function (event) {

      var name = event.target.name;
      var value = event.target.value;

      _this7.setState(_defineProperty({}, name, value));
    };

    _this7.state = {
      player: "X",
      history: [{
        arrayBoard: Array(9),
        position: [0, 0],
        pos: 0
      }],
      stepNumber: 0,
      columnNumber: 3,
      rowNumber: 3,
      winner: false,
      orden: "desc",
      start: false
    };

    return _this7;
  }

  //Function


  //Function


  _createClass(Game, [{
    key: "jumpTo",


    //Function
    value: function jumpTo(step) {

      var position = this.state.orden == "desc" ? step : this.state.stepNumber + step;
      if (position != this.state.stepNumber) {
        this.setState({
          stepNumber: position,
          player: step % 2 == 0 ? "X" : "O",
          winner: false
        });
      }
    }

    //Function

    //Function

  }, {
    key: "render",

    //Render Function
    value: function render() {
      var _this8 = this;

      var history = this.state.orden == "desc" ? this.state.history.slice(0, this.state.stepNumber + 1) : this.state.history.slice((this.state.history.length - this.state.stepNumber) * -1);

      var current = this.state.orden == "desc" ? history[history.length - 1] : history[0];

      var status = void 0;
      var squaresToPaint = !this.state.winner ? [] : this.state.winner;

      status = !this.state.winner ? 'Next player:' + this.state.player : "Winner is  " + current.arrayBoard[this.state.winner[0]];

      var moves = history.map(function (step, move) {
        var desc = step.pos != 0 ? 'Go to move #' + step.pos + " position " + history[move].position[0] + "-" + history[move].position[1] : 'Go to start';
        return React.createElement(
          "li",
          { key: step.pos },
          React.createElement(
            "button",
            { onClick: function onClick() {
                return _this8.jumpTo(move);
              } },
            desc
          )
        );
      });

      return React.createElement(
        "div",
        { className: "game" },
        !this.state.start ? React.createElement(GameOptions, {
          rowNumber: this.state.rowNumber,
          columnNumber: this.state.columnNumber,
          onChange: this.gameOptionControl,
          startGame: this.startGame
        }) : React.createElement(GameStart, {
          status: status,
          current: current,
          rowNumber: this.state.rowNumber,
          columnNumber: this.state.columnNumber,
          ordenar: this.ordenar,
          clickSquare: this.clickSquare,
          squaresToPaint: squaresToPaint,
          moves: moves
        })
      );
    }
  }]);

  return Game;
}(React.Component);

Game.defaultProps = {
  orden: "desc",
  winner: false
  // ========================================

};ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));