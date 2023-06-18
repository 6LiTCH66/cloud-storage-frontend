import { useQuery, useQueryClient } from 'react-query';
import {dashboard} from "../http/folderAPI";

export const useFolders = (parentFolderId: string | undefined) => {
    const queryClient = useQueryClient();
    const result =
        useQuery(
            ['folderDetails', parentFolderId],
            () => dashboard(parentFolderId),
            {
                onSuccess: (data) => {
                    data.forEach((subfolder) => {
                        if ("Folder" in subfolder){
                            queryClient.prefetchQuery(["folderDetails", subfolder.Folder._id.$oid], () => dashboard(subfolder.Folder._id.$oid))

                        }
                    })
                }});

    return result
}