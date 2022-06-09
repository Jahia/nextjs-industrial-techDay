import React from "react";
import {JahiaCtx} from "@jahia/nextjs-lib";
import * as PropTypes from "prop-types";
import classNames from "classnames";

function Animate({component,effect, offset, children, className, ...props}) {
    const {isEditMode} = React.useContext(JahiaCtx);
    const cmp = React.useRef(null);

    React.useEffect(() => {
        if (process.browser && !isEditMode && cmp.current) {
            import('waypoints/lib/noframework.waypoints.min').then(() => {
                const element = cmp.current
                new window.Waypoint({
                    element,
                    handler: direction => {
                        if (direction === 'down' && !element.className.includes('element-animated')) {
                            element.classList.add('item-animate');
                            setTimeout(() => {
                                element.classList.add(effect || 'fadeInUp', 'element-animated');
                                element.classList.remove('item-animate')
                            }, 100)
                        }
                    },
                    offset: offset || "95%"
                })
            })
        }
    },[cmp])

    const Component = component || 'div';
    return (
        <Component ref={cmp} className={classNames(className,"element-animate")} {...props}>
            {children}
        </Component>
    )
}


Animate.propTypes = {
    component: PropTypes.string,
    effect: PropTypes.string,
    offset: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
};
export default Animate;
