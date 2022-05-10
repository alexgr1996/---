
export class AssesmentQuestionsService {

    async getAll() {
        const response = await fetch('api/assesmentQuestion');

        return await response.json();
    }

    async update(entity) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        };

        return await fetch('api/assesmentQuestion/' + entity.id, requestOptions);
    }

    async insert(entity) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        };

        return await fetch('api/assesmentQuestion', requestOptions);
    }

    async delete(entity) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entity)
        };

        return await fetch('api/assesmentQuestion/' + entity.id, requestOptions);
    }

}