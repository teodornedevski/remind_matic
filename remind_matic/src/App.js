// src/App.js
import { Configuration, OpenAIApi } from 'openai';

import Header from './components/Header';
import CalendarHome from './components/CalednarHome';

import { useState } from 'react';

const App = () => {

    const configuration = new Configuration({
        apiKey: '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'
    });

    const openai = new OpenAIApi(configuration);

    const [storedValues, setStoredValues] = useState([]);
    const [inviteText, setInviteText] = useState([]);

    const generateResponse = async (newQuestion, setNewQuestion) => {
        let options = {
            model: 'text-davinci-003',
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ['/'],
        };

        let completeOptions = {
            ...options,
            prompt: newQuestion,
        };

        const response = await openai.createCompletion(completeOptions);

        if (response.data.choices) {
            setStoredValues([
                {
                    question: newQuestion,
                    answer: response.data.choices[0].text,
                },
                ...storedValues,
            ]);
            setInviteText(response.data.choices[0].text)
            setNewQuestion('');
            return(response.data.choices[0].text);
        }
    };

    

    return (
        <div>

            <Header/>

            <CalendarHome generateResponse={generateResponse} inviteText={inviteText} setInviteText={setInviteText}/>
        </div>
    );
};

export default App;