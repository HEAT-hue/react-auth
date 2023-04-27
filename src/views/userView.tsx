// jshint esversion:6
import { useGetUsersQuery, useAddNewDataMutation } from "../features/api";
import { useMemo } from "react";

function UserView() {

    /* const { data: users = [], isLoading, isSuccess, isError, error } = useGetUsersQuery(); */

    const response = useGetUsersQuery();

    const [addNewPost, metaData] = useAddNewDataMutation();

    const { data: users = [], isLoading, isSuccess, isError, error, refetch: refetchPosts, isFetching } = response;

    console.log("Meta data gotten");

    console.log(metaData);

    async function handlePostClick() {
        // POST REQUEST MADE HERE

        try {
            await addNewPost({ title: "New Post", body: "Some body to post on the server", userId: 23 }).unwrap();

            // Tags are invalidated already and all affected queries will be invalidated and refetched
            
        }
        catch (error) {
            console.log(`Failed to save post with err: ${error}`);
        }
    }


    // Sort users from server
    const sortedUsers = useMemo(() => {

        // Get new array to avoid mutation of original array from server
        const sortedUsers = users.slice();

        // Sort User object based on their names <string>
        sortedUsers.sort((a, b) => {
            if (a.name > b.name) return 1;

            if (a.name < b.name) return -1

            return 0
        });

        // Return sorted users from Array
        return sortedUsers;
    }, [users])

    return (
        <>
            <div className="flex gap-x-3 items-center justify-center">
                <h2 className="text-xl">List of users</h2>
                <button className="py-2 px-6 my-3 rounded-sm text-white bg-red-700 hover:bg-red-800 shadow-sm" onClick={handlePostClick}>Make POST</button>
            </div>
            {isLoading && <div>Loading data...</div>}
            {isError && <div>Error: {error.toString()}</div>}
            {isSuccess ? (
                <ul className={`${isFetching ? "text-red-200" : null}`}>
                    {sortedUsers.map((user: any) => {
                        return <li key={user.id}>{user.name}</li>
                    })}
                </ul>
            ) : null}
        </>
    )
}

export { UserView };