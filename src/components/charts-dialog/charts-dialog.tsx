import React, { useState, useEffect } from "react";
import Draggable from 'react-draggable'; 
import './charts-dialog.css';
import DoughnutChart from "../charts/doughnut-chart/doughnut-chart.tsx";
import BarChart from "../charts/bar-chart/bar-chart.tsx";

interface ChartsDialogProps {
    isChartsDialogVisible: boolean;
    setIsChartsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChartData {
    type: 'doughnut' | 'bar';
    dataset: { value: number; label: string }[];
    title: string;  
}

const ChartsDialog: React.FC<ChartsDialogProps> = ({ isChartsDialogVisible, setIsChartsDialogVisible }) => {
    const [charts, setCharts] = useState<ChartData[]>([]); 
    const [newChartType, setNewChartType] = useState<'doughnut' | 'bar'>('doughnut'); 
    const [newDataset, setNewDataset] = useState<{ value: number; label: string }[]>([]); 
    const [newDataPoint, setNewDataPoint] = useState<string>(""); 
    const [newLabel, setNewLabel] = useState<string>(""); 
    const [newTitle, setNewTitle] = useState<string>("Chart Title"); 
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [newChart, setNewChart] = useState<boolean>(false);

    useEffect(() => {
        if (isChartsDialogVisible) {
            const storedCharts = localStorage.getItem('charts');
            if (storedCharts) {
                const parsedCharts: ChartData[] = JSON.parse(storedCharts);
                setCharts(parsedCharts);
            } else {
                // Setting up a default chart
                const exampleChart: ChartData = {
                    type: 'doughnut',
                    dataset: [{ value: 150, label: "Example A" }, { value: 250, label: "Example B" }],
                    title: "Example Chart"
                };
                setCharts([exampleChart]);
                localStorage.setItem('charts', JSON.stringify([exampleChart]));
            }
        }
    }, [isChartsDialogVisible]);

    const setDialogVisible = () => {
        setIsChartsDialogVisible(!isChartsDialogVisible);
    };

    const resetForm = () => {
        setNewChart(false);
        setNewChartType('doughnut');
        setNewDataset([]);
        setNewTitle("Chart Title");
        setEditIndex(null); 
    };

    const addOrUpdateChart = () => {      
        if (newDataset.length === 0) {
            window.alert("Please add at least one data point before creating the chart.");
            return; // Exit the function if there are no data points
        }
    
        const updatedChart: ChartData = {
            type: newChartType,
            dataset: newDataset,
            title: newTitle,
        };
    
        setCharts(prevCharts => {
            const updatedCharts = editIndex !== null
                ? prevCharts.map((chart, i) => (i === editIndex ? updatedChart : chart))
                : [updatedChart, ...prevCharts];
            localStorage.setItem('charts', JSON.stringify(updatedCharts)); 
            return updatedCharts;
        });
    
        resetForm(); 
    };

    const createNewChart = () => {
        setNewChart(true);
    };

    const clearAllCharts = () => {
        if (window.confirm("Are you sure you want to delete all charts?")) {
            setCharts([]);
            localStorage.removeItem('charts');
        }
    };

    const handleAddDataPoint = () => {
        const value = parseFloat(newDataPoint);
        if (newDataPoint.trim() === "" || newLabel.trim() === "") {
            window.alert("Please enter both a data point and a label.");
            return; // Exit the function early if fields are empty
        }
        if (!isNaN(value)) {
            setNewDataset([...newDataset, { value, label: newLabel }]);
            setNewDataPoint("");
            setNewLabel("");
        } else {
            window.alert("Please enter a valid number for the data point.");
        }
    };    

    const handleRemoveDataPoint = (index: number) => {
        setNewDataset(newDataset.filter((_, i) => i !== index));
    };

    const editChart = (index: number) => {
        const chartToEdit = charts[index];
        setNewChartType(chartToEdit.type);
        setNewDataset(chartToEdit.dataset);
        setNewTitle(chartToEdit.title);
        setEditIndex(index);
        setNewChart(true);  // Open the new chart form with pre-filled data
    };

    const renderChart = (chart: ChartData, index: number) => (
        <div className="chart-container" key={index}>
            <p className="chart-title">{chart.title}</p>
            {chart.type === 'doughnut' && (
                <DoughnutChart dataset={chart.dataset.map(d => d.value)} labels={chart.dataset.map(d => d.label)} />
            )}
            {chart.type === 'bar' && (
                <BarChart dataset={chart.dataset.map(d => d.value)} labels={chart.dataset.map(d => d.label)} label="Data" />
            )}
            <div className="chart-actions">
                <button onClick={() => editChart(index)}>Edit</button>
                <button onClick={() => confirmRemoveChart(index)}>Delete</button> {}
                <button className="move-left-btn" onClick={() => moveChartLeft(index)}>
                ←
                </button>
                <button className="move-right-btn" onClick={() => moveChartRight(index)}>
                →
                </button>
            </div>
        </div>
    );

    const confirmRemoveChart = (index: number) => {
        if (window.confirm("Are you sure you want to delete this chart?")) {
            removeChart(index);
        }
    };

    const removeChart = (index: number) => {        
        const updatedCharts = charts.filter((_, i) => i !== index);
        setCharts(updatedCharts);
        localStorage.setItem('charts', JSON.stringify(updatedCharts));
    };
    
    const moveChartLeft = (index: number) => {        
        // Move chart left in the list
        if (index > 0) {
            const updatedCharts = [...charts];
            [updatedCharts[index - 1], updatedCharts[index]] = [updatedCharts[index], updatedCharts[index - 1]];
            setCharts(updatedCharts);
            localStorage.setItem('charts', JSON.stringify(updatedCharts));
        }
    };

    const moveChartRight = (index: number) => {
        // Move chart right in the list
        if (index < charts.length - 1) {
            const updatedCharts = [...charts];
            [updatedCharts[index], updatedCharts[index + 1]] = [updatedCharts[index + 1], updatedCharts[index]];
            setCharts(updatedCharts);
            localStorage.setItem('charts', JSON.stringify(updatedCharts));
        }
    };

    return (
        <Draggable handle=".charts-dialog-header">
            <div className="charts-dialog-container">
                <div className="charts-dialog">
                    <div className="charts-dialog-content">
                        <div className="charts-dialog-header">
                            <div className="charts-dialog-title">Charts</div>
                            <div className="charts-dialog-close pointer" onClick={setDialogVisible}>
                                <span>&times;</span>
                            </div>
                        </div>
                        <div className="charts-dialog-body">
                            {newChart ? (
                                <div className="new-chart-controls">
                                    <div>
                                        <label>Chart Type:</label>
                                        <select value={newChartType} onChange={(e) => setNewChartType(e.target.value as 'doughnut' | 'bar')}>
                                            <option value="doughnut">Doughnut</option>
                                            <option value="bar">Bar</option>
                                        </select>
                                    </div>
                                    <div className="data-input">
                                        <label>Chart Title:</label>
                                        <input 
                                            type="text" 
                                            value={newTitle} 
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            maxLength={30}
                                        />
                                    </div>
                                    <div className="data-input">
                                        <label>Label:</label>
                                        <input 
                                            type="text" 
                                            value={newLabel} 
                                            onChange={(e) => setNewLabel(e.target.value)}
                                            placeholder="Enter label" 
                                        />
                                    </div>
                                    <div className="data-input">
                                        <label>Data Point:</label>
                                        <input 
                                            type="number" 
                                            value={newDataPoint} 
                                            onChange={(e) => setNewDataPoint(e.target.value)}
                                            placeholder="Enter data value" 
                                        />
                                    </div>
                                    <button className="add-data-point" onClick={handleAddDataPoint}>Add Data Point</button>
                                    <div className="data-pills">
                                        {newDataset.map((data, index) => (
                                            <div key={index} className="data-pill">
                                                {`${data.label}: ${data.value}`}
                                                <button onClick={() => handleRemoveDataPoint(index)}>&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chart-buttons">
                                        <button onClick={addOrUpdateChart}>
                                            {editIndex !== null ? "Update Chart" : "Add Chart"}
                                        </button>
                                        <button onClick={resetForm}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="chart-buttons">
                                    <button onClick={createNewChart}>New Chart</button>
                                    <button onClick={clearAllCharts}>Clear All Charts</button>
                                </div>
                            )}
                            {
                                charts.length !== 0 ?
                                    <div className="charts-container">
                                        {charts.map((chart, index) => renderChart(chart, index))}
                                    </div> : null
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default ChartsDialog;
