import {Oid, Files} from "./Files";

export enum FolderType{
    Folder,
    Subfolder,
}

export interface Folder{
    _id: Oid,
    folder_name: string,
    user_id: Oid,
    files: Oid[] ,
    folders: Oid[],
    folder_type: FolderType,
    parent_id: Oid | null,
    createdAt: Date,
    updatedAt: Date,
    path: string
}

export type FileOrFolder = { File: Files } | { Folder: Folder };
