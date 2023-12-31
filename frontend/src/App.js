import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import NewArtist from "./containers/Artists/NewArtist/NewArtist";
import NewAlbum from "./containers/Albums/NewAlbum/NewAlbum";
import NewTrack from "./containers/Tracks/NewTrack/NewTrack";
import PublishRequest from "./containers/PublishRequest/PublishRequest";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/'} exact component={Artists}/>
        <Route path={'/artists/new'}  component={NewArtist}/>
        <Route path={'/albums/new'} component={NewAlbum}/>
        <Route path={'/albums/:id'} component={Albums}/>
        <Route path={'/tracks/new'} component={NewTrack}/>
        <Route path={'/tracks/:id'} component={Tracks}/>
          <Route path={'/register'} component={Register}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/track_history'} component={TrackHistory}/>
          <Route path={'/requests'} component={PublishRequest}/>
      </Switch>
    </Layout>
  );
}

export default App;
