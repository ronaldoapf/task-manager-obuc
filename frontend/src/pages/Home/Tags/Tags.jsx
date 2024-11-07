import { FaPlus } from "react-icons/fa";
import "./Tags.css";
import { useCallback, useEffect, useState } from "react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button"
import Table from "../../../components/Table/Table";
import { api } from "../../../services/api";

export default function Tags() {
  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  
  const fetchTags = useCallback(async() => {
    try {
      const { data } = await api.get("/tags");
      setTags({
        headers: [{ label: "Tag", column: "label" }],
        rows: data,
      })
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchTags()
  }, [])

  const handleDeleteRow = useCallback(
    async (id) => {
      await api.delete(`/tags/${id}`).then(response => {
        setTags((prev) => ({
          ...prev,
          rows: prev.rows.filter((tag) => tag.id !== id),
        }));
      }).catch(err => alert("Erro ao deletar tag"))
    },
    [tags, setTags]
  );

  const handleTagSubmit = async (event) => {
    event.preventDefault();
    if (!newTag) {
      alert("Digite um nome para a tag");
      return;
    }

    await api.post("/tags", { label: newTag })
    .then(response => {
      setTags((prev) => 
        ({
        ...prev,
        rows: 
          [
            ...prev.rows, 
            { 
              id: response.data.id, 
              label: response.data.label 
            }
          ],
      }))
    })
    .catch(err => alert("Erro ao adicionar tag"))
    setNewTag("")
  };

  const handleChange = (event) => {
    setNewTag(event.target.value);
  };

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="tags-wrapper">
      <h1>Tags</h1>
      <div className="form-wrapper">
        <form onSubmit={(event) => handleTagSubmit(event)}>
          <InputText 
            required
            type="text"
            value={newTag}
            onChange={handleChange}
            placeholder="Insert tag name"
          />

          <Button type="submit" onClick={handleTagSubmit}> 
            <FaPlus /> Add Tag
          </Button>
        
        </form>
      </div>

      <Table data={tags} handleDeleteRow={handleDeleteRow} />
    </div>
  );
}