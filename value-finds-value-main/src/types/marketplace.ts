export interface Challenge {
  title: string;
  organizer: string;
  description?: string;
  type: string[];
  deadline?: string;
  status?: string;
  reward?: number;
  contact?: string;
  industry?: string[];
}

export interface Startup {
  name: string;
  ecosystem: string;
  foundingYear: string;
  description?: string;
  industry?: string[];
}

export interface Apply {
  title: string;
  location: string;
  dates?: string;
  deadline?: string;
  funding?: string;
  equity?: string;
}
