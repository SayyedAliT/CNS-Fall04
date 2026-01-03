
export enum PresentationStep {
  INTRO = 'INTRO',
  PROBLEM = 'PROBLEM',
  DEFENSES = 'DEFENSES',
  PROPOSAL = 'PROPOSAL',
  EVALUATION = 'EVALUATION',
  DEMO = 'DEMO',
  CONCLUSION = 'CONCLUSION'
}

export interface LogEntry {
  id: string;
  timestamp: string;
  source: 'ATTACKER' | 'VICTIM' | 'SERVER';
  message: string;
  type: 'info' | 'error' | 'success' | 'warning' | 'critical';
  details?: string;
}

export interface SimulationStep {
  id: number;
  phase: string;
  description: string;
  hackerAction: string;
  victimAction: string;
  serverResponse: string;
  requestHeaders?: Record<string, string>;
  logs: LogEntry[];
}
