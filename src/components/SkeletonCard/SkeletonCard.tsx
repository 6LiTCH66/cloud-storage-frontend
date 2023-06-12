import React from 'react';
import "./skeletonCard.scss"
import {FcFolder} from "react-icons/fc";

function SkeletonCard() {
    return (
        <div  className="skeleton-card">

            <div className="skeleton-image_container">
                <div className="skeleton-image skeleton-box">
                </div>
            </div>

            <div className="skeleton-info skeleton-box">

            </div>
        </div>
    );
}

export default SkeletonCard;