import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const Recall = ({ recall }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className='recall-container'>
            <div className='recall-header' onClick={() => setIsExpanded(!isExpanded)}>
                <p className='recall-component'>{recall.Component}</p>
                <div className='recall-expand-or-collapse'>
                    <p>{isExpanded ? "Collapse" : "Expand"}</p>
                    {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>
            {isExpanded ?
                <div className='recall-body'>
                    <div className='recall-body-item'>
                        <p className='recall-body-title'>SUMMARY</p>
                        <p className='recall-body-text'>{recall.Summary}</p>
                    </div>
                    <div className='recall-body-item'>
                        <p className='recall-body-title'>CONSEQUENCE</p>
                        <p className='recall-body-text'>{recall.Consequence}</p>
                    </div>
                    <div className='recall-body-item'>
                        <p className='recall-body-title'>REMEDY</p>
                        <p className='recall-body-text'>{recall.Remedy}</p>
                    </div>
                    <div className='recall-notes-and-date'>
                        <div className='recall-body-item'>
                            <p className='recall-body-title'>NOTES</p>
                            <p className='recall-body-text'>{recall.Notes}</p>
                        </div>
                        <div className='recall-body-item'>
                            <p className='recall-body-title'>REPORT DATE</p>
                            <p className='recall-body-text'>{recall.ReportReceivedDate}</p>
                        </div>
                    </div>
                </div> : null}
        </div>
    )
}

export default Recall