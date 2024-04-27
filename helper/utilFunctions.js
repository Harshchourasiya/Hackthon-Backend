const generateRandomTestId = ()=> {
    // Define the characters that can be used in the testId
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    // Define the length of the testId
    const length = 8;
  
    let testId = '';
  
    // Generate a random character for each position in the testId
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      testId += characters.charAt(randomIndex);
    }
  
    return testId;
}

module.exports = {
    generateId : generateRandomTestId
}