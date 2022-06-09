import React from 'react';
import {JahiaCtx} from "@jahia/nextjs-lib";
import classNames from "classnames";
import styles from "./halfBlock.module.css";
import * as PropTypes from "prop-types";
import {getImageURI} from "../jahia/utils";
import Animate from "../Animate";

function Image({path}) {
    const {workspace} = React.useContext(JahiaCtx);
    const imageUri = getImageURI({uri: path, workspace})

    return (
        <Animate
            component="div"
            className={classNames("image-display", styles.image)}
            effect="fadeIn"
            style={{backgroundImage: `url('${imageUri}')`}}
        />

    )
}

Image.propTypes = {
    path: PropTypes.string
};

export default Image;
