import {Injectable} from '@angular/core';

@Injectable()
export class MenuService {
  public upToDate: boolean = false;

  public update() {
    let definitions = JSON.parse(localStorage.getItem('definitions'));
    for (let endpoint in definitions) {
      for (let property in definitions[endpoint].properties) {
        definitions[endpoint].properties[property].title = property.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
    }
    localStorage.setItem('definitions', JSON.stringify(definitions));


  }

}
