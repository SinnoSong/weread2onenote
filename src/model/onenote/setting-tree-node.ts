export class SettingTreeNode {
    constructor(
        public name: string,
        public id: string,
        public level: number = 1,
        public isSection: boolean = false,
        public expandable: boolean = false,
        public isLoading: boolean = false
    ) {
    }
}