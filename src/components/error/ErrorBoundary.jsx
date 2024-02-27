import { Component } from "react";
import CommanButton from "../CommanButton";

export default class ErrorBoundary extends Component {
    state = { hasError: false }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }


    render() {
        if (this.state.hasError) {
            return (
                <div className="d-flex justify-content-center">
                    <h2>Something went wrong </h2>
                    <CommanButton onclick={()=>{window.location.reload()}} >Refresh</CommanButton>
                </div>
            )
        }
        return this.props.children;
    }
}