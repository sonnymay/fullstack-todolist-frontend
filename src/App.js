import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const launchFirework = () => {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.top = `${Math.random() * window.innerHeight}px`;
    firework.style.left = `${Math.random() * window.innerWidth}px`;
    firework.style.background = `radial-gradient(circle, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1), rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1), rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1))`;
    document.body.appendChild(firework);
    
    setTimeout(() => {
        firework.remove();
    }, 1000); // Removes firework after animation completes
  }

  const launchMultipleFireworks = () => {
    for (let i = 0; i < 5; i++) { 
        setTimeout(launchFirework, i * 100);
    }
  };

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="App">
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
              : 
              () => {
                addToDo(text, setText, setToDo);
              }}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => 
            <ToDo 
              key={item._id} 
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => {
                deleteToDo(item._id, setToDo);
                launchMultipleFireworks();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
