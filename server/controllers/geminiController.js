import { getAccountBalance, getMarketData } from "../gemini/geminiservice.js";

const getBalance = async (req, res) => {
  try {
    const balance = await getAccountBalance();
    res.status(200).json(balance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching account balance', error });
  }
};

const getTicker = async (req, res) => {
  const { symbol } = req.params;

  try {
    const marketData = await getMarketData(symbol);
    res.status(200).json(marketData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching market data', error });
  }
};

export { getBalance, getTicker };