import React, {useContext} from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import { CORE_NODE_FIELDS } from '../../GQL/fragments';
import * as PropTypes from "prop-types";


function Pdf({id,defaultImageSize,imageSizes,referenceView}) {
    const {workspace} = useContext(JahiaCtx);

    const queryWidenPdf = gql`query (
        $workspace:Workspace!,
        $id: String!
    ){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid:$id) {
                ...CoreNodeFields
                templatedUrl:property(name:"wden:templatedUrl"){
                    value
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(queryWidenPdf, {
        variables: {
            workspace,
            id
        }
    });

    const imageNode = data?.jcr?.nodeById;

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }
    console.log("[Pdf] imageNode : ",imageNode);

    const url = imageNode.templatedUrl?.value.replace("{scale}",1).replace("{quality}",72);

    return(
        <img
            src={url.replace('{size}', defaultImageSize)}
            width="100%"
            srcSet={imageSizes.map(width => (`${url.replace('{size}', width)} ${width}w`) ).toString()}
            // sizes="${sizes}"
            // className="${class}"
            alt={imageNode.name}
        />
    )
}

Pdf.propTypes = {
    id : PropTypes.string.isRequired,
    defaultImageSize: PropTypes.number,
    imageSizes: PropTypes.array,
    referenceView:PropTypes.string
};

Pdf.defaultProps = {
    defaultImageSize:500,
    imageSizes:[256,512,768,1280]
}

export default Pdf;
