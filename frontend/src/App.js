import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import {Login} from "@mui/icons-material";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/'} exact component={Artists}/>
          <Route path={'/albums/:id'} component={Albums}/>
          <Route path={'/tracks/:id'} component={Tracks}/>
          <Route path={'/register'} component={Register}/>
          <Route path={'/login'} component={Login}/>
      </Switch>
    </Layout>
  );
}

export default App;
