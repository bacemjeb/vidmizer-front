import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {VideoComponent} from '../video.component';
import { CommonModule } from '@angular/common';
import {VideoService} from '../../services/video.service';
import {RapportService } from '../../services/rapport.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal-from',
  templateUrl: './modal-from.component.html',
  styleUrls: ['./modal-from.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule],
})
export class ModalFromComponent {

  constructor(
    public dialogRef: MatDialogRef<VideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service : VideoService,
    public rapportService: RapportService,
    private router : Router, 
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(event: any) {

    if(this.checkValue(event)) {
      let listVideo : any = []
      let name = '';
      this.data.forEach((item : any) => {

        item.views = Number(event.target['input' + item.id].value);
        this.service.updateVideo(item).subscribe((res) => (console.log(res)))
        listVideo.push(item['@id'])
        name = name + '-' + item.id   
      })

      let rapport = {
        name : 'rapport-encodage' + name,
        videos: listVideo
      }
      this.rapportService.postRapport(rapport).subscribe((res) => { 
       this.dialogRef.close();
       this.router.navigate(['/rapport/' + res.id]);
      })
    }
    
 }

 checkValue(event: any) {
  let result = true;
  this.data.forEach((item : any) => {
    if(result && event.target['input' + item.id].value > 0) {
      result = true;
    } else {
      result = false;
    }
  })
  return result;
 }
}
