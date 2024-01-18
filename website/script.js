async function fetchData() {
    try {
        const response = await fetch('taekwondo.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const taekwondo = await response.json();
        // Use the 'taekwondo' object here
        console.log(taekwondo);
    } catch (error) {
        console.error('Error loading JSON file:', error);
    }
}

  // Call the async function
fetchData();
