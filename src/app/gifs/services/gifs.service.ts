import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'jqGUjwezl7VDxDe3cJU4wkS68Wz3Y7Eo';

  //El guion bajo significa se exportara para su uso en otras clases, solo
  //es significado, no es como la palabra reservada export
  private _historial: string[] = [];

  //TODO: Cambiar Any por su tipo correspondiente
  public resultados: any[] = [];
  
  get historial() : string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {}

  buscarGifs( query: string = '') {
    
    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
      console.log(this._historial);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=jqGUjwezl7VDxDe3cJU4wkS68Wz3Y7Eo&q=${ query }&limit=20`)
      .subscribe( (resp: any) => {
        console.log( resp.data )
        this.resultados = resp.data;
      })
    
  }
}
