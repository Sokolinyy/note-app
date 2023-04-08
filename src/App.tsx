import "./App.scss";
import NoteList from "./components/NoteList";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/note-app/" element={<NoteList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
