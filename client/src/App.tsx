import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import configureStore from "./modules/store";
import Navigation from "./navigation";

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_BASE_URL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Provider store={configureStore()}>
      <ApolloProvider client={apolloClient}>
        <Navigation />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
