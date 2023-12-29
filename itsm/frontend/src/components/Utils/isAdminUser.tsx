// Function to check if the user is an admin based on session storage
export function isAdminUser(isAdmin = true) {
    // Get the user details from session storage
    const userDetailsJSON = sessionStorage?.getItem('userDetails');
  
    // Check if user details exist and if they indicate admin status
    if (userDetailsJSON) {
      const userDetails = JSON.parse(userDetailsJSON);
      return isAdmin? userDetails.isAdmin == 1: userDetails !== null;
    }
  
    // Default to false if user details are not present or isAdmin is not explicitly true
    return false;
  }
  