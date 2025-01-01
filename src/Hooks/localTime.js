const localTime = (date) => {
    const formatedTime = new Date(date).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, 
    });
    return formatedTime;
};

export default localTime;