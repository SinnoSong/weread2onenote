import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SettingDataBase } from 'src/app/data-sources/setting-data-source';
import { SettingDynamicDataSource } from 'src/app/data-sources/setting-dynamic-data-source';
import { SettingTreeNode } from 'src/model/onenote/setting-tree-node';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(private database: SettingDataBase) {
    this.treeControl = new FlatTreeControl<SettingTreeNode>(this.getLevel, this.isExpandable);
    this.dataSource = new SettingDynamicDataSource(this.treeControl, database);
  }
  ngOnInit(): void {
    this.database.initialData().subscribe(data => {
      console.log(data);
      this.dataSource.data = data;
    });
  }

  treeControl: FlatTreeControl<SettingTreeNode>;

  dataSource: SettingDynamicDataSource;

  getLevel = (node: SettingTreeNode) => node.level;

  isExpandable = (node: SettingTreeNode) => node.expandable;

  hasChild = (_: number, _nodeData: SettingTreeNode) => _nodeData.expandable;
}
