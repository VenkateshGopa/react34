import './App.css';
import Formtable from './components/Formtable';
import Provider from './Store/Provider';
function App() {
  return (
    <Provider>
    <Formtable/>
    </Provider>
  );
}

export default App;
