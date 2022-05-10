import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { AutoComplete } from 'primereact/autocomplete';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './List.css';

import { AssesmentsService } from '../services/AssesmentsService';
import { QuestionsService } from '../services/QuestionsService';
import { AssesmentQuestionsService } from '../services/AssesmentQuestionsService';

export class AssesmentQuestions extends Component {
    emptyEntity = {
        id: 0,
        assesmentId: 0,
        assesment: {
            id: 0,
            title: null
        },
        questionId: 0,
        question: {
            id: 0,
            questionText: null
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            entities: null,
            entity: this.emptyEntity,

            editorDialog: false,
            deleteEntityDialog: false,

            submitted: false,

            globalFilter: null,

            assesments: null,
            filteredAssesments: null,

            questions: null,
            filteredQuestions: null
        };

        this.entityService = new AssesmentQuestionsService();

        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.newEntity = this.newEntity.bind(this);
        this.editEntity = this.editEntity.bind(this);
        this.saveEntity = this.saveEntity.bind(this);
        this.hideEditorDialog = this.hideEditorDialog.bind(this);

        this.confirmDeleteEntity = this.confirmDeleteEntity.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
        this.hideDeleteEntityDialog = this.hideDeleteEntityDialog.bind(this);

        this.assesmentsService = new AssesmentsService();
        this.questionsService = new QuestionsService();
    }

    componentDidMount() {
        this.entityService.getAll()
            .then(data => this.setState({ entities: data }));

        this.assesmentsService.getAll()
            .then(data => this.setState({ assesments: data }));

        this.questionsService.getAll()
            .then(data => this.setState({ questions: data }));
    }

    // New/Edit

    newEntity() {
        this.setState({
            entity: this.emptyEntity,
            submitted: false,
            editorDialog: true
        });
    }

    editEntity(entity) {
        this.setState({
            entity: { ...entity },
            submitted: false,
            editorDialog: true
        });
    }

    searchQuestion = (e) => {
        setTimeout(() => {
            let filteredQuestions;
            if (!e.query.trim().length) {
                filteredQuestions = [...this.state.questions];
            }
            else {
                filteredQuestions = this.state.questions.filter((cls) => {
                    return cls.description.toLowerCase().startsWith(e.query.toLowerCase());
                });
            }

            this.setState({
                filteredQuestions: filteredQuestions
            });
        }, 250);
    }

    searchAssesment = (e) => {
        setTimeout(() => {
            let filteredAssesments;
            if (!e.query.trim().length) {
                filteredAssesments = [...this.state.assesments];
            }
            else {
                filteredAssesments = this.state.assesments.filter((cls) => {
                    return cls.description.toLowerCase().startsWith(e.query.toLowerCase());
                });
            }

            this.setState({
                filteredAssesments: filteredAssesments
            });
        }, 250);
    }

    onInputChange = (e, field) => {
        const val = (e.target && e.target.value) || '';
        let _entity = { ...this.state.entity };
        _entity[`${field}`] = val;

        this.setState({
            entity: { ..._entity }
        });
    }

    onSelectChange = (e, lookupField, field) => {
        const val = (e.target && e.target.value) || '';
        let _entity = { ...this.state.entity };
        _entity[`${lookupField}`] = val;

        _entity[`${field}`] = val.id;

        this.setState({
            entity: { ..._entity }
        });
    }

    validateEntity(entity) {
        return entity.questionId &&  entity.assesmentId;
    }

    saveEntity() {
        this.setState({ submitted: true });

        let entity = { ...this.state.entity };

        if (this.validateEntity(entity)) {
            if (entity.id) {
                this.entityService.update(entity)
                    .then(() => this.entityService.getAll()
                        .then(data => this.setState({ entities: data, submitted: false, editorDialog: false, entity: this.emptyEntity })));

                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η εγγραφή ενημερώθηκε!', life: 3000 });
            }
            else {
                this.entityService.insert(entity)
                    .then(() => this.entityService.getAll()
                        .then(data => this.setState({ entities: data, submitted: false, editorDialog: false, entity: this.emptyEntity })));

                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η εγγραφή δημιουργήθηκε!', life: 3000 });
            }
        }
    }

    hideEditorDialog() {
        this.setState({
            submitted: false,
            editorDialog: false
        });
    }

    // Delete

    confirmDeleteEntity(entity) {
        this.setState({
            entity,
            deleteEntityDialog: true
        });
    }

    deleteEntity() {
        let entity = { ...this.state.entity };

        this.entityService.delete(entity)
            .then(() => this.entityService.getAll()
                .then(data => this.setState({ entities: data, deleteEntityDialog: false, entity: this.emptyEntity })));

        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η εγγραφή διαγράφηκε!', life: 3000 });
    }

    hideDeleteEntityDialog() {
        this.setState({ deleteEntityDialog: false });
    }

    leftToolbarTemplate() {
        return (
            <React.Fragment>
                <Button label="Νέο" icon="pi pi-plus" className="p-button-success mr-2" onClick={this.newEntity} />
            </React.Fragment>
        )
    }

    actionBodyTemplate(rowData) {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => this.editEntity(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => this.confirmDeleteEntity(rowData)} />
            </React.Fragment>
        );
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="mx-0 my-1">Διαχείριση Ερώτησης Κουίζ</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => this.setState({ globalFilter: e.target.value })} placeholder="Αναζήτηση..." />
                </span>
            </div>
        );

        const editorDialogFooter = (
            <React.Fragment>
                <Button label="Άκυρο" icon="pi pi-times" className="p-button-text" onClick={this.hideEditorDialog} />
                <Button label="Αποθήκευση" icon="pi pi-check" className="p-button-text" onClick={this.saveEntity} />
            </React.Fragment>
        );

        const deleteEntityDialogFooter = (
            <React.Fragment>
                <Button label="Όχι" icon="pi pi-times" className="p-button-text" onClick={this.hideDeleteEntityDialog} />
                <Button label="Ναι" icon="pi pi-check" className="p-button-text" onClick={this.deleteEntity} />
            </React.Fragment>
        );

        return (
            <div className="datatable-squize">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <Toolbar className="mb-4" left={this.leftToolbarTemplate}></Toolbar>

                    <DataTable ref={(el) => this.dt = el} value={this.state.entities} 
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Προβολή {first} μέχρι {last} από {totalRecords} εγγραφές"
                        globalFilter={this.state.globalFilter} header={header} responsiveLayout="scroll">
                        <Column field="assesment.title" header="Κουίζ" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="question.questionText" header="Ερώτηση" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.editorDialog} style={{ width: '450px' }} header="Στοιχεία Κουίζ" modal className="p-fluid" footer={editorDialogFooter} onHide={this.hideEditorDialog}>
                    <div className="field">
                        <label htmlFor="assesment">Κουίζ</label>

                        <AutoComplete id="assesment" value={this.state.entity.assesment.title} suggestions={this.state.filteredAssesments} completeMethod={this.searchAssesment} field="title" dropdown forceSelection onChange={(e) => this.onSelectChange(e, 'assesment', 'assesmentId')} className={classNames({ 'p-invalid': this.state.submitted && !this.state.entity.assesmentId })} />

                        {this.state.submitted && !this.state.entity.assesmentId && <small className="p-error">To Κουίζ είναι υποχρεωτικό!</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="question">Ερώτηση</label>

                        <AutoComplete id="question" value={this.state.entity.question.questionText} suggestions={this.state.filteredQuestions} completeMethod={this.searchQuestion} field="questionText" dropdown forceSelection onChange={(e) => this.onSelectChange(e, 'question', 'questionId')} className={classNames({ 'p-invalid': this.state.submitted && !this.state.entity.questionId })} />

                        {this.state.submitted && !this.state.entity.questionId && <small className="p-error">Η Ερώτηση είναι υποχρεωτική!</small>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteEntityDialog} style={{ width: '450px' }} header="Επιβεβαίωση" modal footer={deleteEntityDialogFooter} onHide={this.hideDeleteEntityDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.entity && <span>Θέλεις σίγουρα να διαγράψεις την εγγραφή?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }

}
