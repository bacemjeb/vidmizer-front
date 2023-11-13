import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Video} from '../model/video';
import {RapportService} from '../services/rapport.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {Rapport} from '../model/rapport';
import { Router } from '@angular/router';


@Component({
  selector: 'app-liste-rapport',
  templateUrl: './liste-rapport.component.html',
  styleUrls: ['./liste-rapport.component.css'],
  standalone: true,
  imports: [MatCheckboxModule, MatTableModule, MatButtonModule, MatTooltipModule, MatIconModule, MatMenuModule, CommonModule, MatDialogModule],
})
export class ListeRapportComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'video', 'videos', 'button'];
  dataSource = new MatTableDataSource<Rapport>();
  selection = new SelectionModel<Rapport>(true, []);

  constructor(private service: RapportService, public dialog: MatDialog, private router : Router,) {}

  ngOnInit() {
    this.service.getRapports().subscribe(
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

  onBtnClick(id: any) {
    this.router.navigate(['/rapport/' + id]);
  }

  generatePdf() {

  }

  generateCsv(){

  }

}
