import Element from "./Element";

const DynamicTicketForm = (
    {handleChange, 
    handleBlur, 
    validateemail,
    handleEdior,
    error, 
    userformData, 
    formData, 
    fetchData, 
    fileError, 
    handleFileUpload, 
    handleFileDeletion, 
    uploadedFiles,
    progress}:any) => {
   return(
        <div>
                {
                formData?.map((field:any, ind:number) => {
                    return(
                        <div key={ind}>
                            <Element 
                                field= {field} 
                                ind= {ind} 
                                handleChange={handleChange}
                                handleEdior= {handleEdior}
                                handleBlur= {handleBlur} 
                                validateemail = {validateemail}
                                error= {error} 
                                userformData= {userformData} 
                                formData = {formData}
                                fetchData = {fetchData}
                                fileError= {fileError}
                                handleFileUpload= {handleFileUpload}
                                handleFileDeletion = {handleFileDeletion}
                                uploadedFiles= {uploadedFiles}
                                progress = {progress}
                            />
                        </div>
                    )
                })
                }
        </div>
    )
}
export default DynamicTicketForm;