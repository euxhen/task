import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import {Row, Col} from 'antd'

class EventItemPopover extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        eventItem: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        statusColor: PropTypes.string.isRequired,
        subtitleGetter: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText:PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
    }

    render(){
        const {schedulerData, eventItem, title, startTime, endTime, statusColor,subtitleGetter, viewEventClick, viewEventText, viewEvent2Click, viewEvent2Text} = this.props;
        const {localeMoment, config} = schedulerData;
        let start = localeMoment(startTime), end = localeMoment(endTime);

        let subtitleRow = <div />;
        if(subtitleGetter !== undefined){
            let subtitle = subtitleGetter(schedulerData, eventItem);
            if(subtitle !== undefined){
                subtitleRow = (
                    <div className="row">
                        <div className="col-md-11">
                            <div />
                        </div>
                        <div className="col-md-1">
                            <span className="header2-text" title={subtitle}>{subtitle}</span>
                        </div>
                    </div>
                );
            }
        }

        let opsRow = <div />;
        if(viewEventText !== undefined && viewEventClick !== undefined && (eventItem.clickable1 === undefined || eventItem.clickable1)){
            let col = (
                <div className="col-md-11">
                    <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEventClick(schedulerData, eventItem);}}>{viewEventText}</span>
                </div>
            );
            if(viewEvent2Text !== undefined && viewEvent2Click !== undefined && (eventItem.clickable2 === undefined || eventItem.clickable2)) {
                col = (
                    <div className="col-md-11">
                        <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEventClick(schedulerData, eventItem);}}>{viewEventText}</span><span className="header2-text" style={{color: '#108EE9', cursor: 'pointer', marginLeft: '16px'}} onClick={() => {viewEvent2Click(schedulerData, eventItem);}}>{viewEvent2Text}</span>
                    </div>
                )
            };
            opsRow = (
                <div className="row">
                    <div className="col-md-1">
                        <div />
                    </div>
                    {col}
                </div>
            );
        }
        else if(viewEvent2Text !== undefined && viewEvent2Click !== undefined && (eventItem.clickable2 === undefined || eventItem.clickable2)) {
            let col = (
                <div className="col-md-11">
                    <span className="header2-text" style={{color: '#108EE9', cursor: 'pointer'}} onClick={() => {viewEvent2Click(schedulerData, eventItem);}}>{viewEvent2Text}</span>
                </div>
            );
            opsRow = (
                <div className="row">
                    <div className="col-md-1">
                        <div />
                    </div>
                    {col}
                </div>
            );
        }

        let dateFormat = config.eventItemPopoverDateFormat;
        return (
            <div style={{width: '300px'}}>
                <div className="row">
                    <div className="col-md-1">
                        <div className="status-dot" style={{backgroundColor: statusColor}} />
                    </div>
                    <div className="col-md-11">
                        <span className="header2-text" title={title}>{title}</span>
                    </div>
                </div>
                {subtitleRow}
                <div className="row">
                    <div className="col-md-1">
                        <div />
                    </div>
                    <div className="col-md-11">
                        <span className="header1-text">{start.format('HH:mm')}</span><span className="help-text" style={{marginLeft: '8px'}}>{start.format(dateFormat)}</span><span className="header2-text"  style={{marginLeft: '8px'}}>-</span><span className="header1-text" style={{marginLeft: '8px'}}>{end.format('HH:mm')}</span><span className="help-text" style={{marginLeft: '8px'}}>{end.format(dateFormat)}</span>
                    </div>
                </div>
                {opsRow}
            </div>
        );
    }
}

export default EventItemPopover