const express = require('express');
const router = express.Router();

// Mock data for demonstration
let data = [
    { id: 1, name: 'Tesla', models: ['Model S', 'Model 3', 'Model X', 'Model Y'] },
    { id: 2, name: 'Toyota', models: ['Corolla', 'Camry', 'Rav4', 'Prius'] },
    { id: 3, name: 'Honda', models: ['Civic', 'Accord', 'CR-V', 'Pilot'] }
];

// CRUD operations
router.post('/create', (req, res) => {
    const newCar = req.body; // assuming the body contains the new car to be added
    newCar.id = data.length + 1;
    data.push(newCar);
    res.json(newCar);
});

router.get('/read', (req, res) => {
    res.json(data);
});

router.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateCar = req.body; // assuming the body contains the updated car
    const index = data.findIndex(car => car.id === id);
    if (index !== -1) {
        data[index] = { ...data[index], ...updateCar };
        res.json(data[index]);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

router.delete('/delete/:id', (req, res) => {


    
    const id = parseInt(req.params.id);
    const index = data.findIndex(car => car.id === id);
    if (index !== -1) {
        const deletedCar = data.splice(index, 1);
        res.json(deletedCar);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

module.exports = router;
