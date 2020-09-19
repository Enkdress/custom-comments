import { SWRConfig } from 'swr';

import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()) }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
