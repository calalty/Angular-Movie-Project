import { HttpEvent, HttpRequest, HttpResponse, HttpBackend } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export class MockXHRBackend implements HttpBackend {
  private mediaItems = [
        {
          id: 1,
          name: "Avengers",
          medium: "Movie",
          genre: "Action",
          year: 2012,
          watchedOn: 120416656284,
          isFave: false,
        },
        {
          id: 2,
          name: "Thor",
          medium: "Movie",
          genre: "Action",
          year: 2011,
          isFave: false,
        },
        {
          id: 3,
          name: "Iron Man",
          medium: "Movie",
          genre: "Action",
          year: 2008,
          isFave: false,
        },
        {
          id: 4,
          name: "Loki",
          medium: "Series",
          genre: "Action",
          year: 2021,
          watchedOn: 120416651281,
          isFave: false,
        },
        {
          id: 5,
          name: "Doctor Strange",
          medium: "Movie",
          genre: "Mystery",
          year: 2018,
          watchedOn: 120416651281,
          isFave: false,
        },
        {
          id: 5,
          name: "WandaVision",
          medium: "Series",
          genre: "Science Fiction",
          year: 2021,
          watchedOn: 120416651281,
          isFave: false,
        },
      ];

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((responseObserver: Observer<HttpResponse<any>>) => {
      let responseOptions;
      switch (request.method) {
        case 'GET':
          if (request.urlWithParams.indexOf('mediaItems?medium=') >= 0 || request.url === 'mediaitems') {
            let medium;
            if (request.urlWithParams.indexOf('?') >= 0) {
              medium = request.urlWithParams.split('=')[1];
              if (medium === 'undefined') { medium = ''; }
            }
            let mediaItems;
            if (medium) {
              mediaItems = this.mediaItems.filter(i => i.medium === medium);
            } else {
              mediaItems = this.mediaItems;
            }
            responseOptions = {
              body: {mediaItems: JSON.parse(JSON.stringify(mediaItems))},
              status: 200
            };
          } else {
            let mediaItems;
            const idToFind = parseInt(request.url.split('/')[1], 10);
            mediaItems = this.mediaItems.filter(i => i.id === idToFind);
            responseOptions = {
              body: JSON.parse(JSON.stringify(mediaItems[0])),
              status: 200
            };
          }
          break;
        case 'POST':
          const mediaItem = request.body;
          mediaItem.id = this._getNewId();
          this.mediaItems.push(mediaItem);
          responseOptions = {status: 201};
          break;
        case 'DELETE':
          const id = parseInt(request.url.split('/')[1], 10);
          this._deleteMediaItem(id);
          responseOptions = {status: 200};
      }

      const responseObject = new HttpResponse(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => {
      };
    });
  }

  _deleteMediaItem(id) {
    const mediaItem = this.mediaItems.find(i => i.id === id);
    const index = this.mediaItems.indexOf(mediaItem);
    if (index >= 0) {
      this.mediaItems.splice(index, 1);
    }
  }

  _getNewId() {
    if (this.mediaItems.length > 0) {
      return Math.max.apply(Math, this.mediaItems.map(mediaItem => mediaItem.id)) + 1;
    } else {
      return 1;
    }
  }
}