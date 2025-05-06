# Akash  Parmar﻿

# Loan Calculator App

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Material UI](https://img.shields.io/badge/Material%20UI-5.14.3-purple.svg)](https://mui.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

A modern, feature-rich loan calculator web application built with React and Material UI. Calculate loan EMIs (Equated Monthly Installments), view detailed amortization schedules, and see real-time currency conversions using live exchange rates.

## ✨ Features

- 💰 Loan EMI calculation using standard financial formulas
- 📊 Dynamic amortization schedule with monthly breakdown
- 💱 Real-time currency conversion using ExchangeRate API
- 🌐 Support for multiple currencies with live exchange rates
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🎯 Precise calculations with detailed breakdowns
- 🔄 Auto-refreshing exchange rates

## 🚀 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Akashparmar1/LoanCalculator.git
cd LoanCalculator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_EXCHANGE_RATE_API_KEY=your_api_key
VITE_EXCHANGE_RATE_API_BASE_URL=https://v6.exchangerate-api.com/v6
```

4. Start the development server:
```bash
npm run dev
```

## 💻 Usage

1. Select your preferred currency from the dropdown menu
2. Enter the loan amount
3. Specify the interest rate
4. Set the loan term in months
5. Click "Calculate" to view results
6. Navigate to detailed views using the navigation menu

### Loan Calculation Formula

EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]

Where:
- P = Principal loan amount
- R = Monthly interest rate (annual rate / 12 / 100)
- N = Loan term in months

## ⚙️ Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_EXCHANGE_RATE_API_KEY` | Your ExchangeRate API key |
| `VITE_EXCHANGE_RATE_API_BASE_URL` | ExchangeRate API base URL |

## 🔌 API Integration

### ExchangeRate API

The app uses the [ExchangeRate API](https://www.exchangerate-api.com/) for currency conversion:

- Base URL: `https://v6.exchangerate-api.com/v6`
- Endpoints:
  - `/latest/{currency}` - Get latest exchange rates
  - `/codes` - Get supported currencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features

## 🧪 Testing

Run the test suite:

```bash
npm run test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Project Link: [Click Here]([https://loancalc-by-krishna.netlify.app/](https://loan-calculator-eta-blue.vercel.app/))

## 🙏 Acknowledgments

- [Material UI](https://mui.com/) for the component library
- [ExchangeRate API](https://www.exchangerate-api.com/) for currency conversion
- [React](https://reactjs.org/) for the frontend framework
