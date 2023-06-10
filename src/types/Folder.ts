import {Files, Oid} from "./Files";


export interface Folder{
    folder_name: string,
    files: Files[] ,
    folders: Folder[]
}