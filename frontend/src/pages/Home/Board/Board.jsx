import { FaBrush, FaPlus } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import "./Board.css";
import Modal from "../../../components/Modal/Modal";
import { useCallback, useEffect, useState } from "react";
import InputText from "../../../components/InputText/InputText";
import OptionSelect from "../../../components/OptionSelect/OptionSelect";
import { api } from "../../../services/api";
import CardTask from "../../../components/CardTask/CardTask";
import List from "../../../components/List/List";
import Table from "../../../components/Table/Table";

const statusOptions = [
  { 
    id: 1, 
    value: "pending", 
    label: "Pending" 
  }, 
  { 
    id: 2, 
    value: "inProgress", 
    label: "In progress" 
  }, 
  { 
    id: 3, 
    value: "completed", 
    label: "Done" 
  }
];

export default function Board() {
  const [tags, setTags] = useState([])
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newTask, setNewTask] = useState({
    tag: "",
    title: "",
    status: "",
    assignedTo: "",
    description: "",
  });
  const [view, setView] = useState("table");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }, [filter]);

  const fetchTags = useCallback(async () => {
    try {
      const { data } = await api.get("/tags");
      setTags(data)
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    fetchTags();
    fetchTasks();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  
  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks((prev) => prev.filter((task) => task.id !== id));
      } catch (error) {
        console.error(error);
      }
    },
    [tasks, setTasks]
  );

  const handleSubmit = async () => {
    try {
      const payload = {
        assignedTo: newTask.assignedTo,
        description: newTask.description,
        title: newTask.title,
        status: newTask.status,
        tag: Number(newTask.tag),
      }
      const { data } = await api.post("/tasks", payload);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFilter = (e) => {
    setFilter(e.target.value)
  } 

  if(isLoading) return <p>Loading...</p>

  return (
    <div id="board-wrapper">
      <div className="header-board">
        <Button onClick={handleOpenModal}>
          <FaPlus />
          Add Task
        </Button>

        <div className="filter">
          <OptionSelect
            required={true}
            label="Filtrar por"
            onChange={onChangeFilter}
            placeholder="Seleciona uma categoria"
            options={tags.map(tag => ({ 
              id: tag.id, 
              value: tag.id,
              label: tag.label, 
            }))}
          />
          
          {filter && (
            <Button secondaryStyle onClick={() => window.location.href="http://localhost:5173"}>
              <FaBrush />
            </Button>
          )}
        </div>
      </div>
      
      <div className="choice-view">
        <h4>Tipo de visualização</h4>
        <div className="buttons-view">
          <Button onClick={() => setView("board")} secondaryStyle={view === "table"}>Board</Button>
          <Button onClick={() => setView("table")} secondaryStyle={view === "board"}>Table</Button>
        </div>
      </div>

      {view === "table" ? (
        <>
          <Table 
            data={{
              headers: [
                { column: "title", label: "Título" },
                { column: "description", label: "Descrição" },
              ],
              rows: tasks,
            }} 
            handleDeleteRow={handleDeleteRow} 
          />
        </>
      ) : (
        <section className="board">
          <List label="To do" taskStatus="pending">
            {tasks
              .filter(task => task.status === "pending")
              .map(task => {
              return (
                <CardTask 
                  key={task.id} 
                  title={task.title}
                  tag={task.tags.label}
                  description={task.description} 
                />
              )
            })}
          </List>

          <List label="In progress" taskStatus="inProgress">
            {tasks
              .filter(task => task.status === "inProgress").map(task => {
              return (
                <CardTask 
                  key={task.id} 
                  title={task.title}
                  tag={task.tags.label}
                  description={task.description} 
                />
              )
            })}
          </List>

          <List label="Done" taskStatus="completed">
          {tasks
            .filter(task => task.status === "completed" && !(task.tags.label === filter))
            .map(task => {
            return (
              <CardTask 
                key={task.id} 
                title={task.title}
                tag={task.tags.label}
                description={task.description} 
              />
            )
          })}
          </List>
        </section>
      )}

      <Modal
        title="Add new task"
        isOpen={isModalOpen}
        setNewTask={setNewTask}
        onClose={handleCloseModal}
        handleSubmit={handleSubmit}
      >
        <InputText
          label="Responsible"
          placeholder={"Insert task responsible"}
          required={true}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, assignedTo: e.target.value }))
          }
        />
         <InputText
          label="Title"
          placeholder={"Insert task title"}
          required={true}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <InputText
          required={true}
          label="Description"
          placeholder={"Insert task description"}
          textarea
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <OptionSelect
          label="Status"
          required={true}
          placeholder={"Select status"}
          options={statusOptions}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, status: e.target.value }))
          }
        />

        <OptionSelect
          label="Tag"
          required={true}
          placeholder="Select tag"
          options={(tags ?? []).map(tag => (
            { 
              id: tag.id, 
              value: tag.id, 
              label: tag.label 
            }
          ))}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, tag: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
}