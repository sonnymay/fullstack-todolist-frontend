import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {

  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [showFirework, setShowFirework] = useState(false);

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  }

  const launchFirework = () => {
    setShowFirework(true);
    setTimeout(() => setShowFirework(false), 700); // Match the duration of the firework animation
  }

  return (
    <div className="App">

      {showFirework && <div className="firework"></div>}

      <div className="container">

        <h1>To-Do List App</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add a new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={isUpdating ?
              () => {
                updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
              }
              : () => {
                addToDo(text, setText, setToDo);
              }
            }>
            {isUpdating ? "Update" : "Add"}
          </div>

        </div>

        <div className="list">

          {toDo.map((item) => (
            <ToDo 
              key={item._id} 
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => {
                deleteToDo(item._id, setToDo);
                launchFirework();
              }}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default App;
