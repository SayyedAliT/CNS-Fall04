
export enum Section {
  Introduction = 'intro',
  Problem = 'problem',
  LoginCSRF = 'login-csrf',
  Experiment = 'experiment',
  Defenses = 'defenses',
  Proposal = 'proposal',
  Simulation = 'simulation',
  Limitations = 'limitations'
}

export interface PaperInfo {
  title: string;
  authors: string[];
  institution: string;
  conference: string;
  year: number;
}
