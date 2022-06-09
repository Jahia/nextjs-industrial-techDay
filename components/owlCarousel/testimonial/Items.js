import React from 'react';
import Item from "./Item";
import {JahiaCtx,JahiaModuleTag} from "@jahia/nextjs-lib";
import * as PropTypes from "prop-types";

function TestimonialItems({nodes}) {
    const {isEditMode} = React.useContext(JahiaCtx);

    const getItems = () => {
        if(isEditMode){
            return (
                nodes.map(item => (
                    <JahiaModuleTag key={item.uuid} path={item.path} nodetypes={[item.primaryNodeType.name]}>
                        <Item
                            key={item.uuid}
                            id={item.uuid}/>
                    </JahiaModuleTag>
                ))
            )
        }
        return (
            nodes.map(item => (
                <Item
                    key={item.uuid}
                    id={item.uuid}/>
            ))
        )
    }

    return getItems();
}

TestimonialItems.propTypes = {
    nodes : PropTypes.array.isRequired
};

export default TestimonialItems;
