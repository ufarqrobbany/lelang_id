import "./style.css";

function LoadingRing(props) {
    return (
        <div className="lds-ring" style={{ width: props.width, aspectRatio: "1/1" }}>
            <div style={{ width: props.width, aspectRatio: "1/1" }}></div>
            <div style={{ width: props.width, aspectRatio: "1/1" }}></div>
            <div style={{ width: props.width, aspectRatio: "1/1" }}></div>
            <div style={{ width: props.width, aspectRatio: "1/1" }}></div>
        </div>
    );
}

export default LoadingRing;