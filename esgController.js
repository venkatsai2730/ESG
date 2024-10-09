const axios = require('axios');

// Fetch ESG data from stock-swift API
const getEsgData = async (req, res) => {
    const { company, startDate, endDate } = req.params;
    try {
        // Use dynamic company in the URL
        const response = await axios.get(`https://stock-swift.p.rapidapi.com/news/${company}`, {
            params: {
                startDate: startDate, // Correctly passing startDate
                endDate: endDate // Correctly passing endDate
            },
            headers: {
                'x-rapidapi-host': 'stock-swift.p.rapidapi.com',
                'x-rapidapi-key': '710ddaa271msh3e2a71ebe821325p14697ejsna4b46ea968e1'
            }
        });
        res.json(response.data); // Send the API response
    } catch (error) {
        console.error('Error fetching ESG data from stock-swift:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching ESG data from stock-swift', error: error.message });
    }
};

// Fetch ESG data from stock-pluse API
const getEsgDatas = async (req, res) => {
    const { company, startDate, endDate } = req.params;
    try {
        // Use dynamic company in the URL
        const response = await axios.get(`https://yahoo-finance127.p.rapidapi.com/finance-analytics/${company}`, {
            params: {
                startDate: startDate, // Correctly passing startDate
                endDate: endDate // Correctly passing endDate
            },
            headers: {
                'x-rapidapi-host': 'yahoo-finance127.p.rapidapi.com',
                'x-rapidapi-key': '7710ddaa271msh3e2a71ebe821325p14697ejsna4b46ea968e1'
            }
        });
        res.json(response.data); // Send the API response
    } catch (error) {
        console.error('Error fetching ESG data from stock-pluse:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching ESG data from stock-pluse', error: error.message });
    }
};

// Fetch ESG words analysis from FinancAI API
const getEsgDatae = async (req, res) => {
    const { company, startDate, endDate, news } = req.body; // Assuming news is passed in the request body
    try {
        // Prepare request to the ESG words API
        const esgOptions = {
            method: 'POST',
            url: 'https://financai.p.rapidapi.com/api/esg-words',
            headers: {
                'x-rapidapi-key': '710ddaa271msh3e2a71ebe821325p14697ejsna4b46ea968e1',
                'x-rapidapi-host': 'financai.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                news: news // Sending the news data to the ESG words API
            }
        };

        // Fetch ESG words analysis
        const esgResponse = await axios.request(esgOptions);

        // Send ESG analysis along with company info
        res.json({
            company: company,
            startDate: startDate,
            endDate: endDate,
            esgAnalysis: esgResponse.data
        });

    } catch (error) {
        console.error('Error fetching ESG data from FinancAI:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching ESG data from FinancAI', error: error.message });
    }
};

// Fetch ESG news from GaiaLens API
const getGaiaLensEsgData = async (req, res) => {
    const { company, date } = req.params; // Using company and date from the request parameters
    try {
        // Use GaiaLens API to fetch ESG data
        const response = await axios.get('https://gaialens-esg-news.p.rapidapi.com/news', {
            params: {
                companyname: company, // Passing the company name
                date: date // Passing the date
            },
            headers: {
                'x-rapidapi-key': '710ddaa271msh3e2a71ebe821325p14697ejsna4b46ea968e1',
                'x-rapidapi-host': 'gaialens-esg-news.p.rapidapi.com',
                'Content-Type': 'text'
            }
        });
        console.log(response.data);
        res.json(response.data); // Send the API response
    } catch (error) {
        console.error('Error fetching ESG data from GaiaLens:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error fetching ESG data from GaiaLens', error: error.message });
    }
};

module.exports = { getEsgData, getEsgDatas, getEsgDatae, getGaiaLensEsgData };
