from fastapi import FastAPI
import pandas as pd
import duckdb
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

import os
# Get the current working directory
cwd = os.getcwd()

# Construct the desired file path
file_path = os.path.join(cwd, '..', '01data','interim', 'mydb.db')



app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_timeseries_subset_bytimestamp(db_conn, variable, organization, start_time, end_time):
    query = """
        SELECT value, timestamp
        FROM timeseries_dataset
        WHERE variable = ?
          AND organization = ?
          AND timestamp BETWEEN ? AND ?
        ORDER BY timestamp;
    """
    
    result = db_conn.execute(query, [variable, 
                                     organization, 
                                     start_time, 
                                     end_time]).fetchdf()
    return result

def get_timeseries_subset(db_conn, variable, organization):
    query = """
        SELECT value, timestamp
        FROM timeseries_dataset
        WHERE variable = ?
          AND organization = ?
        ORDER BY timestamp;
    """
    
    result = db_conn.execute(query, [variable, 
                                     organization]).fetchdf()
    return result




@app.get('/timeseriesdata/{organization}/{variable}')
def timeseries_data(organization: str, variable:str):
    db = duckdb.connect()

    db.execute(f"IMPORT DATABASE '{file_path}'")
    df = get_timeseries_subset(db, variable, organization)
    df = df.dropna()

    db.close()
    return {'data':{'timestamps': df['timestamp'].values.tolist(), 'values' : df['value'].values.tolist() }}


@app.get('/organizationdata/{organization}')
def organization_metrics(organization: str):
        db = duckdb.connect()

        db.execute(f"IMPORT DATABASE '{file_path}'")
        df = db.execute("""
        SELECT *
        FROM companies
        WHERE organization = ?
        """, [organization]).fetchdf()

        db.close()
        
        return {column_name : df[column_name].values.tolist() for column_name in df.columns.tolist()}