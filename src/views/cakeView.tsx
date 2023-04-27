// jshint esversion:6
import { useAppSelector, useAppDispatch } from "../hooks";
import { cakeActions } from "../features";

function CakeView() {
    const dispatch = useAppDispatch();
    const { numOfCakes } = useAppSelector((store) => store.cake);

    return (
        <div className="mb-5">
            <h2 className="font-bold text-2xl mb-5">Number of cakes - {numOfCakes} </h2>
            <div className="flex justify-center gap-x-3">
                <button className="py-2 px-5 bg-green-800 text-white font-bold rounded cursor-pointer hover:bg-green-900" onClick={() => dispatch(cakeActions.ordered())}>Order cake</button>
                <button className="py-2 px-5 bg-orange-600 text-white font-bold rounded cursor-pointer hover:bg-orange-800" onClick={() => dispatch(cakeActions.restocked({qty: 20}))}>Restock cakes</button>
            </div>
        </div>
    );
}

export { CakeView }