import React from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import {gql, useQuery} from "@apollo/client";
import * as PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import {getImageURI} from "./jahia/utils";
import { CORE_NODE_FIELDS } from './jahia/GQL/fragments';
import Animate from "./Animate";

//TODO use xss to clean body
function Hero({id}) {
    const {workspace, locale,} = React.useContext(JahiaCtx);

    const getContent = gql`query($workspace: Workspace!, $id: String!,$language:String!){
        jcr(workspace: $workspace) {
            workspace
            nodeById(uuid: $id) {
                ...CoreNodeFields
                body: property(language:$language, name:"body"){value}
                media: property(language:$language,name:"mediaNode",){
                    node: refNode {
                        ...CoreNodeFields
                    }
                }
            }
        }
    }
    ${CORE_NODE_FIELDS}`;

    const {data, error, loading} = useQuery(getContent, {
        variables: {
            workspace,
            id,
            language: locale,
        }
    });

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }

    const content = data?.jcr?.nodeById;
    const uri = getImageURI({uri: content.media?.node?.path, workspace});

    return (

        <div className="inner-page">
            <div
                className="slider-item"
                style={{backgroundImage: `url('${uri}')`}}
            >
                <Container>
                    <Row className="slider-text align-items-center justify-content-center">
                        <Col
                            id={content.uuid}
                            sm={12}
                            md={8}
                            className="text-center pt-5"
                        >
                            <Animate dangerouslySetInnerHTML={{__html: content.body?.value || 'no body'}}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

Hero.propTypes = {
    id: PropTypes.string.isRequired
};
export default Hero;
