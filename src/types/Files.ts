

export type Oid = {
    $oid: string
}
export interface Files{
    _id?: Oid,
    file_name: string,
    file_type: string,
    file_location: string,
    size: number,
    aws_file_name: string,
    user_id?: string
}