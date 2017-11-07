import validate from 'validate.js/validate.min';

export default class ValidationManager {
    constructor(constraints) {
        this.allConstraints = constraints;
        this.touched = {}; // track which fields have been interacted by user
        // Some fields depend on other fields (presenceRequiredBy)
        this.touchDict = this.calculateTouchDependencies();
    }

    calculateTouchDependencies() {
        const td = {};
        // add self first...
        Object.keys(this.allConstraints).forEach((key) => {
            td[key] = { [key]: true };
        });

        // ...then add dependencies:
        Object.keys(this.allConstraints).forEach((key) => {
            const reqBy = this.allConstraints[key].presenceRequiredBy;
            if (reqBy) {
                td[reqBy][key] = true;
            }
        });

        return td;
    }

    // validate only fields affected by given field, in addition
    // to interacted fields.
    validateFieldAndGetNewState(e, formData) {
        let val = e.target.value === '' ? undefined : e.target.value;
        if (e.target.type === 'checkbox' && !e.target.checked) {
            // if checkbox is unchecked we do not take its value
            val = undefined;
        }
        const newFormData = {
            ...formData,
            [e.target.id]: val
        };
        const fieldTouch = this.touchDict[e.target.id];
        this.touched = {
            ...this.touched,
            ...fieldTouch
        };
        const constraints = {};
        Object.keys(this.touched).forEach((key) => {
            constraints[key] = this.allConstraints[key];
        });
        const newErrors = validate(newFormData, constraints) || {};
        return {
            errors: newErrors,
            formData: newFormData
        };
    }

    validateAll(formData) {
        // This also causes all fields to be touched:
        Object.keys(this.allConstraints).forEach((key) => {
            this.touched[key] = true;
        });
        const errors = validate(formData, this.allConstraints) || {};
        return errors;
    }
}
