import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



import Dashboard from './Component/Dashboard/Dashboard/Dashboard';
import Home from './Component/Home/Home/Home';
import Login from './Component/Login/Login/Login';
import AuthProvider from './Hooks/Context/AuthProvider';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Register from './Component/Login/Register/Register';
import Details from './Component/Home/Services/Details/Details';
import Header from './Component/Shared/AppBar/Header';
import { green, orange } from '@mui/material/colors';
import { createMuiTheme } from '@mui/material';
import { ThemeProvider } from '@material-ui/styles';
import Footer from './Component/Shared/Footer/Footer';
import AllCar from './Component/AllCar/AllCar';
import NotFound from './Component/Notfound/NotFound';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "3rem"
    }
  },
  palette: {
    type: "light",
    primary: {
      main: orange[600]
    },
    secondary: {
      main: green[400]
    }
  }
});

function App() {

  

  return (
    <div className="App">
    <AuthProvider>
    <Router>
      {/* <NavBar></NavBar> */}
      {/* <ThemeProvider  theme={theme}>
      
      </ThemeProvider> */}
      <Header></Header>

      

        <Switch>
          <Route exact path="/login">
           <Login></Login>
          </Route>

          <Route exact path="/register">
          <Register></Register>
          </Route>

          <Route exact path="/allcar">
          <AllCar></AllCar>
          </Route>

          <PrivateRoute path="/dashboard">
          <Dashboard></Dashboard>
          </PrivateRoute>
          
          <PrivateRoute path="/details/:carId">
          <Details></Details>
          </PrivateRoute>

          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      <Footer></Footer>
    </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
