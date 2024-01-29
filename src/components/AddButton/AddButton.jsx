import "./AddButton.css";

export default function AddButton({children, buttonHandler}){

    return(
        <button
        onClick={() => {buttonHandler(true)}}
        >
            {children}
        </button>
    )
}