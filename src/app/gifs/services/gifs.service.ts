import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //El guion bajo significa se exportara para su uso en otras clases, solo
  //es significado, no es como la palabra reservada export
  private _historial: string[] = [];
  
  get historial() : string[] {
    return [...this._historial];
  }

  buscarGifs( query: string = '') {
    
    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
      console.log(this._historial);
    }
  }
}
