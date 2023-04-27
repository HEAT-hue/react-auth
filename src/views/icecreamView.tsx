// jshint esversion:6
import { useAppSelector, useAppDispatch } from "../hooks";
import { icecreamActions } from "../features";


function IcecreamView() {
    const dispatch = useAppDispatch();
    const { numOfIcecreams } = useAppSelector((store) => store.icecream);

    return (
        <div className="my-9">
            <h2 className="font-bold text-2xl mb-5">Number of Icecreams - {numOfIcecreams}</h2>
            <div className="flex justify-center gap-x-3">
                <button className="py-2 px-5 bg-green-800 text-white font-bold rounded cursor-pointer hover:bg-green-900" onClick={() => dispatch(icecreamActions.ordered())}>Order icecream</button>
                <button className="py-2 px-5 bg-blue-600 text-white font-bold rounded cursor-pointer hover:bg-blue-800" onClick={() => dispatch(icecreamActions.restocked({ qty: 30 }))}>Restock icecream</button>
            </div>
        </div>
    );
}

export { IcecreamView }