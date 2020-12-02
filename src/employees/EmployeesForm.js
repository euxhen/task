import React, { Component } from 'react';
import { DialogFormSmall, closeModal } from '../common/modal';
import { InputControl } from '../common/form';
import { Employees } from './';

export default class EmployeesForm extends Component {
    state = {
        open: true,
        values: {},
        totalEmailInputs: [1],
        totalPhoneInputs: [1]
    };


    rules = () => Employees.schemaFields();

    async componentDidMount() {
        this.model = await Employees.load(this.props.match.params.id);

        this.setState({
            values: this.model.data()
        });
    }

    saveForm = values => {
        this.model.save(values).then(result => {
            closeModal(this, values);
        });
    };
 
    addEmailInput = ()=>{
        this.setState({
            totalEmailInputs: [...this.state.totalEmailInputs,1]
        })
    }
    substractEmailInput = ()=>{
        if(this.state.totalEmailInputs.length === 1) return;
        this.setState({
            totalEmailInputs: this.state.totalEmailInputs.slice(0, this.state.totalEmailInputs.length -1)
        })
    }
    addPhoneInput = ()=>{
        this.setState({
            totalPhoneInputs: [...this.state.totalPhoneInputs,1]
        })
    }
    substractPhoneInput = ()=>{
        if(this.state.totalPhoneInputs.length === 1) return;
        this.setState({
            totalPhoneInputs: this.state.totalPhoneInputs.slice(0, this.state.totalPhoneInputs.length -1)
        })
    }


    onClose = () => {
        closeModal(this);
    };

    onFormValues = values => {
        this.setState({ values });
    };

    onFormErrors = errors => {
        this.setState({ errors });
    };

    render() {
        return (
            <DialogFormSmall
                openDialog={this.state.open}
                title={Employees.resource()}
                rules={this.rules()}
                values={this.state.values}
                errors={this.state.errors}
                onValues={this.onFormValues}
                onErrors={this.onFormErrors}
                onSave={this.saveForm}
                onCancel={this.onClose}
            >
                <div className="row">
                    <InputControl name="name" />
                </div>
                <div className="row">
                    <InputControl name="position" />
                </div>
                <div className="row">
                    <InputControl name="birthday" />
                </div>
                <div className="row">
                    {
                        this.state.totalEmailInputs.map((e,i)=>{
                            return <InputControl name="email" label="Contact Email" />
                        })
                    }
                    
                    <div className="small-btn float-right">
                        <button onClick={this.substractEmailInput} type="button" className="btn btn-link">
                            -
                        </button>
                        <button onClick={this.addEmailInput} type="button" className="btn btn-link">
                            +
                        </button>
                    </div>
                </div>
                <div className="row">
                {
                        this.state.totalPhoneInputs.map((e,i)=>{
                            return <InputControl name="phone" label="Contact Phone" />
                        })
                    }
                    <div className="small-btn float-right">
                        <button onClick={this.substractPhoneInput} type="button" className="btn btn-link">
                            -
                        </button>
                        <button onClick={this.addPhoneInput} type="button" className="btn btn-link">
                            +
                        </button>
                    </div>
                </div>
            </DialogFormSmall>
        );
    }
}
