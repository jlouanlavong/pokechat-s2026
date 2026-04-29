import React, { useState } from 'react';
import { Input, Label, Card, Message } from 'semantic-ui-react';
import '../App.scss';
import { CHAT_API } from '../AppConfig';
import axios from 'axios';

const ChatForm = ({ setSearchResults }) => {   // ← accepts prop
    const [query,   setQuery]   = useState('');
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState(null);

    const sendQuery = (q) => {
        if (!q.trim()) return;
        setLoading(true);
        setError(null);

        axios.get(`${CHAT_API}/chat/query`, { params: { q } })
            .then(res => {
                setSearchResults([res.data[0].id]);  // ← passes ID up to PokemonChat
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Something went wrong. Try again.');
                setLoading(false);
            });
    };

    return (
        <div style={{ maxWidth: 340, margin: '0 auto', padding: '2rem 1rem' }}>

            {loading && (
                <Card style={{ width: '100%', marginBottom: 16 }}>
                    <Card.Content>
                        <Card.Description style={{ textAlign: 'center', color: '#999' }}>
                            Searching…
                        </Card.Description>
                    </Card.Content>
                </Card>
            )}

            {error && (
                <Message negative style={{ marginBottom: 16 }}>
                    <Message.Header>Error</Message.Header>
                    <p>{error}</p>
                </Message>
            )}

            <Input
                fluid
                placeholder="Ask about a Pokemon..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') sendQuery(query);
                }}
                action={{
                    icon: 'send',
                    onClick: () => sendQuery(query),
                }}
                style={{ marginBottom: 10 }}
            />

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Label as="a" onClick={() => sendQuery('Strongest Pokemon')}>
                    Strongest Pokemon
                </Label>
                <Label as="a" onClick={() => sendQuery('Weakest Pokemon')}>
                    Weakest Pokemon
                </Label>
                <Label as="a" onClick={() => sendQuery('Starter Pokemon')}>
                    Starter Pokemon
                </Label>
            </div>

        </div>
    );
};

export { ChatForm };