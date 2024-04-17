import {useMutation} from "@tanstack/react-query";
import {CreatePostForm} from "@/app/register/_utils/type";
import {createPost as createPostAPI} from "@/service/post/post";
import {isEqual} from "lodash";
import {useRouter} from "next/navigation";
import {useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";

export default function useCreatePost() {
    const setSnackbar = useSetRecoilState(snackbarState);

    const router = useRouter();
    const {mutate: createPost} = useMutation({
        mutationFn: (createData: CreatePostForm) => createPostAPI(createData),
        onSuccess: (data) => {
            const {message, result} = data;

            if (isEqual(result, "success")) {
                setSnackbar({show: true, type: "SUCCESS", content: message});
                queryClient.invalidateQueries({queryKey: ['postList']});
                queryClient.invalidateQueries({queryKey: ['myProjectList']});
                router.push('/');
            } else {
                setSnackbar({show: true, type: "ERROR", content: message});
            }
        },
        onError: (err: unknown) => {
            setSnackbar({show: true, type: "ERROR", content: (err as Error).message});
        }
    });

    return {createPost}
}