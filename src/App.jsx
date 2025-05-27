import Board from "./pages/Boards/_id";
function App({ mode, setMode }) {
  return (
    <>
      <Board mode={mode} setMode={setMode} />
    </>
  );
}

export default App;
