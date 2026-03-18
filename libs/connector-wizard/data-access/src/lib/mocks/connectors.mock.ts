import { ConnectorOption } from '@nx-frontend-showcase/connector-wizard/model';

export type { ConnectorOption } from '@nx-frontend-showcase/connector-wizard/model';

export const MOCK_CONNECTORS: ConnectorOption[] = [
  { id: 'google-drive', title: 'Google Drive', description: 'Scan files and permissions' },
  { id: 'slack', title: 'Slack', description: 'Scan channels and workspace metadata' },
  { id: 'jira', title: 'Jira', description: 'Scan projects and issues' },
];
