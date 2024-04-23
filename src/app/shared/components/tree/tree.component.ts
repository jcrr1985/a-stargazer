import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { NGXLogger } from 'ngx-logger';

export interface NeosTreeNode {
  name?: string;
  nameTranslateKey?: string;
  icon?: string;
  callback?: Function;
  children?: NeosTreeNode[];
}

/** Flat node with expandable and level information */
interface FlatNode {
  isExpandable: boolean;
  isEmptyParent: boolean;
  name: string;
  icon: string | null;
  callback: Function | null;
  level: number;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input() treeData: NeosTreeNode[] = [];
  @Input() isPanelMode: boolean = false;
  @Input() showControls: boolean = false;

  constructor(private readonly logger: NGXLogger) {}

  ngOnInit() {
    this.dataSource.data = this.treeData;
  }

  handleNodeClick(node: FlatNode, callback?: Function): void {
    this.logger.info(`Executing tree action on ${node.name}`);
    if (callback) {
      callback();
    }
  }

  private _transformer = (node: NeosTreeNode, level: number) => {
    return {
      isExpandable: !!node.children && node.children.length > 0,
      isEmptyParent: !!node.children && node.children.length === 0,
      name: node.nameTranslateKey ?? node.name!,
      icon: node.icon ?? null,
      callback: node.callback ?? null,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.isExpandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.isExpandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FlatNode) => node.isExpandable;
  isEmpty = (_: number, node: FlatNode) => node.isEmptyParent;
}
