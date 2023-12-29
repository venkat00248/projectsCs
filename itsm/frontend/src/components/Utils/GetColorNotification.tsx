export const getColorForLetter = (letter:any) => {

    const colors = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 
                    '.bg-G', 'bg-H', 'bg-I', 'bg-J', 'bg-K', 'bg-L', 'bg-primary', 'bg-secondary', 
                    'bg-success', 'bg-danger', 'bg-warning', 'bg-info', '.bg-G', 'bg-primary', 'bg-I', 
                    'bg-warning', 'bg-K', 'bg-L', 'bg-J', 'bg-secondary'
                    ]; // Add more colors as needed
    const letterIndex = letter.toUpperCase().charCodeAt(0) - 65; // Calculate the index based on the ASCII code of the letter
    if (letterIndex >= 0 && letterIndex < colors.length) {
      return colors[letterIndex]; // Return the color at the corresponding index
    }
    return 'bg-primary'; // Return 'default' if the letter is not within A to Z
  };