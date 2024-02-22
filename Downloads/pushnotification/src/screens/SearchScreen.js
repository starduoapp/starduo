import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, Image, StyleSheet, ScrollView, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import colors from '../../assets/colors/colors';
import SearchSearchBar from '../components/SearchSearchBar';
import ResultsList from '../components/ResultsList';
import useSearchApi from '../hooks/useResults'; // Ensure this is the correct path

const SearchScreen = ({ navigation }) => {
    const [term, setTerm] = useState(''); 
    const [cities, setCities] = useState([]);
    const [autocompleteData, setAutocompleteData] = useState([]);
    const [showCityList, setShowCityList] = useState(false); // New state for toggling city list
    const [selectedCity, setSelectedCity] = useState('');
    const [searchApi, results, errorMessage] = useSearchApi();
    const [filteredResults, setFilteredResults] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [isFocused, setIsFocused] = useState(false);
    useFocusEffect(
        useCallback(() => {
            const performSearch = async () => {
                setIsLoading(true); // Start loading
                await searchApi('volunteer', selectedCity); // Perform the search with the default term
                setIsLoading(false); // End loading
            };
        
            performSearch();
        }, [selectedCity]) // Dependency on selectedCity if you want to filter by city as well
    );
    
    

    const toggleCityList = () => {
        setShowCityList(!showCityList); // Toggle visibility of city list
    };

    useEffect(() => {
        fetch('https://countriesnow.space/api/v0.1/countries')
        .then((response) => response.json())
        .then((data) => {
            const canada = data.data.find((country) => country.country === 'Canada');
            if (canada && canada.cities) {
                const cityItems = canada.cities.map((city) => ({
                    label: city,
                    value: city,
                }));
                setCities(cityItems);
            }
        })
        .catch((error) => console.error('Error fetching cities:', error));
    }, []);

    useEffect(() => {
        let cityResults = results;
    
        if (selectedCity) {
            cityResults = cityResults.filter(
                (result) => (result.location && result.location.city === selectedCity) || (result.city === selectedCity)
            );
        }
    
        if (term) {
            cityResults = cityResults.filter(
                (result) => result.name.toLowerCase().includes(term.toLowerCase())
            );
        }
    
        setFilteredResults(cityResults);
    }, [selectedCity, term, results]);

    const handleCitySearch = (query) => {
        setSelectedCity(query);
        if (query === '') {
            setAutocompleteData([]);
        } else {
            const filtered = cities.filter((city) =>
                city.label.toLowerCase().includes(query.toLowerCase())
            );
            setAutocompleteData(filtered);
        }
    };

    const handleSearchSubmit = async () => {
        setIsLoading(true); // Start loading
        await searchApi(term, selectedCity); // Perform the search
        setIsLoading(false); // End loading
    };
    

    // Define dynamic styles within the component function
    const dynamicStyles = StyleSheet.create({
        input: {
            // Styles for the text input
            
            padding: 10,
            height: 40,
        },
        container: {
            // Styles for the container of the Autocomplete component
            width: '90%',
            alignSelf: 'center',
            backgroundColor: 'transparent', // No background color
        },
        listStyle: {
            // Styles for the list container
            margin: '10',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',    
            justifyContent: 'space-between', // Positions items on each end
            borderWidth: 1, // Border for the entire container
            borderColor: colors.primary,
            borderRadius: 10,
            width: '90%',
            alignSelf: 'center',
            marginBottom: 10,
            
        },
        searchInput: {
            flex: 1,
            padding: 10,
        },
        toggleIcon: {
            width: 20,
            height: 20,
            marginRight: 10,
        },
    });

  return (
    <ScrollView style={staticStyles.scrollView}>
        <View style={staticStyles.container}>
            <View style={staticStyles.topBar}>
                <TouchableOpacity onPress={() => navigation.navigate('AboutUsScreen')}>
                    <Image source={require('../../assets/adaptive-icon-cropped.png')} style={staticStyles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SettingScreen')}>
                    <Image source={require('../../assets/icons/SettingIcon.png')} style={staticStyles.icon} />
                </TouchableOpacity>
            </View>
            
            <Text style={staticStyles.header}>Volunteer Opportunities</Text>
            
            <View style={dynamicStyles.inputContainer}>
                <SearchSearchBar
                    term={term}
                    onTermChange={setTerm}
                    onTermSubmit={handleSearchSubmit}
                    style={dynamicStyles.searchInput}
                />
                <TouchableOpacity onPress={toggleCityList}>
                    <Image
                        source={require('../../assets/icons/More.png')}
                        style={dynamicStyles.toggleIcon}                        
                    />
                </TouchableOpacity>
            </View>   
            {showCityList && (
                <Autocomplete
                data={autocompleteData}
                defaultValue={selectedCity}
                onChangeText={handleCitySearch}
                placeholder="City/Location"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={dynamicStyles.input}
                containerStyle={dynamicStyles.container} // Set the style for the container
                listStyle={dynamicStyles.listStyle} // Set the style for the list part
                flatListProps={{
                    keyExtractor: (item, index) => `item-${index}`,
                    renderItem: ({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedCity(item.value);
                                setAutocompleteData([]); // Hide the list after selection
                            }}
                        >
                            <Text style={dynamicStyles.itemText}>{item.label}</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            )}
            
            {isLoading ? (
                <ActivityIndicator style={{margin: 30}} size="large" color={colors.primary} />
            ) : (
                <ResultsList results={filteredResults} navigation={navigation} />
            )}
            {filteredResults.length === 0 && (selectedCity || term) && (
                <Text style={staticStyles.noResultsMessage}>
                    {selectedCity && !term ? 'No results found for the selected city' : null}
                    {term && !selectedCity ? 'No results found for the search term' : null}
                    {term && selectedCity ? 'No results found for the selected city and search term' : null}
                </Text>
            )}

            {errorMessage ? (
                <Text style={staticStyles.errorMessage}>{errorMessage}</Text>
            ) : null}
            <StatusBar style="auto" />
        </View>
    </ScrollView>
  );
};

// Define static styles outside of the component function
const staticStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        paddingTop: 60,
        paddingHorizontal: 15,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        marginBottom: 15,
    },
    header: {
        color: colors.primary,
        fontFamily: 'PingFangSC-Semibold',
        fontSize: 28,
        marginVertical: 15,
        marginLeft: 15,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    itemText: {
        margin: 10,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
    },
    noResultsMessage: {
        textAlign: 'center',
        color: colors.text, // You might need to adjust this color
        fontSize: 16,
        marginTop: 20,
    },
});

export default SearchScreen;