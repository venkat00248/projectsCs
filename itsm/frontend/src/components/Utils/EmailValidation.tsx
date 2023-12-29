export const EmailValidation = (newvalue: any) => {
    if (newvalue) {
        const isEmail = /^[A-Z0-9. _%+-]+@[A-Z. -]+\.[A-Z]{2,4}$/i.test(newvalue);
        return isEmail;
    }
    else return newvalue;

}

export const validateForm = (formValues:any, formField:any) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
        
    // Initialize errors object
    let errors: any = {
      priorityId: '',
      priority: ''
    };
  
    // Check validation rules
    if (formValues.priorityId.trim() === '') {
      errors.priorityId = formField[0]["errorMessage"]["001"];
    }
  
    if (formValues.priority === '') {
      errors.priority = formField[1]["errorMessage"]["001"];
    } else if ((formValues.priority.length < formField[1]["minLength"] || formValues.priority.length > formField[1]["maxLength"]) && regex.test(formValues.priority)) {
      errors.priority = formField[1]["errorMessage"]["002"];
    } else if (!regex.test(formValues.priority)) {
      errors.priority = formField[1]["errorMessage"]["003"];
    }

    return errors;
};