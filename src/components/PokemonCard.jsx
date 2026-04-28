import React, { useEffect, useState } from 'react';
import { Card, List, Label, Image } from 'semantic-ui-react';
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';

const TYPE_COLORS = {
    fire: '#F08030',    grass: '#78C850',   water: '#6890F0',
    poison: '#A040A0',  bug: '#A8B820',     normal: '#A8A878',
    electric: '#F8D030',ground: '#E0C068',  fairy: '#EE99AC',
    fighting: '#C03028',psychic: '#F85888', rock: '#B8A038',
    ghost: '#705898',   ice: '#98D8D8',     dragon: '#7038F8',
    dark: '#705848',    steel: '#B8B8D0',   flying: '#A890F0',
};

const SPRITE_KEYS = [
    { label: 'Default',    key: 'front_default' },
    { label: 'Shiny',      key: 'front_shiny' },
    { label: 'Back',       key: 'back_default' },
    { label: 'Back Shiny', key: 'back_shiny' },
];

const PokemonCard = ({ pokemonID }) => {
    const [data,      setData]      = useState(null);
    const [spriteIdx, setSpriteIdx] = useState(0);

    useEffect(() => {
        setSpriteIdx(0);
        axios.get(`${POKE_API}pokemon/${pokemonID}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [pokemonID]);

    if (!data) return <Card><Card.Content>Loading…</Card.Content></Card>;

    const availableSprites = SPRITE_KEYS.filter(s => data.sprites[s.key]);
    const currentSprite    = data.sprites[availableSprites[spriteIdx].key];

    return (
        <Card style={{ width: 280 }}>

            <Image
                src={currentSprite}
                alt={data.name}
                ui={false}
                style={{ width: 120, height: 120, imageRendering: 'pixelated',
                         display: 'block', margin: '12px auto 0' }}
            />

            <div style={{ display: 'flex', justifyContent: 'center',
                          flexWrap: 'wrap', gap: 4, padding: '6px 8px' }}>
                {availableSprites.map((s, i) => (
                    <Label key={s.key} size="mini"
                        onClick={() => setSpriteIdx(i)}
                        style={{
                            cursor: 'pointer',
                            fontWeight: i === spriteIdx ? 700 : 400,
                            opacity:    i === spriteIdx ? 1   : 0.5,
                        }}>
                        {s.label}
                    </Label>
                ))}
            </div>

            <Card.Content>

                <Card.Header style={{ textTransform: 'capitalize' }}>
                    {data.name}
                </Card.Header>

                <div style={{ marginTop: 6, marginBottom: 10,
                              display: 'flex', gap: 6 }}>
                    {data.types.map(({ type }) => (
                        <Label key={type.name} size="tiny"
                            style={{
                                textTransform: 'lowercase',
                                backgroundColor: TYPE_COLORS[type.name] ?? '#aaa',
                                color: '#fff',
                                border: 'none',
                            }}>
                            {type.name}
                        </Label>
                    ))}
                </div>

                <List divided size="large">
                    {data.stats.map(({ stat, base_stat }) => (
                        <List.Item key={stat.name}
                            style={{ display: 'flex',
                                     justifyContent: 'space-between',
                                     alignItems: 'center',
                                     width: '100%'}}>
                            <span style={{ textTransform: 'lowercase' }}>
                                {stat.name}
                            </span>
                            <span style={{ fontWeight: 700, marginLeft: 'auto' }}>
                                {base_stat}
                            </span>
                        </List.Item>
                    ))}
                </List>

            </Card.Content>
        </Card>
    );
};

export { PokemonCard };