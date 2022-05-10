import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { Component } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './List.css';

import { CategoriesService } from '../services/CategoriesService';

export class Categories extends Component {
    emptyEntity = {
        id: 0,
        description: null
    };

    constructor(props) {
        super(props);

        this.state = {
            entities: null,
            entity: this.emptyEntity,

            editorDialog: false,
            deleteEntityDialog: false,

            submitted: false,

            globalFilter: null
        };

        this.entityService = new CategoriesService();

        this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this);
        this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

        this.newEntity = this.newEntity.bind(this);
        this.editEntity = this.editEntity.bind(this);
        this.saveEntity = this.saveEntity.bind(this);
        this.hideEditorDialog = this.hideEditorDialog.bind(this);

        this.confirmDeleteEntity = this.confirmDeleteEntity.bind(this);
        this.deleteEntity = this.deleteEntity.bind(this);
        this.hideDeleteEntityDialog = this.hideDeleteEntityDialog.bind(this);
    }

    componentDidMount() {
        this.entityService.getAll()
            .then(data => this.setState({ entities: data }));
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

    onInputChange = (e, field) => {
        const val = (e.target && e.target.value) || '';
        let _entity = { ...this.state.entity };
        _entity[`${field}`] = val;

        this.setState({
            entity: { ..._entity }
        });
    }

    validateEntity(entity) {
        return entity.description.trim();
    }

    async saveEntity() {
        this.setState({ submitted: true });

        let entity = { ...this.state.entity };

        if (this.validateEntity(entity)) {
            if (entity.id) {
                let response = await this.entityService.update(entity);

                if (response.ok) {
                    this.entityService.getAll()
                        .then(data => this.setState({ entities: data, submitted: false, editorDialog: false, entity: this.emptyEntity }));

                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η Κατηγορία ενημερώθηκε!', life: 3000 });
                }
                else {
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Σφάλμα!', life: 3000 });
                }
            }
            else {
                let response = await this.entityService.insert(entity);

                if (response.ok) {
                    this.entityService.getAll()
                        .then(data => this.setState({ entities: data, submitted: false, editorDialog: false, entity: this.emptyEntity }));

                    this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η Κατηγορία καταχωρήθηκε!', life: 3000 });
                }
                else {
                    this.toast.show({ severity: 'error', summary: 'Error', detail: 'Σφάλμα!', life: 3000 });
                }
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

    async deleteEntity() {
        let entity = { ...this.state.entity };

        let response = await this.entityService.delete(entity);

        if (response.ok) {
            this.entityService.getAll()
                .then(data => this.setState({ entities: data, deleteEntityDialog: false, entity: this.emptyEntity }));

            this.toast.show({ severity: 'success', summary: 'Successful', detail: 'Η Κατηγορία διαγράφηκε!', life: 3000 });
        }
        else {
            this.toast.show({ severity: 'error', summary: 'Error', detail: 'Σφάλμα!', life: 3000 });
        };
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
                <h5 className="mx-0 my-1">Διαχείριση Κατηγοριών</h5>
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
                        <Column field="description" header="Περιγραφή" sortable style={{ minWidth: '16rem' }}></Column>
                        <Column body={this.actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>
                </div>

                <Dialog visible={this.state.editorDialog} style={{ width: '450px' }} header="Στοιχεία Κατηγορίας" modal className="p-fluid" footer={editorDialogFooter} onHide={this.hideEditorDialog}>
                    <div className="field">
                        <label htmlFor="description">Περιγραφή</label>
                        <InputText id="dersription" value={this.state.entity.description} onChange={(e) => this.onInputChange(e, 'description')} required autoFocus className={classNames({ 'p-invalid': this.state.submitted && !this.state.entity.description })} />
                        {this.state.submitted && !this.state.entity.description && <small className="p-error">Η Περιγραφή είναι υποχρεωτική!</small>}
                    </div>
                </Dialog>

                <Dialog visible={this.state.deleteEntityDialog} style={{ width: '450px' }} header="Επιβεβαίωση" modal footer={deleteEntityDialogFooter} onHide={this.hideDeleteEntityDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {this.state.entity && <span>Θέλεις σίγουρα να διαγραφεί η Κατηγορία <b>{this.state.entity.description}</b>?</span>}
                    </div>
                </Dialog>
            </div>
        );
    }

}
