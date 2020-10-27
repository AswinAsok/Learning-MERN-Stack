import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
    };
  }

  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false,
      };
      const list = [...this.state.list];
      list.push(newItem);

      this.setState({
        list,
        newItem: "",
      });
    }
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatelist = list.filter((item) => item.id != id);
    this.setState({
      list: updatelist,
    });
  }

  updateInput(input) {
    this.setState({ newItem: input });
  }

  render() {
    return (
      <div>
        <header>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
            integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
            crossOrigin="anonymous"
          />
        </header>
        <img src={logo} width="200" height="200" className="logo" />
        <h1 className="app-title text-center">My ToDo App</h1>
        <div className="container text-center">
          Add an Item...
          <br />
          <br />
          <input
            type="text"
            className="input-text form-control col-xs-2"
            placeholder="Write a ToDo"
            required
            value={this.state.newItem}
            onChange={(e) => this.updateInput(e.target.value)}
          ></input>
          <br />
          <br />
          <button
            className="add-btn btn btn-primary "
            onClick={() => this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
          >
            Add ToDo
          </button>
          <div className="list">
            <br />
            <ul>
              {/* {
                (this.state.list.map,
                  ((item) => {
                  return <li key={item.id}>
                    <input 
                    type= "checkbox"
                    name="idDone"
                    checked = {item.isDone}
                    onChange = {() => {}}
                    />
                    {item.value}
                    <button
                      className="btn"
                    onClick = {() => this.deleteItem(item.id)}
                      >Delete</button>
                  </li>
                }))
              } */}
              <li className="p-3 mb-2 bg-info text-white ">
                <input type="checkbox" name="" id="" />
                Record Youtube Videos
                <button className="Delete btn btn-danger">Delete</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
