function FormatDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date';
    }
  
    const year = date.getFullYear();
    const day = date.getDate();
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'Nov.', 'December'
    ];
  
    const month = monthNames[date.getMonth()];
    return `${month} ${day}, ${year}`;
  }

export default FormatDate