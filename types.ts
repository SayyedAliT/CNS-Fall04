
export enum PresentationStep {
  INTRO = 'INTRO',
  PROBLEM = 'PROBLEM',
  PROPOSAL = 'PROPOSAL',
  DEMO = 'DEMO',
  LIMITATIONS = 'LIMITATIONS',
  CONCLUSION = 'CONCLUSION'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  source: 'ATTACKER' | 'VICTIM' | 'SERVER';
  message: string;
  type: 'info' | 'error' | 'success' | 'warning' | 'critical';
}

export interface SimulationStep {
  id: number;
  phase: string;
  description: string;
  hackerAction: string;
  victimAction: string;
  serverResponse: string;
  requestHeaders?: Record<string, string>;
  flow: 'H2V' | 'V2S' | 'S2V'; // Hacker to Victim, Victim to Server, Server to Victim
  logs: LogEntry[];
}
