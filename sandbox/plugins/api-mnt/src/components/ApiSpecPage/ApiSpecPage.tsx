import { useEffect, useRef } from 'react';
import '@stoplight/elements/styles.min.css';
import '@stoplight/elements/web-components.min.js';
import { Header, HeaderLabel, Page, Select } from '@backstage/core-components';

export const ApiSpecPage = () => {
  const container = useRef<HTMLDivElement>(null);
  const versions = [
    {
      label: 'v1 (Zoom API)',
      url: 'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml',
    },
    {
      label: 'v2 (Petstore)',
      url: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml',
    },
  ];
  
  useEffect(() => {
    if (container.current) {
      const el = document.createElement('elements-api');
      el.setAttribute(
        'apiDescriptionUrl',
        'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml'
      );
      // Optional: extra props
      el.setAttribute('layout', 'sidebar');
      el.setAttribute('hideTryItPanel', 'true');
      el.setAttribute('hideExport', 'true');
      el.setAttribute('router', 'hash');
      el.setAttribute('logo', '/vpbank.png');
      container.current.appendChild(el);
    }
  }, []);

  return (
    <Page themeId="apis">
        <Header title="Vpbank API" subtitle="Explore the API documentation"
          style={{
            // position: 'sticky',
            top: 0,
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 1rem',
            color: 'green',
            }}
            >
          <HeaderLabel
           label=""
           value={
            <Select
              label="Version"
              items={[
                {
                  label: 'v1 (Zoom API)',
                  value: 'https://raw.githubusercontent.com/stoplightio/Public-APIs/master/reference/zoom/openapi.yaml',
                },
                {
                  label: 'v2 (Petstore)',
                  value: 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/main/examples/v3.0/petstore.yaml',
                },
              ]}
              onChange={() => {}}
            >
            </Select>
          } />
        </Header>
      <div ref={container} style={{ width: '100%', height: '100%' }} />
    </Page>
  )
};
