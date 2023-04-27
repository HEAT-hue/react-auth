import { CakeView, IcecreamView, UserView } from "./views"
import { useGetUserByIdQuery } from "./features/api"

export default function App() {

  const { data: User, isLoading, isSuccess, isError, error } = useGetUserByIdQuery(6);

  return (
    <div className="text-center pt-7">
      <div className="my-3 text-2xl">
        <span className="font-bold">Current User: {" "}</span>
        {isLoading && <span>Loading User....</span>}
        {isError && <span>{error.toString()}</span>}
        {isSuccess && <span>{User.name}</span>}
      </div>
      <CakeView />
      <IcecreamView />
      <UserView />
    </div>
  )
}