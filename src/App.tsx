import "./App.scss";
import NoteContent from "./components/NoteContent";
import NoteList from "./components/NoteList";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/:id" element={<NoteContent />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
