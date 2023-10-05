import axios from './api';

export const saveGameProgress = async (gameData) => {
  try {
    const response = await axios.post('/play/computer/save', gameData);
    if (response.status === 200) {
      return true;
    } else {
      throw new Error('Failed to save game progress');
    }
  } catch (error) {
    console.error('Error saving game progress', error);
    throw error;
  }
};
