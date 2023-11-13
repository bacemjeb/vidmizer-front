import { Component, OnInit } from '@angular/core';
import {Rapport} from '../model/rapport';
import {RapportService} from '../services/rapport.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {VideoService} from '../services/video.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RapportComponent implements OnInit {
  rapport: any;
  id: string = "";
  nbrFolder: Number = 0;
  sizeTotal: Number = 0;

  constructor(private service: RapportService, private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!
    this.service.getRapport(this.id).subscribe(
      res => {
        this.rapport = res;
        this.nbrFolder = this.rapport.videos[0].folders.length
      }
    )
  }

  sortArray(array: any[]) {
    return  array.sort((a, b) => a.uid - b.uid)
  }

  changeName(e: any, index: any, item: any) {
    this.rapport.videos[index].name = e
    this.updateData(item)
  }

  changeQuality(e: any, index: any, item: any) {
    this.rapport.videos[index].quality = e
    this.updateData(item)
  }

  changeSize(e: any, index: any, item: any) {
    this.rapport.videos[index].size = e
    this.updateData(item)
  }

  changeViews(e: any, index: any, item: any) {
    this.rapport.videos[index].views = e
    this.updateData(item)
  }

  updateData(item: any) {
    const data = item
    data.folders = data.folders.map(function(a: any) {return a['@id'];})
    data.encoders = data.encoders.map(function(a: any) {return a['@id'];})
    this.videoService.editeVideo(data).subscribe((ress) => {
      console.log(ress)
      this.service.getRapport(this.id).subscribe(
        res => {
          this.rapport = res;
          this.nbrFolder = this.rapport.videos[0].folders.length
        }
      )
    }
    )
  }
}
