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
    dataset: number[];
    labels: string[];
    title: string;  
    label?: string;
}

const ChartsDialog: React.FC<ChartsDialogProps> = ({ isChartsDialogVisible, setIsChartsDialogVisible }) => {
    const [charts, setCharts] = useState<ChartData[]>([]); 
    const [newChartType, setNewChartType] = useState<'doughnut' | 'bar'>('doughnut'); 
    const [newDataset, setNewDataset] = useState<number[]>([100, 200]); 
    const [newLabels, setNewLabels] = useState<string[]>(["Label 1", "Label 2"]); 
    const [newTitle, setNewTitle] = useState<string>("Chart Title"); 
    const [editIndex, setEditIndex] = useState<number | null>(null); 

    useEffect(() => {
        if (isChartsDialogVisible) {
            const storedCharts = localStorage.getItem('charts');
            if (storedCharts) {
                const parsedCharts: ChartData[] = JSON.parse(storedCharts);
                setCharts(parsedCharts);
            } else {
                setCharts([]); 
            }
        }
    }, [isChartsDialogVisible]);

    const setDialogVisible = () => {
        setIsChartsDialogVisible(!isChartsDialogVisible);
    };

    const resetForm = () => {
        setNewChartType('doughnut');
        setNewDataset([100, 200]);
        setNewLabels(["Label 1", "Label 2"]);
        setNewTitle("Chart Title");
        setEditIndex(null); // Reset editing
    };

    const addOrUpdateChart = () => {
        const updatedChart: ChartData = {
            type: newChartType,
            dataset: newDataset,
            labels: newLabels,
            title: newTitle,
            label: newChartType === 'bar' ? "Data" : undefined
        };

        setCharts(prevCharts => {
            let updatedCharts;
            if (editIndex !== null) { 
                updatedCharts = prevCharts.map((chart, i) => (i === editIndex ? updatedChart : chart));
                setEditIndex(null); 
            } else {
                updatedCharts = [updatedChart, ...prevCharts];
            }
            localStorage.setItem('charts', JSON.stringify(updatedCharts)); 
            return updatedCharts;
        });

        resetForm(); // Reset form after adding or updating
    };

    const editChart = (index: number) => {
        const chartToEdit = charts[index];
        setNewChartType(chartToEdit.type);
        setNewDataset(chartToEdit.dataset);
        setNewLabels(chartToEdit.labels);
        setNewTitle(chartToEdit.title);
        setEditIndex(index); 
    };

    const renderChart = (chart: ChartData, index: number) => {
        return (
            <div className="chart-container" key={index}>
                <p className="chart-title">{chart.title}</p>
                {chart.type === 'doughnut' && (
                    <DoughnutChart dataset={chart.dataset} labels={chart.labels} />
                )}
                {chart.type === 'bar' && (
                    <BarChart dataset={chart.dataset} labels={chart.labels} label={chart.label || "Chart"} />
                )}
                <div className="chart-actions">
                    <button className="edit-chart-btn" onClick={() => editChart(index)}>
                        Edit
                    </button>
                    <button className="delete-chart-btn" onClick={() => removeChart(index)}>
                        Delete
                    </button>
                </div>
            </div>
        );
    };

    const removeChart = (index: number) => {
        const updatedCharts = charts.filter((_, i) => i !== index);
        setCharts(updatedCharts);
        localStorage.setItem('charts', JSON.stringify(updatedCharts));
    };

    return (
        <Draggable handle=".charts-dialog-header">
            <div className="charts-dialog-container">
                <div className="charts-dialog">
                    <div className="charts-dialog-content">
                        <div className="charts-dialog-header">
                            <div className="charts-dialog-title">Charts</div>
                            <div className="charts-dialog-close pointer" onClick={setDialogVisible}>
                                <span className="pi pi-times">&times;</span>
                            </div>
                        </div>
                        <div className="charts-dialog-body">
                            <div className="new-chart-controls">
                                <div>
                                    <label>Chart Type:</label>
                                    <select value={newChartType} onChange={(e) => setNewChartType(e.target.value as 'doughnut' | 'bar')}>
                                        <option value="doughnut">Doughnut</option>
                                        <option value="bar">Bar</option>
                                    </select>
                                </div>
                                <div className="new-chart-content">
                                    <label>Data (comma-separated):</label>
                                    <input 
                                        type="text" 
                                        value={newDataset.join(',')} 
                                        onChange={(e) => setNewDataset(e.target.value.split(',').map(Number))}
                                    />
                                </div>
                                <div className="new-chart-content">
                                    <label>Labels (comma-separated):</label>
                                    <input 
                                        type="text" 
                                        value={newLabels.join(',')} 
                                        onChange={(e) => setNewLabels(e.target.value.split(','))}
                                    />
                                </div>
                                <div className="new-chart-content">
                                    <label>Chart Title:</label>
                                    <input 
                                        type="text" 
                                        value={newTitle} 
                                        onChange={(e) => setNewTitle(e.target.value)}
                                    />
                                </div>
                                <div className="chart-buttons">
                                    <button onClick={addOrUpdateChart}>
                                        {editIndex !== null ? "Update Chart" : "Add Chart"}
                                    </button>
                                    {editIndex !== null && (
                                        <button onClick={resetForm} className="cancel-edit-btn">
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="charts-container">
                                {charts.map((chart, index) => renderChart(chart, index))} 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default ChartsDialog;
