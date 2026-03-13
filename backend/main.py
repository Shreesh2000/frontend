from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from backend.services.pipeline_service import PipelineService

app = FastAPI()

# Allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    """
    Endpoint for Part 4 of the assessment.
    Calculates nodes, edges, and checks for DAG status.
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = PipelineService.is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes, 
        'num_edges': num_edges, 
        'is_dag': is_dag
    }
