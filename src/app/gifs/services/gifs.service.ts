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

  buscarGifs( query: string) {
    this._historial.unshift( query );
    console.log(this._historial);
  }
}
