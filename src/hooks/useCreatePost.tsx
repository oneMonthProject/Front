import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreatePostForm} from "@/app/postRegister/_utils/type";
import {createPost as createPostAPI} from "@/service/post/post";
import {isEqual} from "lodash";
import {useRouter} from "next/navigation";
import {useResetRecoilState, useSetRecoilState} from "recoil";
import {snackbarState} from "@/store/CommonStateStore";
import {createPostStateStore, createProjectStateStore} from "@/store/register/RegisterPostStateStore";

export default function useCreatePost() {
    const resetPostFields = useResetRecoilState(createPostStateStore);
    const resetProjectFields = useResetRecoilState(createProjectStateStore);
    const queryClient = useQueryClient();
    const setSnackbar = useSetRecoilState(snackbarState);

    const router = useRouter();
    const {mutate: createPost, isPending} = useMutation({
        mutationFn: (createData: CreatePostForm) => createPostAPI(createData),
        onSuccess: async (data) => {
            const {message, result} = data;

            if (isEqual(result, "success")) {
                setSnackbar({show: true, type: "SUCCESS", content: message});
                resetPostFields();
                resetProjectFields();
                await queryClient.invalidateQueries({queryKey: ['postList']});
                await queryClient.invalidateQueries({queryKey: ['myProjectList']});
                router.push('/');
            } else {
                setSnackbar({show: true, type: "ERROR", content: message});
            }
        },
        onError: (err: unknown) => {
            setSnackbar({show: true, type: "ERROR", content: (err as Error).message});
        }
    });

    return {createPost, isCreating:isPending}
}