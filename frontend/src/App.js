import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/'} exact component={Artists}/>
      </Switch>
    </Layout>
  );
}

export default App;
