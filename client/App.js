import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Box, TextField } from '@mui/material';
function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonFiltered, setPokemonFiltered] = useState([]);
    useEffect(() => {
        async function fetchPokemon() {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=151/"
        );
        const data = await response.json();
        const pokemonList = data.results;
        const fetchedPokemonData = await Promise.all(
            pokemonList.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const pokemonData = await response.json();
            return pokemonData;
            })
        );
        setPokemonData(fetchedPokemonData);
        setPokemonFiltered(fetchedPokemonData);
        }
        fetchPokemon();
    }, []);
    function handleChange(e) {
        const value = e.target.value;
        const regex = new RegExp(value, 'gi');
        const filtered = pokemonData.filter((pokemon) => {
            return pokemon.name.match(regex)
        });
        setPokemonFiltered(filtered);
    }
    return (
        <Container>
            <center><h1>Pokemon List</h1></center>
            <Box display='flex' p={3}>
                <TextField
                    label="Pokemon name"
                    onChange={handleChange}
                    sx={{ mx: 'auto'}}
                />
            </Box>
            <Row xs={1} md={4} className="g-4">
            {pokemonFiltered.map((pokemon, idx) => (
                <Col key={idx}>
                <Card>
                    <Card.Img variant="top" src={pokemon.sprites.front_default} />
                    <Card.Body>
                    <Card.Title>{pokemon.name}</Card.Title>
                    <Card.Text>
                    <strong>Height:</strong> {pokemon.height} m<br />
                    <strong>Weight:</strong> {pokemon.weight} kg
                    <br />
                    <strong>Base Experience:</strong> {pokemon.base_experience}
                    <br />
                    <strong>Abilities:</strong>{" "}
                        {pokemon.abilities
                        .map((ability) => ability.ability.name)
                        .join(", ")}
                        <br />
                        <strong>Types:</strong>{" "}
                        {pokemon.types.map((type) => type.type.name).join(", ")}
                        <br />
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </Container>
    );
}
export default App;