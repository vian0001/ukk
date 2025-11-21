export interface Step {
  id: string;
  title: string;
  content: string;
  command?: string;
  warning?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  steps: Step[];
}

export interface RouterConfig {
  name: string;
  ssid: string;
  pass: string;
  ip: string;
  role: 'Core' | 'Zone';
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  TOPOLOGY = 'TOPOLOGY',
  MODULE_1 = 'MODULE_1',
  MODULE_2 = 'MODULE_2',
  MODULE_3 = 'MODULE_3',
  MODULE_4 = 'MODULE_4',
  CHAT = 'CHAT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}