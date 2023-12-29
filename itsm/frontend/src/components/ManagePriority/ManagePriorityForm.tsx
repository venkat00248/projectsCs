import React from 'react'
import { config } from '../uidashboard/Imports';

import { useTranslation } from 'react-i18next';
export const ManagePriorityForm = ({formValues,handleChange,formErrors,handleSubmit}:any) => {
    const {t}=useTranslation();
  return (
    <form id='priorityForm'>
    <h4 className='priority-header bg-light px-2'>{t("Priority Management")}</h4>
    <div className="row mt-1">
        {
            config["PRIORITY_MANAGEMENT"]["Formfield"].slice(0, 2).map((field:any, index:any) => (
                <div className='col' key={index}>
                    <label 
                    className='col-form-label priority-label fw-bold text-dark '
                    htmlFor='priorityId'
                    >
                        {t(field.label)}
                        {field.required && <span className={`text-danger`}>*</span>}

                    </label>
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        className="form-control inputField"
                        value={formValues[field.name]}
                        onChange={(e) => handleChange(e, index)}
                        maxLength={field.maxLength}
                        minLength={field.minLength}
                        required={field.required}
                    />
                    {
                        (formErrors[field.name])?
                        <div className="container alert alert-danger  pt-0  text-align-center error-message">
                            <i className="fa-sharp fa-solid fa-circle-exclamation ps-1 " style={{ marginRight: "6px" }}></i>
                            {t(formErrors[field.name])}
                        </div>:
                        <div className='priority-label' style={{ fontStyle: "italic", fontSize: "14px", color: "lightslategray" }} >
                            {t(field.tooltips)}
                        </div>
                    }
                    {/* <div className='priority-label' style={{ fontStyle: "italic", fontSize: "14px", color: "lightslategray" }} >
                        {field.tooltips}
                    </div>
                    {formErrors[field.name] && <div className="container alert alert-danger  pt-0  text-align-center error-message">
                        <i className="fa-sharp fa-solid fa-circle-exclamation ps-1 " style={{ marginRight: "6px" }}></i>
                        {t(formErrors[field.name])}
                    </div>} */}
                </div>
            ))
        }
        
        {/* <div className="col">

            <label
                className='col-form-label priority-label fw-bold text-dark '
                htmlFor="priorityId">
                {t("Priority ID")}:
                <span className={`text-danger`}>*</span>
            </label>
            <input
                type="number"
                id="priorityId"
                name="priorityId"
                placeholder={t("Enter priority id") as string  | undefined}
                className='form-control'
                value={formValues.priorityId}
                onChange={handleChange}
                required
            />
            <div className='priority-label' style={{ fontStyle: "italic", fontSize: "14px", color: "lightslategray" }} >
                {t("Priorities are listed according to their id, smallest to largest")}
            </div>
            {formErrors.priorityId && <div className="container alert alert-danger  pt-0  text-align-center error-message">
                <i className="fa-sharp fa-solid fa-circle-exclamation ps-1 " style={{ marginRight: "6px" }}></i>
                {t(formErrors.priorityId)}
            </div>}
        </div> */}
        {/* <div className="col">

            <label
                className='col-form-label priority-label fw-bold text-dark'
                htmlFor="priorityId">
               {t("Priority Title")}:
                <span className={`text-danger`}>*</span>
            </label>
            <input
                type="text"
                id="priority"
                name="priority"
                maxLength={50}
                minLength={2}
                className='form-control'
                placeholder={t("Enter Priority title") as string  | undefined}
                value={formValues.priority}
                onChange={handleChange}
                required
            />
            <div style={{ fontStyle: "italic", fontSize: "14px", color: "lightslategray" }}>
               {t("For example, add a priority title  like High or Level 1")}
            </div>
            {formErrors.priority && <div className="container alert alert-danger  pt-0  text-align-center error-message">
                <i className="fa-sharp fa-solid fa-circle-exclamation ps-1 " style={{ marginRight: "6px" }}></i>
                {t(formErrors.priority)}
            </div>}

        </div> */}
    </div>
    <div className='border-bottom my-3'></div>
    <div className="row mt-1">
        {
            config["PRIORITY_MANAGEMENT"]["Formfield"].slice(2).map((field, index) => (
                <div className='col' key={index}>
                    <label
                        htmlFor={field.name}
                        className="col-form-label priority-label fw-bold text-dark"
                        >
                        {t(field.label)}:
                        {/* {field.required && <span className={`text-danger`}>*</span>} */}
                    </label>
                    <div className='p-description'>
                    {
                        (field.name == "foregroundColor")?
                        <>
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            className="form-control"
                            value={formValues[field.name]}
                            onChange={handleChange}
                            // maxLength={field.maxLength}
                            // minLength={field.minLength}
                            required={field.required}
                            disabled= {true}
                        />
                        <input
                            type="color"
                            className='colorpic'
                            id="foregroundColor"
                            name="foregroundColor"
                            value={formValues.foregroundColor}
                            onChange={handleChange}
                            required
                        />
                        </>:
                        <>
                        <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            className="form-control"
                            value={formValues[field.name]}
                            onChange={handleChange}
                            // maxLength={field.maxLength}
                            // minLength={field.minLength}
                            required={field.required}
                            disabled = {true}
                        />
                        <input
                            type="color"
                            className='colorpic'
                            id="backgroundColor"
                            name="backgroundColor"
                            value={formValues.backgroundColor}
                            onChange={handleChange}
                            required
                        />
                        </>
                    }
                   

                    </div>
                </div>
            ))
        }



        {/* <div className="col">
            <label htmlFor="foregroundColor" className='col-form-label priority-label fw-bold text-dark'>{t("Foreground Color")}:</label>

            <div className='p-description'>
                <input
                    type="text"
                    name="foregroundColor"
                    className='form-control'
                    value={formValues.foregroundColor}
                    onChange={handleChange}
                    disabled= {true}
                />
                <input
                    type="color"
                    className='colorpic'
                    id="foregroundColor"
                    name="foregroundColor"
                    value={formValues.foregroundColor}
                    onChange={handleChange}
                    required
                />
            </div>
            <div style={{ fontStyle: "italic", fontSize: "14px", color: "lightslategray" }}>
               {t("Optionally, specify a foregroundColor for the priority")}
            </div>

        </div>
        <div className="col">

            <label htmlFor="backgroundColor" className='col-form-label priority-label fw-bold text-dark'>{t("Background Color")}:</label>
            <div className='p-description'>
                <input
                    type="text"
                    value={formValues.backgroundColor}
                    className='form-control'
                    name="backgroundColor"
                    onChange={handleChange}
                    disabled = {true}
                />

                <input
                    type="color"
                    className='colorpic'
                    id="backgroundColor"
                    name="backgroundColor"
                    value={formValues.backgroundColor}
                    onChange={handleChange}
                    required
                />
            </div>
            <div style={{ fontStyle: "italic", fontSize: "14px", color: "lightslategray" }}>
                {t("Optionally, specify a backgroundColor for the priority")}
            </div>
        </div> */}
        {formValues && (
            <div className='col' >
                <label className='col-form-label priority-label fw-bold text-dark'>{t("Preview")}</label>
                <div className='' style={{
                    backgroundColor: formValues?.backgroundColor ? formValues?.backgroundColor : '',
                    color: formValues?.foregroundColor ? formValues?.foregroundColor : '',
                    fontSize: "15px", height: "37px", width: "50%", textAlign: "center", paddingTop: "5px", borderRadius: "5px"
                }}>
                    {` ${formValues.priority}`}
                </div>
            </div>
        )}
    </div>
    <div className='ms-auto p-2 text-end'>
        <button className="btn btn-sm btn-primary" onClick={handleSubmit} >{t("Submit")}</button>
    </div>
</form>
  )
}
