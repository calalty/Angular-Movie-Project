import { Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'genreList'
})
export class CategoryListPipe implements PipeTransform {
    transform(mediaItems) {
        const genres = [];
        mediaItems.forEach(mediaItem => {
            if (genres.indexOf(mediaItem.genre) <= -1) {
                genres.push(mediaItem.genre);
            }
        });
        return genres.join(', ');
    }
}