# Replit Configuration for Personalized Carbon Footprint Calculator

## Overview

This is a client-side web application that calculates users' daily carbon footprints and provides personalized environmental impact reduction suggestions. The app uses interactive visualizations to show emissions breakdowns and compares user data against global averages. It features local storage for history tracking, statistical analysis of user patterns, and trend detection for emission changes over time.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Pure client-side implementation using vanilla JavaScript ES6+
- **Responsive Design**: Bootstrap 5 framework for mobile-first responsive UI components
- **Component Structure**: Modular JavaScript class-based architecture with `CarbonFootprintCalculator` as the main controller
- **State Management**: Browser localStorage for persistent data storage without backend dependency

### Data Processing & Analytics
- **Emission Calculations**: JSON-based emission factors loaded from static `data/emissions.json` file
- **Statistical Analysis**: Client-side computation of mean, standard deviation, and trend analysis using moving averages
- **Scoring Algorithm**: Weighted suggestion system prioritizing actions by potential CO₂ reduction impact
- **Benchmark Comparison**: User footprint comparison against global and regional emission averages

### Visualization Layer
- **Chart.js Integration**: Interactive bar charts for footprint comparisons and pie charts for emission category breakdowns
- **Real-time Updates**: Dynamic chart rendering based on user input changes
- **Responsive Charts**: Bootstrap-integrated responsive design for cross-device compatibility

### User Interface Design
- **Form-based Input**: Bootstrap 5 forms with validation for daily habit data collection (transportation, diet, energy)
- **Modal System**: Bootstrap modals for additional information, history display, and help content
- **Progressive Enhancement**: Tooltip system for user guidance and input explanations
- **Accessibility**: ARIA labels, keyboard navigation support, and high-contrast eco-friendly color scheme

### Data Storage Strategy
- **Local Storage**: Browser-based persistence using `carbonFootprintHistory` key
- **No Backend Dependency**: Completely client-side data management eliminating server requirements
- **Data Structure**: JSON format for calculation history with timestamp and category breakdown storage

## External Dependencies

### Frontend Frameworks & Libraries
- **Bootstrap 5**: CSS framework loaded via CDN for responsive UI components and styling
- **Chart.js**: Visualization library via CDN for interactive carbon footprint charts
- **Font Awesome**: Icon library via CDN for consistent iconography throughout the interface

### Data Sources
- **Static JSON File**: `emissions.json` containing emission factors from EPA, FAO, and EIA databases
- **No External APIs**: Self-contained application with no runtime external service dependencies
- **Reference Data**: Global carbon emission benchmarks and comparison data embedded in JSON configuration

### Development Dependencies
- **Express.js**: Optional lightweight server for local development file serving
- **No Build Process**: Direct file serving without compilation or bundling requirements
- **CDN Dependencies**: All external libraries loaded from content delivery networks for simplified deployment