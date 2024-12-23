export interface Heroe {
    id?: number,
    nombre: string,
    poder: string,
    universo: string,
    debilidad: string,
    urlImagen: string
}

export type Heroes = Heroe[];