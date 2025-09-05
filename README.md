# 🌱 Personalized Carbon Footprint Calculator

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple)
![Chart.js](https://img.shields.io/badge/Chart.js-Latest-orange)
![Flask](https://img.shields.io/badge/Flask-3.1.2-red)
![Responsive](https://img.shields.io/badge/responsive-mobile--first-lightblue)

A comprehensive, client-side web application that helps users calculate their daily carbon footprint and provides personalized environmental impact reduction suggestions. Built with modern web technologies and featuring interactive visualizations, statistical analysis, and trend detection.

## 🌟 Features

### 🧮 Core Functionality
- **Daily Footprint Calculation**: Calculate CO₂ emissions from transportation, diet, and energy consumption
- **Interactive Visualizations**: Dynamic bar charts comparing to global averages and pie charts showing emission breakdowns
- **Personalized Suggestions**: AI-driven recommendations based on user's highest-impact categories
- **History Tracking**: Persistent local storage of calculations with comprehensive statistical analysis
- **Trend Analysis**: Real-time detection of increasing/decreasing emission patterns over time
- **Benchmark Comparison**: Compare footprint against global and regional emission averages

### 📊 Data Science Integration
- **Statistical Analysis**: Calculate mean, standard deviation, and variance of user's footprint history
- **Weighted Scoring Algorithm**: Prioritize suggestions by potential CO₂ reduction impact
- **Trend Detection**: Moving average calculations to identify emission pattern changes
- **Performance Metrics**: Track improvement over time with visual progress indicators

### 🎨 User Experience
- **Responsive Design**: Mobile-first approach with Bootstrap 5 framework
- **Interactive Tooltips**: Contextual help and explanations throughout the interface
- **Real-time Validation**: Form input validation with immediate feedback
- **Accessibility**: ARIA labels, keyboard navigation, and high-contrast design
- **Eco-friendly Theme**: Custom green color palette promoting environmental awareness

## 🚀 Technology Stack

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom styling with CSS variables and responsive design
- **JavaScript (ES6+)**: Modern vanilla JavaScript with class-based architecture
- **Bootstrap 5**: Responsive UI framework
- **Chart.js**: Interactive data visualization library
- **Font Awesome**: Comprehensive icon library

### Backend (Development Server)
- **Python 3.11+**: Modern Python runtime
- **Flask 3.1.2**: Lightweight web framework for serving static files
- **Gunicorn**: WSGI HTTP server for production deployment

### Data & Storage
- **JSON**: Emission factors from EPA, FAO, and EIA databases
- **localStorage**: Client-side persistence for calculation history
- **No External APIs**: Self-contained application with offline capabilities

## 📱 Demo

The application features a clean, intuitive interface with:
- **Input Form**: Easy-to-use forms for transportation, diet, and energy data
- **Results Dashboard**: Visual representation of carbon footprint calculations
- **Comparison Charts**: Interactive charts showing user vs. global averages
- **History Tracking**: Comprehensive view of past calculations and trends
- **Suggestion Engine**: Personalized recommendations for emission reduction

## 🛠️ Installation & Setup

### Quick Start (Replit)
The application is ready to run on Replit:
1. **Fork this Repl**: Click the fork button to create your own copy
2. **Run**: Click the "Run" button to start the application
3. **Access**: Open the web view to use the calculator

### Local Development

#### Prerequisites
- Python 3.11 or higher
- Modern web browser (Chrome, Firefox, Safari, Edge)

#### Setup Instructions
```bash
# Clone the repository
git clone https://github.com/yourusername/carbon-footprint-calculator.git
cd carbon-footprint-calculator

# Install dependencies (if using Python server)
pip install flask

# Run the development server
python main.py
```

#### Alternative: Static File Serving
```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

### Production Deployment

#### Replit Deployment
1. **Configure Domain**: Set up custom domain in Replit settings
2. **Environment Variables**: Configure any necessary environment variables
3. **Deploy**: Use Replit's built-in deployment features

#### GitHub Pages
1. **Upload to GitHub**: Create repository and upload files
2. **Enable Pages**: Settings > Pages > Deploy from branch
3. **Access**: Visit `https://yourusername.github.io/repository-name`

#### Traditional Hosting
1. **Upload Files**: Upload all files to web server
2. **Configure Server**: Ensure server can serve static files
3. **Test**: Verify all resources load correctly

## 🎯 Usage Guide

### Basic Usage
1. **Open Application**: Navigate to the hosted URL or local server
2. **Input Data**: Fill in daily transportation, diet, and energy usage
3. **Calculate**: Click "Calculate Footprint" to generate results
4. **Review Results**: Examine your carbon footprint and personalized suggestions
5. **Track Progress**: View history and trends over time

### Advanced Features

#### Transportation Tracking
- **Vehicle Types**: Support for gasoline, electric, and hybrid vehicles
- **Public Transport**: Bus, train, and other public transportation options
- **Air Travel**: Short-haul and long-haul flight emissions

#### Diet Analysis
- **Meal Categories**: Meat, vegetarian, and vegan meal tracking
- **Impact Calculation**: CO₂ emissions per meal type
- **Dietary Suggestions**: Recommendations for lower-impact food choices

#### Energy Monitoring
- **Electricity Usage**: Track daily kWh consumption
- **Regional Factors**: Emission factors based on energy grid composition
- **Efficiency Tips**: Suggestions for reducing energy consumption

### Data Export/Import
- **History Export**: Download calculation history as JSON
- **Data Backup**: Manual backup and restore functionality
- **Privacy**: All data stored locally, no external transmission

## 📊 Emission Factors & Data Sources

### Transportation
- **Gasoline Car**: 0.4 kg CO₂/mile (EPA Vehicle Emissions Database)
- **Electric Car**: 0.15 kg CO₂/mile (including grid emissions)
- **Hybrid Car**: 0.25 kg CO₂/mile (combined efficiency rating)
- **Public Transport**: 0.1 kg CO₂/mile (average across bus/rail)
- **Short-haul Flights**: 0.25 kg CO₂/mile (< 1500 miles)
- **Long-haul Flights**: 0.2 kg CO₂/mile (> 1500 miles)

### Diet
- **Meat Meal**: 7.0 kg CO₂ (FAO Food and Agriculture Organization)
- **Vegetarian Meal**: 3.0 kg CO₂ (plant-based proteins)
- **Vegan Meal**: 1.5 kg CO₂ (plant-only ingredients)

### Energy
- **Electricity**: 0.5 kg CO₂/kWh (EIA Energy Information Administration)

### Global Benchmarks
- **Global Average**: 5,000 kg CO₂/year per person
- **Excellent**: < 2,000 kg CO₂/year
- **Good**: 2,000-3,500 kg CO₂/year
- **Average**: 3,500-5,000 kg CO₂/year
- **Poor**: 5,000-7,500 kg CO₂/year
- **Very Poor**: > 7,500 kg CO₂/year

## 🗂️ Project Structure

```
carbon-footprint-calculator/
├── index.html              # Main application HTML
├── main.py                 # Flask development server
├── pyproject.toml          # Python dependencies
├── README.md               # Project documentation
├── replit.md               # Replit configuration
├── css/
│   └── styles.css          # Custom CSS styles
├── js/
│   └── app.js              # Main JavaScript application
├── data/
│   └── emissions.json      # Emission factors database
└── attached_assets/
    └── project-docs/       # Additional documentation
```

### Key Files Description

#### Frontend Files
- **`index.html`**: Main application interface with Bootstrap components
- **`css/styles.css`**: Custom CSS with eco-friendly theme and responsive design
- **`js/app.js`**: Core application logic with ES6+ class-based architecture

#### Data Files
- **`data/emissions.json`**: Comprehensive emission factors from credible sources
- **`replit.md`**: Project configuration and user preferences

#### Backend Files
- **`main.py`**: Flask server for static file serving and development
- **`pyproject.toml`**: Python project configuration and dependencies

## 🔧 API Reference

### CarbonFootprintCalculator Class

#### Constructor
```javascript
const calculator = new CarbonFootprintCalculator();
```

#### Core Methods
```javascript
// Calculate footprint from form data
calculator.calculateFootprint()

// Load calculation history
calculator.loadHistory()

// Generate personalized suggestions
calculator.generateSuggestions(emissions)

// Update visualization charts
calculator.updateCharts(data)

// Perform statistical analysis
calculator.updateStatistics()
```

#### Data Structures
```javascript
// Calculation result object
{
  date: "2024-01-01T12:00:00.000Z",
  daily: 15.2,
  weekly: 106.4,
  annual: 5548,
  breakdown: {
    transport: 8.5,
    diet: 4.2,
    energy: 2.5
  }
}
```

### Local Storage Schema
```javascript
// Storage key: 'carbonFootprintHistory'
[
  {
    date: "ISO timestamp",
    daily: "number (kg CO₂)",
    breakdown: {
      transport: "number",
      diet: "number", 
      energy: "number"
    }
  }
]
```

## 🤝 Contributing

We welcome contributions to improve the Carbon Footprint Calculator! Here's how you can help:

### Development Setup
1. **Fork the Repository**: Create your own copy on GitHub
2. **Clone Locally**: `git clone https://github.com/yourusername/carbon-footprint-calculator.git`
3. **Create Branch**: `git checkout -b feature/your-feature-name`
4. **Make Changes**: Implement your improvements
5. **Test Thoroughly**: Ensure all functionality works correctly
6. **Submit PR**: Create a pull request with detailed description

### Contribution Guidelines
- **Code Style**: Follow existing JavaScript and CSS conventions
- **Documentation**: Update README and inline comments as needed
- **Testing**: Verify changes work across different browsers
- **Accessibility**: Maintain WCAG compliance standards
- **Performance**: Ensure changes don't impact loading times

### Areas for Improvement
- **New Emission Categories**: Waste, shopping, home improvements
- **Advanced Analytics**: Machine learning for better predictions
- **Social Features**: Compare with friends, community challenges
- **Mobile App**: React Native or Progressive Web App version
- **Internationalization**: Multi-language support
- **Data Visualization**: Additional chart types and insights

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Carbon Footprint Calculator Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

### Data Sources
- **EPA**: Environmental Protection Agency for vehicle emission factors
- **FAO**: Food and Agriculture Organization for dietary emission data
- **EIA**: Energy Information Administration for electricity emission factors
- **IPCC**: Intergovernmental Panel on Climate Change for global benchmarks
- **Carbon Trust**: Additional emission factor validation and guidelines

### Technologies
- **Bootstrap Team**: For the excellent responsive framework
- **Chart.js Team**: For the powerful visualization library
- **Font Awesome**: For the comprehensive icon collection
- **Flask Team**: For the lightweight Python web framework

### Inspiration
- **Climate Action**: Inspired by the urgent need for individual climate action
- **Open Source Community**: Built with and for the open source ecosystem
- **Environmental Organizations**: Guided by best practices from leading environmental groups

## 🌍 Environmental Impact

This application itself has a minimal carbon footprint:
- **Client-side Processing**: Reduces server energy consumption
- **Efficient Code**: Optimized JavaScript for fast loading
- **Static Hosting**: Can be served from green energy providers
- **No External APIs**: Reduces network requests and data transfer

## 🔮 Future Roadmap

### Version 2.0 Features
- [ ] **Carbon Offset Integration**: Connect with verified offset providers
- [ ] **Smart Recommendations**: ML-powered suggestion engine
- [ ] **Goal Setting**: Personal emission reduction targets
- [ ] **Social Sharing**: Share achievements and compete with friends
- [ ] **Advanced Analytics**: Detailed trend analysis and forecasting

### Version 3.0 Vision
- [ ] **IoT Integration**: Connect with smart home devices
- [ ] **Blockchain Verification**: Transparent carbon credit tracking
- [ ] **AR Visualization**: Augmented reality emission impact display
- [ ] **Corporate Dashboard**: Business and organization tracking
- [ ] **API Platform**: Public API for third-party integrations

---

**Made with 🌱 for a sustainable future**

*This project is part of the global effort to increase awareness about personal carbon footprints and promote environmental responsibility. Every calculation counts towards a greener planet.*
