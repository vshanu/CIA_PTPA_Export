import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return args ?
      value.filter((player, index) => {
        if(player.playerNombres.toLowerCase().indexOf(args.toLowerCase())!=-1)
        {
          return true;
        }
      })
      : value;
  }

}
