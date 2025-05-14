export interface Script {
  id?: string;
  name: string;
  url: string;
  sourceUrl: string;
  description: string;
  command?: string; // Added command property for installation commands
}

export interface ScriptsData {
  scripts: Script[];
}