import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ destination = '/' }) => {
    return (
        <div>
            <Link to={ destination }>
                Back
            </Link>
        </div>
    )
}

export default BackButton;