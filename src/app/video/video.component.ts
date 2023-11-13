import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Video} from '../model/video';
import {VideoService} from '../services/video.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {ModalFromComponent} from './modal-from/modal-from.component';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule, MatMenuModule, CommonModule, MatDialogModule],
})
export class VideoComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'duration', 'size', 'quality', 'views', 'button'];
  dataSource = new MatTableDataSource<Video>();
  selection = new SelectionModel<Video>(true, []);

  constructor(private service: VideoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.service.getVideos().subscribe(
      res => {
        this.dataSource.data = res;
      }
    )

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openFormVideo(): void {
    const dialogRef = this.dialog.open(ModalFromComponent, {
      width: '700px',
      data: this.selection.selected,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
    });
  }
}
