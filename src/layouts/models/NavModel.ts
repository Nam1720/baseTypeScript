export interface NavItem {
  name: string;
  url: string;
  icon?: JSX.Element | string;
  children?: Array<any>;
  id?: number;
}
