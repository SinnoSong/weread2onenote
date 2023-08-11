export interface SettingTreeNode {
    name: string;
    id: string;
    children?: SettingTreeNode[];
}