import { useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import yelp from '../api/yelp';
import { app } from '../api/firebaseConfig';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    setErrorMessage(''); // Clear previous errors
    try {
      const db = getFirestore(app);
      
      // Firestore query
      const resultsCol = collection(db, 'Volunteer');
      const firestoreSnapshot = await getDocs(resultsCol);
      const firestoreData = firestoreSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        source: 'Firestore' // Tag to identify the source
      }));

      // Yelp API call
      const yelpResponse = await yelp.get('/search', {
        params: {
          location: 'canada',
          term: searchTerm + ' volunteer',
          categories: 'Volunteer',
          sort_by: 'best_match',
          limit: 20
        }
      });
      const yelpData = yelpResponse.data.businesses.map(business => ({
        ...business,
        source: 'Yelp' // Tag to identify the source
      }));

      // Merge Firestore and Yelp results
      const combinedResults = [...firestoreData, ...yelpData];
      setResults(combinedResults);
    } catch (error) {
      console.error('Error during search:', error);
      setErrorMessage('Something went wrong...'); // Set error message only after a failure
    }
  };

  return [searchApi, results, errorMessage];
};
