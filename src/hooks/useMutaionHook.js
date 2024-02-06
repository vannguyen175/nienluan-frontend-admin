import { useMutation } from "@tanstack/react-query";

export const useMutationHook = (fnCallBack) => {
    // mutationFn: (data) => {
    //     return UserService.loginUser(data);
    // };
    const mutation = useMutation({
        mutationFn: fnCallBack,
    });

    return mutation;
};
