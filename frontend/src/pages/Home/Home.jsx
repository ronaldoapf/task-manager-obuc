import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Board from "./Board/Board";
import Tags from "./Tags/Tags";
import { useState } from "react";

export default function Home() {
  const [currentTab, setCurrentTab] = useState("board");

  const tabs = {
    board: <Board />,
    tags: <Tags />,
  };
  
  return (
    <div id="home-wrapper">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {tabs[currentTab]}
    </div>
  );
}
