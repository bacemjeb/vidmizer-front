import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Video} from '../model/video';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  url = environment.apiHost;

  constructor(private http: HttpClient,) {

   }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.url + '/videos')
    .pipe<Video[]>(map((data: any) => data['hydra:member']));
  }

  updateVideo(video: Video): Observable<Video[]> {
    return this.http.patch<Video[]>(this.url + '/videos/' + video.id, {views: video.views});
  }
}
