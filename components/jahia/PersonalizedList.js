import React, {useContext} from 'react';
import {JahiaCtx} from "@jahia/nextjs-lib";
import * as PropTypes from "prop-types";
import {PersonalizedContentLive} from "./PersonalizedContentLive";
import {ContentList} from "./ContentList";

export function PersonalizedList(props) {
    const {isEditMode} = useContext(JahiaCtx);

    return isEditMode ? (
        <>
            <div>Personalized list</div>
            <ContentList {...props}/>
        </>
    ) : (
        <PersonalizedContentLive isFirstOnly={false} {...props}/>
    )
}

PersonalizedList.propTypes = {
    id: PropTypes.string.isRequired,
}

