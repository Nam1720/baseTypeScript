export interface EditorModel {
  content: string;
  change?: (target: string) => void;
}
