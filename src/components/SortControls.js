/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { IconCaretUp, IconCaretDown, IconCross1 } from "../icons";

function SortControls({ onSortChanged, isTagSelected, onTagChanged }) {
    let [active, setActive] = useState("desc");

    function handleDateClick(event, order) {
        event.preventDefault();
        onSortChanged(order);
        setActive(order);
    }

    return (
        <div className="sort-controls">
            {isTagSelected &&
                <div className="sort-control-reset-tag">
                    <a href="#" onClick={() => onTagChanged("all")}>
                        <IconCross1 />
                        Reset Tag
                    </a>
                </div>
            }
            <div className="sort-control-date">
                <a href="#" onClick={(e) => handleDateClick(e, "asc")} className={active === "asc" ? "active" : ""}><IconCaretUp /></a>
                <a href="#" onClick={(e) => handleDateClick(e, "desc")} className={active === "desc" ? "active" : ""}><IconCaretDown /></a>
            </div>
        </div>
    )
}

export default SortControls;