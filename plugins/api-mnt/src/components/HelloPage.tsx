import React from 'react';
import { Content, Page, Header } from '@backstage/core-components';

export const HelloPage = () => (
  <Page themeId="tool">
    <Header title="Hello Plugin" subtitle="A simple standalone plugin" />
    <Content>
      <p>👋 Hello from your standalone Backstage plugin!</p>
    </Content>
  </Page>
);
