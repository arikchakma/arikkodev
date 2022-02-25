import '../styles/globals.css';

import { ThemeProvider } from 'next-themes';
// import {
//   Provider,
//   defaultChains,
//   defaultL2Chains,
//   developmentChains
// } from 'wagmi';
// import { InjectedConnector } from 'wagmi/connectors/injected';

// API key for Ethereum node
// const infuraId = process.env.INFURA_ID;

// Set up connectors
// const connectors = () => {
//   return [
//     new InjectedConnector({
//       chains: [...defaultChains, ...defaultL2Chains, ...developmentChains]
//     })
//   ];
// };

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      {/* <Provider
        autoConnect
        connectorStorageKey="mirror.wallet"
        connectors={connectors}
      > */}
      <Component {...pageProps} />
      {/* </Provider> */}
    </ThemeProvider>
  );
}

export default MyApp;
