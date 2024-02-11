import React, { useState } from "react";
import './charts-dialog.css';
import DoughnutChart from "../charts/doughnut-chart/doughnut-chart.tsx";
import BarChart from "../charts/bar-chart/bar-chart.tsx";

interface ChartsDialogProps {
    isChartsDialogVisible: boolean;
    setIsChartsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChartsDialog: React.FC<ChartsDialogProps> = ({ isChartsDialogVisible, setIsChartsDialogVisible }) => {

    const setDialogVisible = () => {
        setIsChartsDialogVisible(!isChartsDialogVisible);
    }

    return (
        <div className="charts-dialog-container">
            <div className="charts-dialog">
                <div className="charts-dialog-content">
                    <div className="charts-dialog-header">
                        <div className="charts-dialog-title">charts</div>
                        <div className="charts-dialog-close pointer" onClick={setDialogVisible}>
                            <span className="pi pi-times">&times;</span>
                        </div>

                    </div>

                    <div className="charts-dialog-body">
                        <DoughnutChart dataset={[300, 200, 50]} labels={["A", "B", "C"]} />
                        <BarChart dataset={[100, 200, 300, 400, 500]} labels={["A", "B", "C", "D", "E"]} label="My First dataset" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartsDialog;
