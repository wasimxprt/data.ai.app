import Header from "./components/Header";
import TableClass from "./components/TableClass";
import ErrorBoundary from "./components/ErrorBoundary"

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary key={"error-id"}>
        <TableClass />
      </ErrorBoundary>
    </>

  );
}

export default App;
