import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string = 'jqGUjwezl7VDxDe3cJU4wkS68Wz3Y7Eo';
  private servicioURL : string = 'https://api.giphy.com/v1/gifs';

  //El guion bajo significa se exportara para su uso en otras clases, solo
  //es significado, no es como la palabra reservada export
  private _historial: string[] = [];

  //TODO: Cambiar Any por su tipo correspondiente
  public resultados: Gif[] = [];
  
  get historial() : string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
    //OPCION 1
    // if( localStorage.getItem('historial') ) {
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    
    if( localStorage.getItem('ultimaBusqueda') ) {
      this.resultados = JSON.parse(localStorage.getItem('ultimaBusqueda')!);
    }
  }

  buscarGifs( query: string = '') {
    
    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);

      //Almacenamiento del historial en localStorage
      localStorage.setItem('historial', JSON.stringify( this._historial ));

      console.log(this._historial);
    }

    //Lista de parametos de la consulta a la API
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limir', '10')
      .set('q', query);

    /*
    Como params tiene el mismo nombre de que la propiedad 'params'. 
    */
    this.http.get<SearchGifsResponse>(`${ this.servicioURL }/search`, { params })
      .subscribe( ( resp ) => {
        console.log( resp )
        this.resultados = resp.data;

        //Almacenamiento local de la ultima busqueda realizada.
        localStorage.setItem('ultimaBusqueda', JSON.stringify(this.resultados));
      })
    
  }
}
