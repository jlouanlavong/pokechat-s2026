import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, ListItem} from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';


const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
    const [spriteIdx, setSpriteIdx] = useState(0);

    useEffect(() => {
        axios
            .get('${POKE_API}pokemon/${pokemonID}')
            .then(res => setData(res.data))
            .catch(err => console.error('PokeAPI error: ', err));
    }, [pokemonID]);

if (!data) {
    return (
        < Card style={{ width: 280, minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <Card.Content>
                <Card.Description style={{ textAlign: 'center', color: '#999'}} >
                    Loading #{pokemonID}
                </Card.Description>
            </Card.Content>
        </Card>
    );
}
    
    return (
        <Card>
            <Image
                src={data.sprites.front_default}
                alt={data.name}
                ui={false}
                 style={{ width: 120, height: 120, imageRendering: 'pixelated',
                     display: 'block', margin: '12px auto 0' }}
            />
            <Card.Content>
                <Card.Header style={{ textTransform: 'capitalize'}}>
                    {data.name}
                </Card.Header>
            </Card.Content>
        </Card>
    );
}

export {PokemonCard};