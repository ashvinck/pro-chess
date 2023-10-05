export const loadGameProgress = async () => {
  try {
    const response = await axios.get('/play/computer/save'); // Use Axios to make a GET request

    if (response.status === 200) {
      const gameData = response.data;

      return true;
    } else {
      throw new Error('Failed to load game progress');
    }
  } catch (error) {
    console.error('Error loading game progress:', error);
    throw error;
  }
};
