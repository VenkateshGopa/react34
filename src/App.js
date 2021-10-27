import './App.css';
import Formtable from './components/Formtable';
import Provider from './Store/Provider';
// import Users from './Fusers'
function App() {
  return (
    <Provider>
    {/* // <Users/> */}
    <Formtable/>
    </Provider>
  );
}

export default App;
