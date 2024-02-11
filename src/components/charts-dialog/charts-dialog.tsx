import React, { useEffect, useState } from "react";
import './charts-dialog.css';
import DoughnutChart from "../charts/doughnut-chart/doughnut-chart.tsx";
import BarChart from "../charts/bar-chart/bar-chart.tsx";

interface ChartsDialogProps {
    isChartsDialogVisible: boolean;
    setIsChartsDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
    visits: string | null;
}

const ChartsDialog: React.FC<ChartsDialogProps> = ({ isChartsDialogVisible, setIsChartsDialogVisible, visits }) => {
    const [fps, setFps] = useState<number>(0);
    const [memoryUsedMB, setMemoryUsedMB] = useState<number>(0);
    const visitsNumber = parseInt(visits as string);

    const setDialogVisible = () => {
        setIsChartsDialogVisible(!isChartsDialogVisible);
    }

    useEffect(() => {
        let lastFrameTime = performance.now();
        let frameCount = 0;
        let frameId: number;

        const measureFPS = () => {
            const now = performance.now();
            const elapsed = now - lastFrameTime;

            if (elapsed >= 1000) {
                const currentFPS = Math.round((frameCount * 1000) / elapsed);
                setFps(currentFPS);
                frameCount = 0;
                lastFrameTime = now;
            }

            frameCount++;
            frameId = requestAnimationFrame(measureFPS);
        };

        frameId = requestAnimationFrame(measureFPS);

        
        if (window.performance && (window.performance as any).memory) {
            const memoryInfo = (window.performance as any).memory;
            const usedMemoryMB = parseFloat((memoryInfo.usedJSHeapSize / (1024 * 1024)).toFixed(2));
            setMemoryUsedMB(usedMemoryMB);
        }

        return () => cancelAnimationFrame(frameId);
    }, []);

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
                        <DoughnutChart dataset={[visitsNumber, 1000]} labels={["Visits", "Goal"]} />
                        <BarChart dataset={[memoryUsedMB, fps]} labels={["Memory Used (MB)", "FPS"]} label="Performance indicator" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartsDialog;
