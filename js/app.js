// Carbon Footprint Calculator Application
// Author: Carbon Calculator Team
// Description: Client-side application for calculating and tracking carbon footprint

class CarbonFootprintCalculator {
    constructor() {
        this.emissionFactors = null;
        this.history = this.loadHistory();
        this.comparisonChart = null;
        this.breakdownChart = null;
        this.currentCalculation = null;
        
        this.init();
    }

    async init() {
        try {
            // Load emission factors
            await this.loadEmissionFactors();
            
            // Initialize tooltips
            this.initializeTooltips();
            
            // Initialize form validation
            this.initializeFormValidation();
            
            // Update statistics if history exists
            this.updateStatistics();
            
            console.log('Carbon Footprint Calculator initialized successfully');
        } catch (error) {
            console.error('Error initializing calculator:', error);
            this.showAlert('Error loading calculator. Please refresh the page.', 'danger');
        }
    }

    async loadEmissionFactors() {
        try {
            const response = await fetch('data/emissions.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.emissionFactors = await response.json();
        } catch (error) {
            console.error('Error loading emission factors:', error);
            // Fallback emission factors
            this.emissionFactors = {
                transport: {
                    car_gas: 0.4,
                    car_electric: 0.15,
                    car_hybrid: 0.25,
                    bus: 0.1,
                    flight_short: 0.25,
                    flight_long: 0.2
                },
                diet: {
                    meat: 7,
                    vegetarian: 3,
                    vegan: 1.5
                },
                energy: {
                    kwh: 0.5
                },
                global_avg: 5000
            };
        }
    }

    initializeTooltips() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    initializeFormValidation() {
        const form = document.getElementById('carbonForm');
        const inputs = form.querySelectorAll('input[type="number"]');
        
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateInput(e.target);
            });
        });
    }

    validateInput(input) {
        const value = parseFloat(input.value);
        
        if (isNaN(value) || value < 0) {
            input.classList.add('is-invalid');
            return false;
        } else {
            input.classList.remove('is-invalid');
            return true;
        }
    }

    calculateFootprint() {
        // Validate all inputs first
        const form = document.getElementById('carbonForm');
        const inputs = form.querySelectorAll('input[type="number"]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showAlert('Please enter valid positive numbers for all fields.', 'warning');
            return;
        }

        // Get form values
        const formData = this.getFormData();
        
        // Calculate emissions
        const emissions = this.performCalculations(formData);
        
        // Store calculation
        this.currentCalculation = {
            date: new Date().toISOString(),
            formData: formData,
            emissions: emissions
        };

        // Save to history
        this.saveToHistory(this.currentCalculation);

        // Display results
        this.displayResults(emissions);
        
        // Update charts
        this.updateCharts(emissions);
        
        // Generate suggestions
        this.generateSuggestions(emissions, formData);
        
        // Update statistics
        this.updateStatistics();
        
        // Check for trends
        this.checkTrends();

        // Show results section with animation
        const resultsSection = document.getElementById('resultsSection');
        resultsSection.style.display = 'block';
        resultsSection.classList.add('fade-in');

        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    getFormData() {
        return {
            carMiles: parseFloat(document.getElementById('carMiles').value) || 0,
            carType: document.getElementById('carType').value,
            publicTransport: parseFloat(document.getElementById('publicTransport').value) || 0,
            flights: parseFloat(document.getElementById('flights').value) || 0,
            flightType: document.getElementById('flightType').value,
            meatMeals: parseInt(document.getElementById('meatMeals').value) || 0,
            vegMeals: parseInt(document.getElementById('vegMeals').value) || 0,
            veganMeals: parseInt(document.getElementById('veganMeals').value) || 0,
            energyUse: parseFloat(document.getElementById('energyUse').value) || 0
        };
    }

    performCalculations(formData) {
        const factors = this.emissionFactors;
        
        // Transportation emissions
        const carEmissions = formData.carMiles * factors.transport[formData.carType];
        const transitEmissions = formData.publicTransport * factors.transport.bus;
        const flightEmissions = (formData.flights / 30) * factors.transport[formData.flightType]; // Monthly to daily
        const totalTransport = carEmissions + transitEmissions + flightEmissions;

        // Diet emissions
        const meatEmissions = formData.meatMeals * factors.diet.meat;
        const vegEmissions = formData.vegMeals * factors.diet.vegetarian;
        const veganEmissions = formData.veganMeals * factors.diet.vegan;
        const totalDiet = meatEmissions + vegEmissions + veganEmissions;

        // Energy emissions
        const totalEnergy = formData.energyUse * factors.energy.kwh;

        // Daily total
        const dailyTotal = totalTransport + totalDiet + totalEnergy;

        return {
            transport: {
                car: carEmissions,
                transit: transitEmissions,
                flights: flightEmissions,
                total: totalTransport
            },
            diet: {
                meat: meatEmissions,
                vegetarian: vegEmissions,
                vegan: veganEmissions,
                total: totalDiet
            },
            energy: {
                total: totalEnergy
            },
            daily: dailyTotal,
            weekly: dailyTotal * 7,
            annual: dailyTotal * 365
        };
    }

    displayResults(emissions) {
        // Update summary numbers
        document.getElementById('dailyFootprint').textContent = emissions.daily.toFixed(1);
        document.getElementById('weeklyFootprint').textContent = emissions.weekly.toFixed(1);
        document.getElementById('annualFootprint').textContent = emissions.annual.toFixed(0);

        // Update progress bar (comparison to global average)
        const globalAvg = this.emissionFactors.global_avg;
        const percentage = Math.min((emissions.annual / globalAvg) * 100, 200); // Cap at 200%
        
        const progressBar = document.getElementById('footprintProgress');
        progressBar.style.width = percentage + '%';
        progressBar.setAttribute('aria-valuenow', percentage);
        
        // Color coding based on comparison
        progressBar.className = 'progress-bar';
        if (percentage <= 80) {
            progressBar.classList.add('bg-success');
        } else if (percentage <= 120) {
            progressBar.classList.add('bg-warning');
        } else {
            progressBar.classList.add('bg-danger');
        }
    }

    updateCharts(emissions) {
        this.updateComparisonChart(emissions);
        this.updateBreakdownChart(emissions);
    }

    updateComparisonChart(emissions) {
        const ctx = document.getElementById('comparisonChart').getContext('2d');
        const globalAvg = this.emissionFactors.global_avg;

        if (this.comparisonChart) {
            this.comparisonChart.destroy();
        }

        this.comparisonChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Your Footprint', 'Global Average'],
                datasets: [{
                    label: 'Annual CO₂ Emissions (kg)',
                    data: [emissions.annual, globalAvg],
                    backgroundColor: [
                        emissions.annual <= globalAvg ? '#198754' : '#dc3545',
                        '#6c757d'
                    ],
                    borderWidth: 0,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.parsed.y.toLocaleString()} kg CO₂/year`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString() + ' kg';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    updateBreakdownChart(emissions) {
        const ctx = document.getElementById('breakdownChart').getContext('2d');

        if (this.breakdownChart) {
            this.breakdownChart.destroy();
        }

        const data = [
            emissions.transport.total,
            emissions.diet.total,
            emissions.energy.total
        ];

        this.breakdownChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Transportation', 'Diet', 'Energy'],
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#198754',
                        '#fd7e14',
                        '#0dcaf0'
                    ],
                    borderWidth: 3,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const percentage = ((context.parsed / data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed.toFixed(1)} kg CO₂ (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    generateSuggestions(emissions, formData) {
        const suggestions = [];
        const factors = this.emissionFactors;

        // Transportation suggestions
        if (formData.carMiles > 10) {
            suggestions.push({
                category: 'Transportation',
                title: 'Reduce Car Usage',
                description: `You drive ${formData.carMiles} miles daily. Consider biking or walking for short trips.`,
                impact: formData.carMiles * 0.5 * factors.transport[formData.carType],
                priority: 'high',
                icon: 'fa-bicycle'
            });
        }

        if (formData.carType === 'car_gas' && formData.carMiles > 5) {
            suggestions.push({
                category: 'Transportation',
                title: 'Switch to Electric Vehicle',
                description: 'Consider switching to an electric or hybrid vehicle for lower emissions.',
                impact: formData.carMiles * (factors.transport.car_gas - factors.transport.car_electric),
                priority: 'medium',
                icon: 'fa-car-battery'
            });
        }

        if (formData.flights > 500) {
            suggestions.push({
                category: 'Transportation',
                title: 'Reduce Air Travel',
                description: 'Consider video conferencing for business meetings or local vacations.',
                impact: (formData.flights / 30) * 0.5 * factors.transport[formData.flightType],
                priority: 'high',
                icon: 'fa-plane'
            });
        }

        // Diet suggestions
        if (formData.meatMeals > 2) {
            suggestions.push({
                category: 'Diet',
                title: 'Reduce Meat Consumption',
                description: `Try "Meatless Monday" or replace 1-2 meat meals with vegetarian options.`,
                impact: (factors.diet.meat - factors.diet.vegetarian) * 2,
                priority: 'high',
                icon: 'fa-leaf'
            });
        }

        if (formData.meatMeals > 0 && formData.veganMeals === 0) {
            suggestions.push({
                category: 'Diet',
                title: 'Try Plant-Based Meals',
                description: 'Incorporate more plant-based meals into your diet for maximum impact.',
                impact: (factors.diet.meat - factors.diet.vegan) * 1,
                priority: 'medium',
                icon: 'fa-seedling'
            });
        }

        // Energy suggestions
        if (formData.energyUse > 10) {
            suggestions.push({
                category: 'Energy',
                title: 'Reduce Energy Consumption',
                description: 'Use LED bulbs, unplug devices, and improve home insulation.',
                impact: formData.energyUse * 0.3 * factors.energy.kwh,
                priority: 'medium',
                icon: 'fa-lightbulb'
            });
        }

        if (formData.energyUse > 15) {
            suggestions.push({
                category: 'Energy',
                title: 'Consider Solar Panels',
                description: 'Install solar panels to reduce reliance on grid electricity.',
                impact: formData.energyUse * 0.8 * factors.energy.kwh,
                priority: 'low',
                icon: 'fa-solar-panel'
            });
        }

        // Sort suggestions by impact (highest first)
        suggestions.sort((a, b) => b.impact - a.impact);

        this.displaySuggestions(suggestions);
    }

    displaySuggestions(suggestions) {
        const container = document.getElementById('suggestions');
        
        if (suggestions.length === 0) {
            container.innerHTML = `
                <div class="alert alert-success" role="alert">
                    <i class="fas fa-check-circle me-2"></i>
                    <strong>Great job!</strong> Your carbon footprint is already quite low. Keep up the good work!
                </div>
            `;
            return;
        }

        let html = '';
        suggestions.forEach((suggestion, index) => {
            const priorityClass = {
                'high': 'border-danger',
                'medium': 'border-warning',
                'low': 'border-info'
            }[suggestion.priority] || 'border-secondary';

            const priorityBadge = {
                'high': 'bg-danger',
                'medium': 'bg-warning text-dark',
                'low': 'bg-info'
            }[suggestion.priority] || 'bg-secondary';

            html += `
                <div class="card suggestion-card ${priorityClass}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div class="flex-grow-1">
                                <h6 class="card-title">
                                    <i class="fas ${suggestion.icon} me-2 text-success"></i>
                                    ${suggestion.title}
                                    <span class="badge ${priorityBadge} ms-2">${suggestion.priority.toUpperCase()}</span>
                                </h6>
                                <p class="card-text small text-muted">${suggestion.description}</p>
                                <small class="text-success">
                                    <strong>Potential savings: ${suggestion.impact.toFixed(1)} kg CO₂/day</strong>
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    saveToHistory(calculation) {
        this.history.unshift(calculation);
        
        // Keep only last 50 entries
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }

        try {
            localStorage.setItem('carbonFootprintHistory', JSON.stringify(this.history));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            this.showAlert('Unable to save calculation history. Storage may be full.', 'warning');
        }
    }

    loadHistory() {
        try {
            const stored = localStorage.getItem('carbonFootprintHistory');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading history:', error);
            return [];
        }
    }

    updateStatistics() {
        if (this.history.length === 0) {
            document.getElementById('statisticsSection').style.display = 'none';
            return;
        }

        const dailyEmissions = this.history.map(entry => entry.emissions.daily);
        
        // Calculate statistics
        const mean = this.calculateMean(dailyEmissions);
        const stdDev = this.calculateStandardDeviation(dailyEmissions, mean);
        
        // Update display
        document.getElementById('avgFootprint').textContent = mean.toFixed(1);
        document.getElementById('stdDevFootprint').textContent = stdDev.toFixed(1);
        document.getElementById('totalEntries').textContent = this.history.length;
        
        document.getElementById('statisticsSection').style.display = 'block';
    }

    calculateMean(values) {
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    }

    calculateStandardDeviation(values, mean) {
        const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
        const meanSquaredDiff = this.calculateMean(squaredDifferences);
        return Math.sqrt(meanSquaredDiff);
    }

    checkTrends() {
        if (this.history.length < 5) return;

        const recentEntries = this.history.slice(0, 5);
        const olderEntries = this.history.slice(5, 10);

        if (olderEntries.length < 3) return;

        const recentAvg = this.calculateMean(recentEntries.map(e => e.emissions.daily));
        const olderAvg = this.calculateMean(olderEntries.map(e => e.emissions.daily));

        const changePercent = ((recentAvg - olderAvg) / olderAvg) * 100;

        if (Math.abs(changePercent) > 10) {
            const trend = changePercent > 0 ? 'increasing' : 'decreasing';
            const message = `Your carbon footprint has been ${trend} by ${Math.abs(changePercent).toFixed(1)}% recently.`;
            
            this.showTrendAlert(message, changePercent > 0 ? 'warning' : 'success');
        }
    }

    showTrendAlert(message, type) {
        const alertDiv = document.getElementById('trendAlert');
        const messageSpan = document.getElementById('trendMessage');
        
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        messageSpan.textContent = message;
        alertDiv.style.display = 'block';
    }

    showAlert(message, type = 'info') {
        // Create temporary alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container');
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }

    // History management functions
    showHistory() {
        this.displayHistory();
        document.getElementById('historySection').style.display = 'block';
        document.getElementById('historySection').scrollIntoView({ behavior: 'smooth' });
    }

    hideHistory() {
        document.getElementById('historySection').style.display = 'none';
    }

    displayHistory() {
        const tbody = document.getElementById('historyTableBody');
        
        if (this.history.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted">
                        No calculation history available. Start by calculating your carbon footprint!
                    </td>
                </tr>
            `;
            return;
        }

        let html = '';
        this.history.forEach((entry, index) => {
            const date = new Date(entry.date);
            html += `
                <tr>
                    <td>${date.toLocaleDateString()}</td>
                    <td>${entry.emissions.daily.toFixed(1)}</td>
                    <td>${entry.emissions.annual.toFixed(0)}</td>
                    <td>${entry.emissions.transport.total.toFixed(1)}</td>
                    <td>${entry.emissions.diet.total.toFixed(1)}</td>
                    <td>${entry.emissions.energy.total.toFixed(1)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-danger" onclick="calculator.deleteHistoryEntry(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = html;
    }

    deleteHistoryEntry(index) {
        if (confirm('Are you sure you want to delete this entry?')) {
            this.history.splice(index, 1);
            localStorage.setItem('carbonFootprintHistory', JSON.stringify(this.history));
            this.displayHistory();
            this.updateStatistics();
        }
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
            this.history = [];
            localStorage.removeItem('carbonFootprintHistory');
            this.displayHistory();
            this.updateStatistics();
            this.showAlert('History cleared successfully.', 'info');
        }
    }
}

// Global instance
let calculator;

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', function() {
    calculator = new CarbonFootprintCalculator();
});

// Global functions for HTML onclick handlers
function calculateFootprint() {
    calculator.calculateFootprint();
}

function showHistory() {
    calculator.showHistory();
}

function hideHistory() {
    calculator.hideHistory();
}

function clearHistory() {
    calculator.clearHistory();
}

// Simple HTTP server for local development
if (typeof module !== 'undefined' && module.exports) {
    const express = require('express');
    const path = require('path');
    
    const app = express();
    const PORT = 5000;
    
    // Serve static files
    app.use(express.static(__dirname));
    
    // Serve index.html for root route
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
    
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Carbon Footprint Calculator running on http://0.0.0.0:${PORT}`);
    });
    
    module.exports = app;
}
