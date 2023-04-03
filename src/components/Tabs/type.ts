import {TabsNames} from "src/utils/@globalTypes";


export type TabsType = {
  title: string;
  disabled: boolean;
  key: number;
};

export type TabsProps = {
  onClick: (key: TabsNames) => void;
  activeTab: TabsNames;
};
