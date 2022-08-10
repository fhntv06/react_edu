import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

import ControlledTable from "./components/Table/ControlledTable";
import Modal from "./components/Modal/Modal"; 

import './styles/index.css';


// ================ first day ========================
function Square(props) {
  return (
    <button 
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Перейти к ходу #' + move :
        'К началу игры';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// ================= second day ======================

// const divStyle = {
//   height: "100px",
//   width: "auto",
//   backgroundSize: "contain",
//   backgroundRepeat: "no-repeat",
//   color: 'blue',
//   // backgroundImage: 'url(' + imgUrl + ')',
// };

class Table extends React.Component {
  render() {
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr>
              <Columns values={["Привет", "Мир"]}/>
            </tr>
          </tbody>
        </table>
        <ControlledTable />
      </React.Fragment>
    );
  }
}

class Columns extends React.Component {

  render() {
    return( 
      this.props.values.map((value) => <td key={value}>{value}</td>)
    )
  }
}

// ================= third day ======================

const titles = ["Angular","Vue", "React"];
const arImgUrl = [
  "https://avatars.mds.yandex.net/i?id=33c413e451627d30c268003771d59a04-3618094-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=ad33120ba17e772d282ced999ba9e901-5316097-images-thumbs&n=13",
  "https://miro.medium.com/max/1024/1*p97BugR0XeVxY__7CqL9fA.png"
];

class SelectImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      size: false
    }
  }

  changeImage(index) {
    this.setState({index})
  }

  changeSizeImage(size) {
    size = !size;
    this.setState({size})
  }

  render() {
    let className = this.state.size ? "img-big" : "img-small" ;
    return(
      <React.Fragment>
        <img 
          className={className} 
          style={{backgroundImage: `url(${arImgUrl[this.state.index]})`}} 
          alt='technology'
        />
        <div className='fixed'>
          {titles.map((title, index)=>{
            return(
              <button 
              onClick={()=>{ this.changeImage(index) }} 
              key={title}>{title}</button>
            )
          })}
          <button onClick={()=>this.changeSizeImage(this.state.size)}>Resize image</button>
        </div>
      </React.Fragment>
    )
  }
}

// ================= Fifth day ======================

class Change extends React.Component {
  render () {
    return (
      <form className='form'>
        <input onChange={this.props.handleChangeTitle}/>
        <button type='submit' onClick={this.props.handleSaveHeader}>Сохранить</button>
      </form>
    )
  }
}

const modalRed = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
    padding: '32px',
    borderRadius: '20px',
    backgroundColor: 'red'
  },
};
const modalBue = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '50%',
    padding: '32px',
    borderRadius: '20px',
    backgroundColor: 'blue'
  },
}

// ================= Sixth day ======================

function SelectFruit () {
  const [fruit, setFruit] = useState('Фрукт не выбран')
  const [tree, setTree] = useState('Дерево не выбрано')

  function handleChangeFruit (event) {
    setFruit (event.target.value)
    document.title = event.target.value === 'Фрукт не выбран' ? 'Фрукт не выбран' : `Вы выбрали ${event.target.value}`
  }

  useEffect(() => {
    // API browser
    document.title = tree
  })

  return (
    <div>
      <p>{tree}</p>
      <select onChange={event => setTree(event.target.value)}>
        <option value='Дерево не выбрано'>Дерево не выбрано</option>
        <option value='Дуб'>Дуб</option>
        <option value='Каштан'>Каштан</option>
        <option value='Лиственнца'>Лиственнца</option>
      </select>
      <p>{fruit}</p>
      <select onChange={handleChangeFruit}>
        <option name='default' value='Фрукт не выбран'>Фрукт не выбран</option>
        <option value='Банан'>Банан</option>
        <option value='Яблоко'>Яблоко</option>
        <option value='Апельин'>Апельин</option>
      </select>
    </div>
  )
}

// ================= Seven day ======================
// change elements of theme 
const ThemeContext = React.createContext('light'); // default 'light'

function Parents(props) {

  return (
    <ElementsParents methodChange={props.changeTheme}/>
  )
}

class ElementsParents extends React.Component {
  static contextType = ThemeContext;
  render () {
    
    return (
      <>
        <Button theme={this.context} changeTheme={true} methodChange={this.props.methodChange}/>
        <Button theme={this.context}/>
        <Source theme={this.context}/>
      </>
    )
  }
}

function Button(props) {
  if (props.changeTheme) {
    return(
      <button onClick={props.methodChange}>Button change theme</button>
    )
  } else {
    return(
      <button className={props.theme}>Button</button>
    )
  }
  
}
function Source(props) {
  return(
    <a className={props.theme} href='/'>Source</a>
  )
}


// ========================================

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      headerTwo: "Введите заголовок",
      setIsOpenBlue: false,
      setIsOpenRed: false,
      setItLightTheme: true
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleClickClose = this.handleClickClose.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleChangeTheme = this.handleChangeTheme.bind(this)
  }

  componentDidMount () {
    const headerTwo = localStorage.getItem('headerTwo') !== null ? localStorage.getItem('headerTwo') : "Введите заголовок"
    this.setState({headerTwo}) 
  }

  handleChangeTitle (e) {
    this.setState({
      headerTwo: e.target.value
    })
  }
  
  handleSaveHeader = () => {
    // деструктуризация
    const { headerTwo } = this.state;
    localStorage.setItem('headerTwo', headerTwo);
  }

   // открытие
   handleClickOpen (e) {
    e.target.name === 'blue' ? this.setState({setIsOpenBlue: true}) : this.setState({setIsOpenRed: true})
  }

  // закрытие
  handleClickClose (e) {
    e.target.name === 'blue' ? this.setState({setIsOpenBlue: false}) : this.setState({setIsOpenRed: false})
  }

  handleChangeTheme () {
    this.setState({setItLightTheme: !this.state.setItLightTheme})
  }

  render() {
    const count = 10;
    let a = 1; let b = 2;
    // деструктуризация
    [a, b] = [b, a]
    return (
      <>
        {count > 5 && 
        <>
          <h1>Seven day</h1>
          <ThemeContext.Provider value={this.state.setItLightTheme ? 'light' : 'dark'}>
            <Parents changeTheme={this.handleChangeTheme}/>
          </ThemeContext.Provider>
          <h1>Sixth day</h1>
          <SelectFruit />

          <h1>Fifth day</h1>

          <button name='red' onClick={this.handleClickOpen}>Open modal red</button>
          <button name='blue' onClick={this.handleClickOpen}>Open modal blue</button>

          <Modal 
            isOpen={this.state.setIsOpenBlue}
            onRequestClose={this.handleClickClose}
            style={modalBue}
            id='blue'
          />
          <Modal 
            isOpen={this.state.setIsOpenRed}
            onAfterOpen={this.handleAfterOpenFunc}
            onAfterClose={this.handleAfterCloseFunc}
            onRequestClose={this.handleClickClose}
            style={modalRed}
            id='red'
          />

          <h3>Что пройдено:</h3>
          <ul>
            <ol>Modal window</ol>
            <ol>Формы:</ol>
              <ul>
                <li>Управляемые компоненты</li>
                <li>Неуправляемые компоненты</li>
              </ul>
            <ol>Деструктуризация: {a}, {b} vs {a}, {b} </ol>
            <ol>Условный рендеринг</ol>
            <ol>Передача state между родителем и дочерним</ol>
            <ol>Sacc vs scss</ol>
            <ol>Работа с localStorage</ol>
          </ul>
        </>
        }
        
        <h2>{this.state.headerTwo !== '' ? this.state.headerTwo : 'Введите заголовок'}</h2>
        <Change handleChangeTitle={this.handleChangeTitle} handleSaveHeader={this.handleSaveHeader}/>

        <h1>Fourth day</h1>
        <p>Make the test task!</p>
        <div className='parent'>
          <h1>Third day</h1>
          <SelectImage/>
        </div>
        <h1>Second day</h1>
        <Table />
        <h1>First day</h1>
        <Game/>
      </>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <App />
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];  
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
