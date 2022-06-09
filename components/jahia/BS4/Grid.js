import React, {useContext, useMemo} from "react";
import {JahiaCtx, MainResourceCtx} from "@jahia/nextjs-lib";
import {useQuery} from "@apollo/client";

// import {getJahiaDivsProps} from "../../../lib/utils";
import {queryGrid} from "./gqlQuery";
import * as PropTypes from "prop-types";

import Section from "./components/Section";
import Container from "./components/Container";
import Row from "./components/Row";

function BS4Grid({id}) {
    const {workspace, locale} = useContext(JahiaCtx);
    const mainResourcePath = React.useContext(MainResourceCtx);

    const {data, error, loading} = useQuery(queryGrid, {
        variables: {
            workspace,
            id,
            language: locale,
            mainResourcePath,
            isEditMode: true
        }
    });

    const grid = data?.jcr?.nodeById;
    // const divs = useMemo(() => !loading && getJahiaDivsProps(data.jcr?.nodeById?.renderedContent?.output), [data, loading]);

    if (loading) {
        return "loading";
    }
    if (error) {
        console.log(error);
        return <div>Error when loading ${JSON.stringify(error)}</div>
    }
    // console.log("[BS4Grid] grid : ",grid);
    const mixins = grid.mixins?.map(mixin => mixin.name) || [];

    return (
        <Section grid={grid} mixins={mixins}>
            <Container grid={grid} mixins={mixins}>
                <Row grid={grid} mixins={mixins}/>
            </Container>
        </Section>
    )

}

BS4Grid.propTypes = {
    id : PropTypes.string.isRequired,
};

export default BS4Grid;
