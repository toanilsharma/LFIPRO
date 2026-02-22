import React, { useState, useCallback, useEffect } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Node,
    Edge,
    Position,
    Handle
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Custom node that looks like a sleek SaaS card with a text input/textarea
const CustomTextInputNode = ({ data, isConnectable }: any) => {
    return (
        <div className="px-4 py-3 shadow-xl rounded-xl bg-white border-2 border-indigo-100 dark:bg-gray-800 dark:border-gray-700 min-w-[250px]">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-indigo-500" />

            <div className="flex flex-col">
                <label className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">{data.label}</label>
                <textarea
                    className="w-full text-sm rounded-md p-2 resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-shown:bg-indigo-50/50 dark:placeholder-shown:bg-indigo-900/20 placeholder-shown:border-indigo-200 dark:placeholder-shown:border-indigo-800/60 placeholder-shown:placeholder:text-indigo-400 dark:placeholder-shown:placeholder:text-indigo-500/70 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                    placeholder={data.placeholder}
                    defaultValue={data.value}
                    onChange={(e) => data.onChange(data.id, e.target.value)}
                    rows={2}
                />
            </div>

            <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-3 h-3 bg-indigo-500" />
        </div>
    );
};

// Root Cause version with different styling
const RootCauseNode = ({ data, isConnectable }: any) => {
    return (
        <div className="px-4 py-3 shadow-2xl rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 border border-rose-400 min-w-[280px]">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="w-3 h-3 bg-white" />
            <div className="flex flex-col">
                <label className="text-xs font-black text-rose-100 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span className="text-white dark:text-white">🎯</span> {data.label}
                </label>
                <textarea
                    className="w-full text-sm bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 rounded-md p-2 text-white dark:text-white placeholder-rose-200 dark:placeholder-rose-300 resize-none focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-white"
                    placeholder={data.placeholder}
                    defaultValue={data.value}
                    onChange={(e) => data.onChange(data.id, e.target.value)}
                    rows={3}
                />
            </div>
        </div>
    );
};

const nodeTypes = {
    textInput: CustomTextInputNode,
    rootCause: RootCauseNode,
};

const initialNodes: Node[] = [
    { id: '1', type: 'textInput', position: { x: 250, y: 0 }, data: { id: '1', label: '1. The Problem', placeholder: 'What went wrong?', value: '' } },
    { id: '2', type: 'textInput', position: { x: 250, y: 150 }, data: { id: '2', label: '2. Why did that happen?', placeholder: 'Because...', value: '' } },
    { id: '3', type: 'textInput', position: { x: 250, y: 300 }, data: { id: '3', label: '3. Why did THAT happen?', placeholder: 'Because...', value: '' } },
    { id: '4', type: 'textInput', position: { x: 250, y: 450 }, data: { id: '4', label: '4. Why did THAT happen?', placeholder: 'Because...', value: '' } },
    { id: '5', type: 'rootCause', position: { x: 235, y: 600 }, data: { id: '5', label: '5. True Root Cause', placeholder: 'The fundamental system failure...', value: '' } },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
    { id: 'e4-5', source: '4', target: '5', animated: true, style: { stroke: '#f43f5e', strokeWidth: 3 } },
];

interface FiveWhysGraphProps {
    onRootCauseChange: (value: string) => void;
    initialRootCause: string;
}

const FiveWhysGraph: React.FC<FiveWhysGraphProps> = ({ onRootCauseChange, initialRootCause }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Hydrate the root cause node on mount if data already exists
    useEffect(() => {
        if (initialRootCause) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === '5') {
                        node.data = { ...node.data, value: initialRootCause };
                    }
                    return node;
                })
            );
        }
    }, [initialRootCause, setNodes]);

    const handleNodeChange = useCallback((nodeId: string, value: string) => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === nodeId) {
                    node.data = { ...node.data, value };
                }
                return node;
            })
        );

        // If it's the 5th Why (Root Cause), push it to global state
        if (nodeId === '5') {
            onRootCauseChange(value);
        }
    }, [setNodes, onRootCauseChange]);

    // Inject the onChange handler into all nodes
    const nodesWithHandlers = nodes.map(node => ({
        ...node,
        data: { ...node.data, onChange: handleNodeChange }
    }));

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } }, eds)),
        [setEdges],
    );

    return (
        <div className="w-full h-[600px] bg-gray-50 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden relative">
            <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-black/50 backdrop-blur text-sm px-3 py-1.5 rounded-full font-bold text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                Interactive 5-Whys Diagram Builder
            </div>
            <ReactFlow
                nodes={nodesWithHandlers}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                attributionPosition="bottom-right"
            >
                <Controls className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 fill-gray-700 dark:fill-gray-300" />
                <Background color="var(--primary)" gap={20} size={1} />
            </ReactFlow>
        </div>
    );
};

export default FiveWhysGraph;
