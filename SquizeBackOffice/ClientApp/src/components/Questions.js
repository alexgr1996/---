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

import { QuestionsService } from '../services/QuestionsService';
import { CategoriesService } from '../services/CategoriesService';

export class Questions extends Component {
    emptyEntity = {
        id: 0,
        difficulty: 1,
        correctChoicePos: 1,
        questionText: null,
        categoryId: 0,
        category: {
            id: 0,
            description: null
        },
        questionChoices: [
            {
                id: 0,
                text: null,
                queId: 0,
                position: 1
            },
            {
                id: 0,
                text: null,
                queId: 0,
                position: 2
            },
            {
                id: 0,
                text: null,
                queId: 0,
                position: 3
            },
            {
                id: 0,
                text: null,
                queId: 0,
                position: 4
            }
        ]
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

            categories: null,
            filteredCategories: null
        };

        this.entityService = new QuestionsService();

        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.newEntity = this.newEntity.bind(this);
        this.editEntity = this.editEntity.bind(this);
        this.saveEntity = this.saveEntity.bind(this);
        this.hideEditorDialog = this.hideEditorDialog.bind(this);

        this.confirmDeleteEntity = this.confirmDeleteEntity.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
        this.hideDeleteEntityDialog = this.hideDeleteEntityDialog.bind(this);

        this.categoriesService = new CategoriesService();

        this.onRowEditComplete = this.onRowEditComplete.bind(this);
    }

    componentDidMount() {
        this.entityService.getAll()
            .then(data => this.setState({ entities: data }));

        this.categoriesService.getAll()
            .then(data => this.setState({ categories: data }));
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

    searchCategory = (e) => {
        setTimeout(() => {
            let filteredCategories;
            if (!e.query.trim().length) {
                filteredCategories = [...this.state.categories];
            }
            else {
                filteredCategories = this.state.categories.filter((cls) => {
                    return cls.description.toLowerCase().startsWith(e.query.toLowerCase());
                });
            }

            this.setState({
                filteredCategories: filteredCategories
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
        return entity.questionText.trim() &&
            entity.categoryId &&
            entity.difficulty >= 1 && entity.difficulty <= 5 &&
            entity.correctChoicePos >= 1 && entity.correctChoicePos <= 4

    }

    saveEntity() {
        this.setState({ submitted: true });

        let entity = { ...this.state.entity };

        if (this.validateEntity(entity)) {
            if (entity.id) {
                this.entityService.update(entity)
                    .then(() => this.entityService.getAll()
                        .then(data => this.setState({ entities: data, submitted: false, editorDialog: false, entity: this.emptyEntity })));

                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η Ερώτηση ενημερώθηκε!', life: 3000 });
            }
            else {
                this.entityService.insert(entity)
                    .then(() => this.entityService.getAll()
                        .then(data => this.setState({ entities: data, submitted: false, editorDialog: false, entity: this.emptyEntity })));

                this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η Ερώτηση δημιουργήθηκε!', life: 3000 });
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

        this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η Ερώτηση διαγράφηκε!', life: 3000 });
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

    textEditor(options) {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

    onRowEditComplete(e) {
        let _entity = { ...this.state.entity };
        let { newData, index } = e;

        _entity.questionChoices[index] = newData;

        this.setState({
            entity: { ..._entity }
        });
    }

    render() {
        const header = (
            <div className="table-header">
                <h5 className="mx-0 my-1">Διαχείριση Ερωτήσων</h5>
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
                        <Column field="category.description" header="Κατηγορία" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column field="questionText" header="Κείμενο" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.editorDialog} style={{ width: '450px' }} header="Στοιχεία Ερώτησης" modal className="p-fluid" footer={editorDialogFooter} onHide={this.hideEditorDialog}>
                    <div className="field">
                        <label htmlFor="questionText">Κείμενο</label>

                        <InputTextarea id="questionText" value={this.state.entity.questionText} onChange={(e) => this.onInputChange(e, 'questionText')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.entity.questionText })} />

                        {this.state.submitted && !this.state.entity.questionText && <small className="p-error">Το Κείμενο είναι υποχρεωτικό!</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="category">Κατηγορία</label>

                        <AutoComplete id="category" value={this.state.entity.category.description} suggestions={this.state.filteredCategories} completeMethod={this.searchCategory} field="description" dropdown forceSelection onChange={(e) => this.onSelectChange(e, 'category', 'categoryId')} className={classNames({ 'p-invalid': this.state.submitted && !this.state.entity.categoryId })} />

                        {this.state.submitted && !this.state.entity.categoryId && <small className="p-error">Η Κατηγορία είναι υποχρεωτική!</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="difficulty">Βαθμός Δυσκολίας (1-5)</label>
                        <InputText id="difficulty" value={this.state.entity.difficulty} onChange={(e) => this.onInputChange(e, 'difficulty')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && (this.state.entity.difficulty < 1 || this.state.entity.difficulty > 5)})} />
                        {this.state.submitted && (this.state.entity.difficulty < 1 || this.state.entity.difficulty > 5) && <small className="p-error">Ο Βαθμός Δυσκολίας (1-5) είναι υποχρεωτικός!</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="correctChoicePos">Σωστή απάντηση (1-4)</label>
                        <InputText id="correctChoicePos" value={this.state.entity.correctChoicePos} onChange={(e) => this.onInputChange(e, 'correctChoicePos')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && (this.state.entity.correctChoicePos < 1 || this.state.entity.correctChoicePos > 4) })} />
                        {this.state.submitted && (this.state.entity.correctChoicePos < 1 || this.state.entity.correctChoicePos > 4) && <small className="p-error">Η Σωστή απάντηση (1-4) είναι υποχρεωτική!</small>}
                    </div>
                    <div className="card p-fluid">
                        <DataTable value={this.state.entity.questionChoices} editMode="row" dataKey="id"
                            className="editable-cells-table" responsiveLayout="scroll"
                            onRowEditComplete={this.onRowEditComplete} >
                            <Column field="position" header="Α/Α" style={{ width: '20%' }}></Column>
                            <Column field="text" header="Κείμενο" editor={(options) => this.textEditor(options)} style={{ width: '70%' }}></Column>
                            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                        </DataTable>
                    </div>

                </Dialog>

                <Dialog visible={this.state.deleteEntityDialog} style={{ width: '450px' }} header="Επιβεβαίωση" modal footer={deleteEntityDialogFooter} onHide={this.hideDeleteEntityDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.entity && <span>Θέλεις σίγουρα να διαγράψεις την Ερώτηση <b>{this.state.entity.questionText}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }

}
