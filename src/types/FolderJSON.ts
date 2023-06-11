import {Files, Oid} from "./Files";



export interface FolderJSON {
    folder_name: string,
    files: Files[] ,
    folders: FolderJSON[]
}

