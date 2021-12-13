import React, {useState, useEffect} from "react";
import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos"

// TodoTitleコンポーネントの作成
const TodoTitle = ({title, as}) => {
    if (as === "h1") return <h1>{title}</h1>;
    if (as === "h2") return <h2>{title}</h2>;
    return <p>{title}</p>;
};

const TodoItem = ({todo}) => {
    return (
        <li>
            {todo.content}
            <button>{todo.done ? "未完了へ" : "完了へ"}</button>
            <button>削除</button>
        </li>
    );
};

const TodoList = ({todolist}) => {
    return(
        <ul>
            {todolist.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
        </ul>
    );
};

function App() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() =>{
    const fetchData = async ()=>{
      const response = await axios.get(todoDataUrl);
      setTodoList(response.data);
    };
    fetchData();
  }, []);

  console.log("TODO", todoList);

  const inCompletedList = todoList.filter((todo) => {
      return !todo.done;
  });

  console.log("未完了TODO", inCompletedList);

  const CompletedList = todoList.filter((todo) => {
      return todo.done;
    });

  console.log("完了", CompletedList)

  return(
    <>
      <TodoTitle title="TODO List" as="h1" />
      <textarea />
      <button>+ add TODO</button>
        <TodoTitle title="未完了 TODO List" as="h2" />
        <TodoList todolist={inCompletedList} />
        <TodoTitle title="完了 TODO List" as="h2" />
        <TodoList todolist={CompletedList} />
      {/*<ul>*/}
      {/*  {inCompletedList.map((todo) => (*/}
      {/*      <li key={todo.id}>*/}
      {/*        {todo.content}*/}
      {/*          <button>{todo.done ? "未完成リストへ" : "完成リストへ"}</button>*/}
      {/*          <button>削除</button>*/}
      {/*      </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
      {/*<h2>完了</h2>*/}
      {/*<ul>*/}
      {/*    {CompletedList.map((todo) => (*/}
      {/*        <li key={todo.id}>*/}
      {/*            {todo.content}*/}
      {/*            <button>{todo.done ? "未完成リストへ" : "完成リストへ"}</button>*/}
      {/*            <button>削除</button>*/}
      {/*        </li>*/}
      {/*    ))}*/}
      {/*</ul>*/}
    </>
  );
}

export default App;
