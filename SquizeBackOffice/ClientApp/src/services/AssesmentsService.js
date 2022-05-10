
export class AssesmentsService {

    async getAll() {
        const response = await fetch('api/assesment');

        return await response.json();
    }

    async update(entity) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        };

        return await fetch('api/assesment/' + entity.id, requestOptions);
    }

    async insert(entity) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        };

        return await fetch('api/assesment', requestOptions);
    }

    async delete(entity) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        };

        return await fetch('api/assesment/' + entity.id, requestOptions);
    }

}