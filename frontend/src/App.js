import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/'} exact component={Artists}/>
          <Route path={'/albums/:id'} component={Albums}/>
          <Route path={'/tracks/:albumId'} component={Tracks}/>
      </Switch>
    </Layout>
  );
}

export default App;
