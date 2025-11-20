import { ThreeDots } from "react-loader-spinner";
import './index.css'

export default function Loader() {
    return (
        <div className="loader-container">
            <ThreeDots
                height="50"
                width="50"
                color="#fff"
                visible={true}
                style={{with:"100%"}}
            />
        </div>
    );
}
