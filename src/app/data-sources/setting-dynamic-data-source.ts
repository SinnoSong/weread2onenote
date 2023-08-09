import { SettingTreeNode } from "src/model/onenote/setting-tree-node";
import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SettingDataBase } from "./setting-data-source";
import { BehaviorSubject, Observable, map, merge } from "rxjs";

export class SettingDynamicDataSource implements DataSource<SettingTreeNode>{
    dataChange = new BehaviorSubject<SettingTreeNode[]>([]);
    get data(): SettingTreeNode[] {
        return this.dataChange.value;
    }
    set data(value: SettingTreeNode[]) {
        this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(
        private _treeControl: FlatTreeControl<SettingTreeNode>,
        private _database: SettingDataBase
    ) {

    }
    connect(collectionViewer: CollectionViewer): Observable<SettingTreeNode[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if ((change as SelectionChange<SettingTreeNode>).added ||
                (change as SelectionChange<SettingTreeNode>).removed) {
                this.handleTreeControl(change as SelectionChange<SettingTreeNode>);
            }
        });
        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
    }
    disconnect(collectionViewer: CollectionViewer): void {
    }

    handleTreeControl(change: SelectionChange<SettingTreeNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed
                .slice()
                .reverse()
                .forEach(node => this.toggleNode(node, false));
        }
    }
    toggleNode(node: SettingTreeNode, expand: boolean) {
        const children = this._database.getSection(node.id);
        const index = this.data.indexOf(node);
        if (!children || index < 0) {
            return;
        }

        node.isLoading = true;

        setTimeout(() => {
            if (expand) {
                children.subscribe(nodes => {
                    this.data.splice(index + 1, 0, ...nodes);
                })
            } else {
                let count = 0;
                for (
                    let i = index + 1;
                    i < this.data.length && this.data[i].level > node.level;
                    i++, count++
                ) { }
                this.data.splice(index + 1, count);
            }

            // notify the change
            this.dataChange.next(this.data);
            node.isLoading = false;
        }, 1000);
    }

}