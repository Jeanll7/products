import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Prisma</h1>
      <form className="container">
        <label>
          ID:
          <input type="text" name="name" />
        </label>
        <label>
          Name_produto:
          <input type="text" name="name" />
        </label>
        <label>
          Código:
          <input type="text" name="name" />
        </label>
        <label>
          Preço:
          <input type="text" name="name" />
        </label>
        <label>
          Data:
          <input type="text" name="name" />
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
}

export default App;
