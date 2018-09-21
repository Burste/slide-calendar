import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./todolist-style.scss";
import NavSwitch from "./Components/NavigationSwitch/NavSwitch";
import GroupTabContent from "./Components/Todos/GroupTabContent";
class App extends Component {
  constructor() {
    super();
    let todos = [
      { text: "買牛奶", groupid: "living", date: "2018/08/10", isDone: true },
      { text: "繳電話費", groupid: "living", date: "2018/08/01", isDone: true },
      { text: "去銀行", groupid: "living", date: "2018/08/10", isDone: false },
      { text: "內部會議", groupid: "work", date: "2018/08/10", isDone: false },
      { text: "回信", groupid: "work", date: "2018/08/10", isDone: true },
      { text: "拜訪客戶", groupid: "work", date: "2018/08/10", isDone: false },
      { text: "家長會", groupid: "family", date: "2018/08/22", isDone: false }
    ];
    // 待辦事項分類
    let groups = [
      { name: "全部", id: undefined },
      { name: "生活", id: "living" },
      { name: "工作", id: "work" },
      { name: "家庭", id: "family" }
    ];
    this.state = {
      name: "待辦事項",
      todos: todos,
      groups: groups,
      activeGroupID: undefined
    };
  }
  createTodo(newtodotext, groupid) {
    //console.log(...this.state.todos)//{item: "Buy soymilk", date: "2018/07/16", isDone: true} {item: "Buy soymilk", date: "2018/07/16", isDone: true}
    //console.log(this.state.todos) //[{…}, {…}, {…}]
    const newTodo = {
      text: newtodotext,
      groupID: groupid || this.state.activeGroupID
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }
  switchGroup(groupid) {
    this.setState({
      activeGroupID: groupid
    });
  }
  renderGroupTabContent(activegroupid) {
    const todos = activegroupid
      ? this.state.todos.filter((todo, index) => todo.groupid === activegroupid)
      : this.state.todos;
    return (
      <div id="todolist" className={"pd-20"}>
        <NavSwitch
          groups={this.state.groups}
          activeGroupID={activegroupid}
          switchGroup={groupid => this.switchGroup(groupid)}
        />
        <GroupTabContent
          todos={todos}
          activeGroupID={activegroupid}
          createTodo={(newtodotext, groupid) =>
            this.createTodo(newtodotext, groupid)
          }
        />
      </div>
    );
  }
  render() {
    // return (
    //   <BrowserRouter>
    //     <div>
    //     <Route
    //         exact
    //         path="/"
    //         render={() => this.renderGroupTabContent()}
    //     />
    //     <Route
    //         exact
    //         path="/group/:id"
    //         render={({ match }) => this.renderGroupTabContent(match.params.id)}
    //     />
    //     </div>
    //   </BrowserRouter>
    // );
    const todos = this.state.activeGroupID
      ? this.state.todos.filter(
          (todo, index) => todo.groupid === this.state.activeGroupID
        )
      : this.state.todos;
    return (
      <div id="todolist" className={"pd-20"}>
        <NavSwitch
          groups={this.state.groups}
          activeGroupID={this.state.activeGroupID}
          switchGroup={groupid => this.switchGroup(groupid)}
        />
        <GroupTabContent
          todos={todos}
          activeGroupID={this.state.activeGroupID}
          createTodo={(newtodotext, groupid) =>
            this.createTodo(newtodotext, groupid)
          }
        />
      </div>
    );
  }
}

export default App;
